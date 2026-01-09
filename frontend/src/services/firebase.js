import React from 'react';

/**
 * Firebase Service utilities for common database operations
 */

import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    serverTimestamp,
    increment,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';
import { db, storage } from '../config/firebase';

// ============================================
// USER SERVICES
// ============================================

export const userService = {
    /**
     * Get a user by ID
     */
    async getById(userId) {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        }
        return null;
    },

    /**
     * Update user profile
     */
    async update(userId, data) {
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp()
        });
    },

    /**
     * Search users by name or skills
     */
    async search(searchTerm, maxResults = 10) {
        // This is a basic search - for production, consider using Algolia or similar
        const usersRef = collection(db, 'users');
        const q = query(usersRef, limit(maxResults));
        const snapshot = await getDocs(q);

        const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Client-side filtering (not ideal for large datasets)
        const term = searchTerm.toLowerCase();
        return users.filter(user =>
            user.displayName?.toLowerCase().includes(term) ||
            user.skills?.some(skill => skill.toLowerCase().includes(term))
        );
    },

    /**
     * Get suggested connections
     */
    async getSuggestions(userId, maxResults = 10) {
        const usersRef = collection(db, 'users');
        const q = query(
            usersRef,
            where('__name__', '!=', userId),
            limit(maxResults)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
};

// ============================================
// POST SERVICES
// ============================================

export const postService = {
    /**
     * Create a new post
     */
    async create(userId, postData) {
        const postsRef = collection(db, 'posts');
        const newPost = {
            userId,
            ...postData,
            stats: { likes: 0, comments: 0, shares: 0, views: 0 },
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };
        const docRef = await addDoc(postsRef, newPost);
        return { id: docRef.id, ...newPost };
    },

    /**
     * Get posts for feed
     */
    async getFeed(lastDoc = null, pageSize = 10) {
        const postsRef = collection(db, 'posts');
        let q = query(
            postsRef,
            orderBy('createdAt', 'desc'),
            limit(pageSize)
        );

        if (lastDoc) {
            q = query(q, startAfter(lastDoc));
        }

        const snapshot = await getDocs(q);
        return {
            posts: snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })),
            lastDoc: snapshot.docs[snapshot.docs.length - 1]
        };
    },

    /**
     * Like a post
     */
    async like(postId, userId) {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            'stats.likes': increment(1),
            likedBy: arrayUnion(userId)
        });
    },

    /**
     * Unlike a post
     */
    async unlike(postId, userId) {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
            'stats.likes': increment(-1),
            likedBy: arrayRemove(userId)
        });
    },

    /**
     * Delete a post
     */
    async delete(postId) {
        const postRef = doc(db, 'posts', postId);
        await deleteDoc(postRef);
    }
};

// ============================================
// CONNECTION SERVICES
// ============================================

export const connectionService = {
    /**
     * Send connection request
     */
    async sendRequest(fromUserId, toUserId, message = '') {
        const requestsRef = collection(db, 'connectionRequests');
        await addDoc(requestsRef, {
            fromUserId,
            toUserId,
            message,
            status: 'pending',
            createdAt: serverTimestamp()
        });
    },

    /**
     * Accept connection request
     */
    async accept(requestId, fromUserId, toUserId) {
        // Update request status
        const requestRef = doc(db, 'connectionRequests', requestId);
        await updateDoc(requestRef, { status: 'accepted' });

        // Add to both users' connections
        const fromUserRef = doc(db, 'users', fromUserId);
        const toUserRef = doc(db, 'users', toUserId);

        await updateDoc(fromUserRef, {
            connections: arrayUnion(toUserId)
        });
        await updateDoc(toUserRef, {
            connections: arrayUnion(fromUserId)
        });
    },

    /**
     * Get pending requests for a user
     */
    async getPendingRequests(userId) {
        const requestsRef = collection(db, 'connectionRequests');
        const q = query(
            requestsRef,
            where('toUserId', '==', userId),
            where('status', '==', 'pending')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
};

// ============================================
// MESSAGE SERVICES
// ============================================

export const messageService = {
    /**
     * Send a message
     */
    async send(conversationId, senderId, content) {
        const messagesRef = collection(db, 'conversations', conversationId, 'messages');
        await addDoc(messagesRef, {
            senderId,
            content,
            read: false,
            createdAt: serverTimestamp()
        });

        // Update conversation's last message
        const convRef = doc(db, 'conversations', conversationId);
        await updateDoc(convRef, {
            lastMessage: content,
            lastMessageAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    },

    /**
     * Get or create a conversation between two users
     */
    async getOrCreateConversation(user1Id, user2Id) {
        const convsRef = collection(db, 'conversations');

        // Check if conversation exists
        const q = query(
            convsRef,
            where('participants', 'array-contains', user1Id)
        );
        const snapshot = await getDocs(q);

        const existing = snapshot.docs.find(doc =>
            doc.data().participants.includes(user2Id)
        );

        if (existing) {
            return { id: existing.id, ...existing.data() };
        }

        // Create new conversation
        const newConv = {
            participants: [user1Id, user2Id],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };
        const docRef = await addDoc(convsRef, newConv);
        return { id: docRef.id, ...newConv };
    },

    /**
     * Get messages for a conversation
     */
    async getMessages(conversationId, pageSize = 50) {
        const messagesRef = collection(db, 'conversations', conversationId, 'messages');
        const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(pageSize));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })).reverse();
    }
};

// ============================================
// UPLOAD SERVICES
// ============================================

export const uploadService = {
    /**
     * Upload a file to Firebase Storage
     */
    async uploadFile(file, path) {
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    },

    /**
     * Upload profile photo
     */
    async uploadProfilePhoto(userId, file) {
        const path = `users/${userId}/profile-${Date.now()}.${file.name.split('.').pop()}`;
        return this.uploadFile(file, path);
    },

    /**
     * Upload post media
     */
    async uploadPostMedia(userId, file, type = 'image') {
        const path = `posts/${userId}/${type}-${Date.now()}.${file.name.split('.').pop()}`;
        return this.uploadFile(file, path);
    },

    /**
     * Delete a file from Storage
     */
    async deleteFile(path) {
        const fileRef = ref(storage, path);
        await deleteObject(fileRef);
    }
};

// ============================================
// NOTIFICATION SERVICES
// ============================================

export const notificationService = {
    /**
     * Create a notification
     */
    async create(userId, notification) {
        const notificationsRef = collection(db, 'notifications');
        await addDoc(notificationsRef, {
            userId,
            ...notification,
            read: false,
            createdAt: serverTimestamp()
        });
    },

    /**
     * Get user's notifications
     */
    async getForUser(userId, pageSize = 20) {
        const notificationsRef = collection(db, 'notifications');
        const q = query(
            notificationsRef,
            where('userId', '==', userId),
            orderBy('createdAt', 'desc'),
            limit(pageSize)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },

    /**
     * Mark notification as read
     */
    async markAsRead(notificationId) {
        const notificationRef = doc(db, 'notifications', notificationId);
        await updateDoc(notificationRef, { read: true });
    },

    /**
     * Mark all notifications as read
     */
    async markAllAsRead(userId) {
        const notificationsRef = collection(db, 'notifications');
        const q = query(
            notificationsRef,
            where('userId', '==', userId),
            where('read', '==', false)
        );
        const snapshot = await getDocs(q);

        const updatePromises = snapshot.docs.map(doc =>
            updateDoc(doc.ref, { read: true })
        );
        await Promise.all(updatePromises);
    }
};

export default {
    userService,
    postService,
    connectionService,
    messageService,
    uploadService,
    notificationService
};

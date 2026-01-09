import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    auth,
    db,
    googleProvider,
    facebookProvider
} from '../config/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
    updateEmail,
    updatePassword
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create user profile in Firestore
    const createUserProfile = async (user, additionalData = {}) => {
        if (!user) return;

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            const { displayName, email, photoURL } = user;
            const createdAt = serverTimestamp();

            try {
                await setDoc(userRef, {
                    uid: user.uid,
                    displayName: displayName || additionalData.displayName || '',
                    email,
                    photoURL: photoURL || '',
                    headline: additionalData.headline || '',
                    bio: additionalData.bio || '',
                    skills: additionalData.skills || [],
                    expertise: additionalData.expertise || [],
                    connections: [],
                    followers: [],
                    following: [],
                    createdAt,
                    updatedAt: createdAt,
                    isOnline: true,
                    lastSeen: createdAt,
                    settings: {
                        theme: 'system',
                        emailNotifications: true,
                        pushNotifications: true,
                        profileVisibility: 'public'
                    }
                });
            } catch (error) {
                console.error('Error creating user profile:', error);
                throw error;
            }
        }

        return getUserProfile(user.uid);
    };

    // Get user profile from Firestore
    const getUserProfile = async (uid) => {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const profile = { id: userSnap.id, ...userSnap.data() };
            setUserProfile(profile);
            return profile;
        }
        return null;
    };

    // Update user profile
    const updateUserProfile = async (data) => {
        if (!currentUser) return;

        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, {
            ...data,
            updatedAt: serverTimestamp()
        });

        // Update Firebase Auth profile if name or photo changed
        if (data.displayName || data.photoURL) {
            await updateProfile(currentUser, {
                displayName: data.displayName || currentUser.displayName,
                photoURL: data.photoURL || currentUser.photoURL
            });
        }

        return getUserProfile(currentUser.uid);
    };

    // Sign up with email and password
    const signup = async (email, password, additionalData = {}) => {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        if (additionalData.displayName) {
            await updateProfile(user, { displayName: additionalData.displayName });
        }

        await createUserProfile(user, additionalData);
        return user;
    };

    // Login with email and password
    const login = async (email, password) => {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        await getUserProfile(user.uid);

        // Update online status
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { isOnline: true, lastSeen: serverTimestamp() });

        return user;
    };

    // Login with Google
    const loginWithGoogle = async () => {
        const { user } = await signInWithPopup(auth, googleProvider);
        await createUserProfile(user);
        return user;
    };

    // Login with Facebook
    const loginWithFacebook = async () => {
        const { user } = await signInWithPopup(auth, facebookProvider);
        await createUserProfile(user);
        return user;
    };

    // Logout
    const logout = async () => {
        if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, { isOnline: false, lastSeen: serverTimestamp() });
        }
        await signOut(auth);
        setUserProfile(null);
    };

    // Reset password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Update email
    const changeEmail = (newEmail) => {
        return updateEmail(currentUser, newEmail);
    };

    // Update password
    const changePassword = (newPassword) => {
        return updatePassword(currentUser, newPassword);
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                await getUserProfile(user.uid);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userProfile,
        loading,
        signup,
        login,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        resetPassword,
        changeEmail,
        changePassword,
        updateUserProfile,
        getUserProfile,
        createUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

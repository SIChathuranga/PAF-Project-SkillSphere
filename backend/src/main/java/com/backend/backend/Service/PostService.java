package com.backend.backend.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Post;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;

@Service
public class PostService {

    private static final String COLLECTION_NAME = "posts";

    @Autowired
    private Firestore firestore;

    // Create a new post
    public Post createPost(Post post) {
        try {
            if (post.getUsername() == null || post.getDescription() == null) {
                throw new IllegalArgumentException("Missing required fields");
            }
            if (post.getLikes() == null) {
                post.setLikes(new ArrayList<>());
            }
            if (post.getCreatedAt() == null) {
                post.setCreatedAt(LocalDateTime.now());
            }
            
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document();
            post.setPostId(docRef.getId());
            docRef.set(post.toMap()).get();
            return post;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error creating post", e);
        }
    }

    // Get a post by ID
    public Post getPostById(String postId) {
        try {
            DocumentSnapshot document = firestore.collection(COLLECTION_NAME)
                    .document(postId).get().get();
            if (document.exists()) {
                return Post.fromMap(document.getId(), document.getData());
            }
            return null;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting post", e);
        }
    }

    // Update an existing post
    public Post updatePost(String postId, Post updatedPost) {
        try {
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(postId);
            DocumentSnapshot document = docRef.get().get();
            
            if (!document.exists()) {
                return null;
            }
            
            Post existingPost = Post.fromMap(document.getId(), document.getData());
            existingPost.setDescription(updatedPost.getDescription());
            existingPost.setUserImage(updatedPost.getUserImage());
            
            docRef.set(existingPost.toMap()).get();
            return existingPost;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating post", e);
        }
    }

    // Delete a post by ID
    public boolean deletePost(String postId) {
        try {
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(postId);
            DocumentSnapshot document = docRef.get().get();
            
            if (!document.exists()) {
                return false;
            }
            
            docRef.delete().get();
            return true;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error deleting post", e);
        }
    }

    // Get all posts
    public List<Post> getAllPosts() {
        try {
            List<Post> posts = new ArrayList<>();
            ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME)
                    .orderBy("createdAt", Query.Direction.DESCENDING)
                    .get();
            
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                posts.add(Post.fromMap(document.getId(), document.getData()));
            }
            return posts;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting all posts", e);
        }
    }

    // Like/Unlike a post
    public Post likePost(String postId, String userId) {
        try {
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(postId);
            DocumentSnapshot document = docRef.get().get();
            
            if (!document.exists()) {
                return null;
            }
            
            Post post = Post.fromMap(document.getId(), document.getData());
            if (post.getLikes() == null) {
                post.setLikes(new ArrayList<>());
            }
            
            // Toggle like
            if (post.getLikes().contains(userId)) {
                post.getLikes().remove(userId);
            } else {
                post.getLikes().add(userId);
            }
            
            docRef.set(post.toMap()).get();
            return post;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error liking post", e);
        }
    }

    // Get posts by user ID
    public List<Post> getPostsByUser(String userId) {
        try {
            List<Post> posts = new ArrayList<>();
            ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME)
                    .whereEqualTo("userId", userId)
                    .orderBy("createdAt", Query.Direction.DESCENDING)
                    .get();
            
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                posts.add(Post.fromMap(document.getId(), document.getData()));
            }
            return posts;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting posts by user", e);
        }
    }
}
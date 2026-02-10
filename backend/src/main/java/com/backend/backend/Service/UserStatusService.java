package com.backend.backend.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.UserStatus;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;

@Service
public class UserStatusService {

    private static final String COLLECTION_NAME = "userStatuses";

    @Autowired
    private Firestore firestore;

    // Fetch and return all user statuses
    public List<UserStatus> getAllUserStatuses() {
        try {
            List<UserStatus> statuses = new ArrayList<>();
            ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME)
                    .orderBy("createdAt", Query.Direction.DESCENDING)
                    .get();
            
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                statuses.add(UserStatus.fromMap(document.getId(), document.getData()));
            }
            return statuses;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting all user statuses", e);
        }
    }

    // Fetch a specific user status by its ID
    public Optional<UserStatus> getUserStatusById(String id) {
        try {
            DocumentSnapshot document = firestore.collection(COLLECTION_NAME)
                    .document(id).get().get();
            if (document.exists()) {
                return Optional.of(UserStatus.fromMap(document.getId(), document.getData()));
            }
            return Optional.empty();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting user status", e);
        }
    }

    // Fetch statuses by user ID
    public List<UserStatus> getStatusesByUser(String userId) {
        try {
            List<UserStatus> statuses = new ArrayList<>();
            ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME)
                    .whereEqualTo("userId", userId)
                    .orderBy("createdAt", Query.Direction.DESCENDING)
                    .get();
            
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                statuses.add(UserStatus.fromMap(document.getId(), document.getData()));
            }
            return statuses;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting statuses by user", e);
        }
    }

    // Create a new user status entry
    public UserStatus createUserStatus(UserStatus userStatus) {
        try {
            if (userStatus.getCreatedAt() == null) {
                userStatus.setCreatedAt(new Date());
            }
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document();
            userStatus.setId(docRef.getId());
            docRef.set(userStatus.toMap()).get();
            return userStatus;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error creating user status", e);
        }
    }

    // Update an existing user status by ID
    public UserStatus updateUserStatus(String id, UserStatus updatedStatus) {
        try {
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(id);
            DocumentSnapshot document = docRef.get().get();
            
            if (document.exists()) {
                UserStatus existingStatus = UserStatus.fromMap(document.getId(), document.getData());
                existingStatus.setUserId(updatedStatus.getUserId());
                existingStatus.setUsername(updatedStatus.getUsername());
                existingStatus.setDescription(updatedStatus.getDescription());
                existingStatus.setImageUrl(updatedStatus.getImageUrl());
                
                docRef.set(existingStatus.toMap()).get();
                return existingStatus;
            } else {
                throw new RuntimeException("User status not found with id: " + id);
            }
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating user status", e);
        }
    }

    // Delete a user status entry by ID
    public void deleteUserStatus(String id) {
        try {
            firestore.collection(COLLECTION_NAME).document(id).delete().get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error deleting user status", e);
        }
    }
}
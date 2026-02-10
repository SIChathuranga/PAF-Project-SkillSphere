package com.backend.backend.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Topic;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;

@Service
public class TopicService {

    private static final String COLLECTION_NAME = "topics";

    @Autowired
    private Firestore firestore;

    // Create
    public Topic createTopic(Topic topic) {
        try {
            if (topic.getCreatedAt() == null) {
                topic.setCreatedAt(new Date());
            }
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document();
            topic.setId(docRef.getId());
            docRef.set(topic.toMap()).get();
            return topic;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error creating topic", e);
        }
    }

    // Read (all)
    public List<Topic> getAllTopics() {
        try {
            List<Topic> topics = new ArrayList<>();
            ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME)
                    .orderBy("createdAt", Query.Direction.DESCENDING)
                    .get();
            
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                topics.add(Topic.fromMap(document.getId(), document.getData()));
            }
            return topics;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting all topics", e);
        }
    }

    // Read (by id)
    public Optional<Topic> getTopicById(String id) {
        try {
            DocumentSnapshot document = firestore.collection(COLLECTION_NAME)
                    .document(id).get().get();
            if (document.exists()) {
                return Optional.of(Topic.fromMap(document.getId(), document.getData()));
            }
            return Optional.empty();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting topic", e);
        }
    }

    // Read (by userId)
    public List<Topic> getTopicsByUser(String userId) {
        try {
            List<Topic> topics = new ArrayList<>();
            ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME)
                    .whereEqualTo("userId", userId)
                    .orderBy("createdAt", Query.Direction.DESCENDING)
                    .get();
            
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                topics.add(Topic.fromMap(document.getId(), document.getData()));
            }
            return topics;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting topics by user", e);
        }
    }

    // Update
    public Topic updateTopic(String id, Topic topicDetails) {
        try {
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(id);
            DocumentSnapshot document = docRef.get().get();
            
            if (document.exists()) {
                Topic existingTopic = Topic.fromMap(document.getId(), document.getData());
                existingTopic.setUserId(topicDetails.getUserId());
                existingTopic.setProgress(topicDetails.getProgress());
                existingTopic.setTopicOne(topicDetails.getTopicOne());
                existingTopic.setTopicOneDescription(topicDetails.getTopicOneDescription());
                existingTopic.setTopicTwo(topicDetails.getTopicTwo());
                existingTopic.setTopicTwoDescription(topicDetails.getTopicTwoDescription());
                existingTopic.setTopicThree(topicDetails.getTopicThree());
                existingTopic.setTopicThreeDescription(topicDetails.getTopicThreeDescription());
                existingTopic.setTopicFour(topicDetails.getTopicFour());
                existingTopic.setTopicFourDescription(topicDetails.getTopicFourDescription());
                existingTopic.setTopicFive(topicDetails.getTopicFive());
                existingTopic.setTopicFiveDescription(topicDetails.getTopicFiveDescription());
                
                docRef.set(existingTopic.toMap()).get();
                return existingTopic;
            }
            return null;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating topic", e);
        }
    }

    // Update progress
    public Topic updateProgress(String id, Integer progress) {
        try {
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(id);
            DocumentSnapshot document = docRef.get().get();
            
            if (document.exists()) {
                Topic existingTopic = Topic.fromMap(document.getId(), document.getData());
                existingTopic.setProgress(progress);
                docRef.set(existingTopic.toMap()).get();
                return existingTopic;
            }
            return null;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating progress", e);
        }
    }

    // Delete
    public void deleteTopic(String id) {
        try {
            firestore.collection(COLLECTION_NAME).document(id).delete().get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error deleting topic", e);
        }
    }
}
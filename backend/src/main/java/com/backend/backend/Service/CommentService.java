package com.backend.backend.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Comment;
import com.backend.backend.Model.CommentDto;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;

@Service
public class CommentService {

    private static final String COLLECTION_NAME = "comments";

    @Autowired
    private Firestore firestore;

    public Comment addNewComment(Comment comment) {
        try {
            if (comment.getCreatedAt() == null) {
                comment.setCreatedAt(new Date());
            }
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document();
            comment.setId(docRef.getId());
            docRef.set(comment.toMap()).get();
            return comment;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error adding comment", e);
        }
    }

    public List<Comment> getAllComments(String postId) {
        try {
            List<Comment> comments = new ArrayList<>();
            ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME)
                    .whereEqualTo("postId", postId)
                    .orderBy("createdAt", Query.Direction.DESCENDING)
                    .get();
            
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                comments.add(Comment.fromMap(document.getId(), document.getData()));
            }
            return comments;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting comments", e);
        }
    }

    public Comment getCommentById(String commentId) {
        try {
            DocumentSnapshot document = firestore.collection(COLLECTION_NAME)
                    .document(commentId).get().get();
            if (document.exists()) {
                return Comment.fromMap(document.getId(), document.getData());
            }
            return null;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error getting comment", e);
        }
    }

    public void updateComment(CommentDto commentDto) {
        try {
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(commentDto.getId());
            DocumentSnapshot document = docRef.get().get();
            
            if (document.exists()) {
                Comment comment = Comment.fromMap(document.getId(), document.getData());
                comment.setComment(commentDto.getComment());
                docRef.set(comment.toMap()).get();
            } else {
                throw new RuntimeException("Comment not found with ID: " + commentDto.getId());
            }
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error updating comment", e);
        }
    }

    public void deleteComment(String commentId) {
        try {
            DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(commentId);
            DocumentSnapshot document = docRef.get().get();
            
            if (document.exists()) {
                docRef.delete().get();
            } else {
                throw new RuntimeException("Comment not found with ID: " + commentId);
            }
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error deleting comment", e);
        }
    }
}
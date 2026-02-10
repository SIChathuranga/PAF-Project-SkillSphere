package com.backend.backend.Model;

import java.util.Date;
import java.util.Map;
import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private String id;
    private String postId;
    private String userId;
    private String username;
    private String comment;
    private Date createdAt = new Date();

    // Convert to Firestore map
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("postId", postId);
        map.put("userId", userId);
        map.put("username", username);
        map.put("comment", comment);
        map.put("createdAt", createdAt != null ? createdAt.getTime() : new Date().getTime());
        return map;
    }

    // Create from Firestore document
    public static Comment fromMap(String id, Map<String, Object> map) {
        Comment comment = new Comment();
        comment.setId(id);
        comment.setPostId((String) map.get("postId"));
        comment.setUserId((String) map.get("userId"));
        comment.setUsername((String) map.get("username"));
        comment.setComment((String) map.get("comment"));
        Object createdAtObj = map.get("createdAt");
        if (createdAtObj instanceof Long) {
            comment.setCreatedAt(new Date((Long) createdAtObj));
        } else if (createdAtObj instanceof com.google.cloud.Timestamp) {
            comment.setCreatedAt(((com.google.cloud.Timestamp) createdAtObj).toDate());
        } else {
            comment.setCreatedAt(new Date());
        }
        return comment;
    }
}
package com.backend.backend.Model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    private String postId;
    private String userId;  // Firebase User ID
    private String username;
    private String description;
    private String userImage;
    private LocalDateTime createdAt;
    private List<String> likes = new ArrayList<>();  // List of userIds who liked the post

    // Constructor to set the timestamp automatically
    public Post(String userId, String username, String description, String userImage) {
        this.userId = userId;
        this.username = username;
        this.description = description;
        this.userImage = userImage;
        this.createdAt = LocalDateTime.now();
        this.likes = new ArrayList<>();
    }

    // Convert to Firestore map
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("postId", postId);
        map.put("userId", userId);
        map.put("username", username);
        map.put("description", description);
        map.put("userImage", userImage);
        map.put("createdAt", createdAt != null ? createdAt.toString() : LocalDateTime.now().toString());
        map.put("likes", likes != null ? likes : new ArrayList<>());
        return map;
    }

    // Create from Firestore document
    @SuppressWarnings("unchecked")
    public static Post fromMap(String id, Map<String, Object> map) {
        Post post = new Post();
        post.setPostId(id);
        post.setUserId((String) map.get("userId"));
        post.setUsername((String) map.get("username"));
        post.setDescription((String) map.get("description"));
        post.setUserImage((String) map.get("userImage"));
        String createdAtStr = (String) map.get("createdAt");
        if (createdAtStr != null) {
            post.setCreatedAt(LocalDateTime.parse(createdAtStr));
        }
        Object likesObj = map.get("likes");
        if (likesObj instanceof List) {
            post.setLikes((List<String>) likesObj);
        } else {
            post.setLikes(new ArrayList<>());
        }
        return post;
    }
}
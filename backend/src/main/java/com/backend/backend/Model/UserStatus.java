package com.backend.backend.Model;

import java.util.Map;
import java.util.HashMap;
import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserStatus {
    private String id;
    private String userId;      // Firebase User ID
    private String username;    // Stores the name of the user
    private String description; // Stores a short description about the user
    private String imageUrl;    // Stores the URL of the user's image
    private Date createdAt;

    // Convert to Firestore map
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userId);
        map.put("username", username);
        map.put("description", description);
        map.put("imageUrl", imageUrl);
        map.put("createdAt", createdAt != null ? createdAt.getTime() : new Date().getTime());
        return map;
    }

    // Create from Firestore document
    public static UserStatus fromMap(String id, Map<String, Object> map) {
        UserStatus status = new UserStatus();
        status.setId(id);
        status.setUserId((String) map.get("userId"));
        status.setUsername((String) map.get("username"));
        status.setDescription((String) map.get("description"));
        status.setImageUrl((String) map.get("imageUrl"));
        Object createdAtObj = map.get("createdAt");
        if (createdAtObj instanceof Long) {
            status.setCreatedAt(new Date((Long) createdAtObj));
        } else if (createdAtObj instanceof com.google.cloud.Timestamp) {
            status.setCreatedAt(((com.google.cloud.Timestamp) createdAtObj).toDate());
        } else {
            status.setCreatedAt(new Date());
        }
        return status;
    }
}
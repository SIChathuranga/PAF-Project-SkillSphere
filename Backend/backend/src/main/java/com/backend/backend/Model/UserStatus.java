package com.backend.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
@Data
@Document(collection = "user_statuses")
public class UserStatus {
    @Id
    private String id;

    private String username;
    private String description;
    private String imageUrl;  // Store image as URL (for simplicity)
}

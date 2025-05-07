package com.backend.backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "posts")
public class Post {
    @Id
    private String postId;
    private String username;
    private String description;
    private String userImage;
    private LocalDateTime createdAt;

    // Constructor to set the timestamp automatically
    public Post(String username, String description, String userImage) {
        this.username = username;
        this.description = description;
        this.userImage = userImage;
        this.createdAt = LocalDateTime.now(); 
    }
    
}
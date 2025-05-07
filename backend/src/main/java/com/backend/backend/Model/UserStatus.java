package com.backend.backend.Model;

import org.springframework.data.annotation.Id; // Import to mark the primary key for MongoDB
import org.springframework.data.mongodb.core.mapping.Document; // Import to map this class to a MongoDB collection
import lombok.Data; // Lombok annotation to automatically generate getters, setters, constructors, etc.

@Data // Lombok's annotation to reduce boilerplate code (getters, setters, toString, equals, hashCode)
@Document(collection = "user_statuses") // Marks this class as a MongoDB document stored in "user_statuses" collection
public class UserStatus {

    @Id // Marks 'id' as the primary key for MongoDB documents
    private String id;

    private String username;    // Stores the name of the user
    private String description; // Stores a short description about the user
    private String imageUrl;     // Stores the URL of the user's image (optional: can be a link or local storage path)
}

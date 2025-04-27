package com.backend.backend.Repository;

import com.backend.backend.Model.UserStatus; // Import the UserStatus model class
import org.springframework.data.mongodb.repository.MongoRepository; // Import MongoRepository for MongoDB operations
import org.springframework.stereotype.Repository; // Marks this interface as a Spring repository component

@Repository // Indicates that this interface is a Spring-managed bean used for data access
public interface UserStatusRepository extends MongoRepository<UserStatus, String> {
    // Inherits basic CRUD methods like save(), findAll(), findById(), deleteById(), etc.

    // UserStatus - the type of the document (model)
    // String - the type of the document's ID field
}

package com.backend.backend.Repository;

import com.backend.backend.Model.UserStatus; // Ensure the UserStatus class exists in this package or update the package path
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserStatusRepository extends MongoRepository<UserStatus, String> {
    // MongoRepository gives you basic CRUD operations
}

package com.backend.backend.Repository;

import com.backend.backend.userstatus.model.UserStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserStatusRepository extends MongoRepository<UserStatus, String> {
    // MongoRepository gives you basic CRUD operations
}

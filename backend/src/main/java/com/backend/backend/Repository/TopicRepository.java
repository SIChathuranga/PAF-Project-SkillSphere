package com.backend.backend.Repository;


import com.backend.backend.Model.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends MongoRepository<Topic, String> {
    // The basic CRUD operations are inherited from MongoRepository
    // You can add custom query methods here if needed
}
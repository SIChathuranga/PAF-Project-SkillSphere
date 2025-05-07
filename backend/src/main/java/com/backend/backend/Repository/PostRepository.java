package com.backend.backend.Repository;

import com.backend.backend.Model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
    Post findByPostId(String postId);
}
package com.backend.backend.Service;

import com.backend.backend.Model.Post;
import com.backend.backend.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // Create a new post
    public Post createPost(Post post) {
        // Validate post fields
        if (post.getUsername() == null || post.getDescription() == null || post.getUserImage() == null) {
            throw new IllegalArgumentException("Missing required fields");
        }
        return postRepository.save(post);
    }

    // Get a post by ID
    public Post getPostById(String postId) {
        Post post = postRepository.findByPostId(postId);
        if (post == null) {
            throw new IllegalArgumentException("Post not found");
        }
        return post;
    }

    // Update an existing post
    public Post updatePost(String postId, Post updatedPost) {
        Post existingPost = postRepository.findByPostId(postId);
        if (existingPost == null) {
            throw new IllegalArgumentException("Post not found");
        }
        existingPost.setDescription(updatedPost.getDescription());
        existingPost.setUserImage(updatedPost.getUserImage());
        return postRepository.save(existingPost);
    }

    // Delete a post by ID
    public boolean deletePost(String postId) {
        Post post = postRepository.findByPostId(postId);
        if (post == null) {
            throw new IllegalArgumentException("Post not found");
        }
        postRepository.delete(post);
        return true;
    }

    // Get all posts
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}
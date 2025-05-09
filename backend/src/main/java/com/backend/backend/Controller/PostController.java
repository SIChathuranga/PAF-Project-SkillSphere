package com.backend.backend.Controller;

import com.backend.backend.Model.Post;
import com.backend.backend.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    // Create a new post
    @PostMapping
    public Post createPost(@RequestBody Post post) {
        System.out.println("Creating post: " + post);
        try {
            // Ensure the createdAt is set to current time in case it's not set in the request body
            if (post.getCreatedAt() == null) {
                post.setCreatedAt(LocalDateTime.now());
            }
            return postService.createPost(post);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
}


    // Get a post by ID
    @GetMapping("/{postId}")
    public Post getPostById(@PathVariable String postId) {
        return postService.getPostById(postId);
    }

    // Update a post by ID
    @PutMapping("/{postId}")
    public Post updatePost(@PathVariable String postId, @RequestBody Post post) {
        return postService.updatePost(postId, post);
    }

    // Delete a post by ID
    @DeleteMapping("/{postId}")
    public String deletePost(@PathVariable String postId) {
        boolean isDeleted = postService.deletePost(postId);
        return isDeleted ? "Post deleted successfully" : "Post not found";
    }

    // Get all posts
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }
}
package controller;

import dto.CommentDto;
import model.Comment;
import service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<?> createComment(@RequestBody Comment comment) {
        try {
            Comment savedComment = commentService.addNewComment(comment);
            return ResponseEntity.ok(savedComment);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating comment: " + e.getMessage());
        }
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getCommentsByPostId(@PathVariable String postId) {
        try {
            List<Comment> comments = commentService.getAllComments(postId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving comments: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable String id) {
        try {
            commentService.deleteComment(id);
            return ResponseEntity.ok("Comment deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting comment: " + e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> updateComment(@RequestBody CommentDto commentDto) {
        try {
            commentService.updateComment(commentDto);
            return ResponseEntity.ok("Comment updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating comment: " + e.getMessage());
        }
    }
}
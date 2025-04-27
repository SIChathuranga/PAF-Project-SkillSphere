package com.backend.backend.Service;

import com.backend.backend.Repository.CommentRepository;
import com.backend.backend.Model.Comment;
import com.backend.backend.dto.CommentDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment addNewComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<Comment> getAllComments(String postId) {
        return commentRepository.findByPostId(postId);
    }

    public void updateComment(CommentDto commentDto) {
        Optional<Comment> optionalComment = commentRepository.findById(commentDto.getId());
        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            comment.setComment(commentDto.getComment());
            commentRepository.save(comment);
        } else {
            throw new RuntimeException("Comment not found with ID: " + commentDto.getId());
        }
    }

    public void deleteComment(String commentId) {
        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
        } else {
            throw new RuntimeException("Comment not found with ID: " + commentId);
        }
    }
}
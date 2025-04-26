
package com.gym.gymunity.service;

import com.gym.gymunity.Repo.CommentRepository;
import com.gym.gymunity.dto.CommentDto;
import com.gym.gymunity.model.Comment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment AddNewComment(Comment comment){
       return commentRepository.save(comment);
    }

    public List<Comment> GetAllComments(String postId){
        return commentRepository.findByPostId(postId);
    }

    public void UpdateComment(CommentDto commentDto){
        Comment comment = commentRepository.findById(commentDto.getId()).get();
        comment.setComment(commentDto.getComment());

        commentRepository.save(comment);
    }

    public void DeleteComment(String commentId){
        commentRepository.deleteById(commentId);
    }

}

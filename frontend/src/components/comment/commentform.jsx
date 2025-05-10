// src/components/comment/commentform.jsx
import React, { useState, useEffect } from 'react';
import { commentApi } from '../../api/commentApi';
import CommentInput from './commentinput';
import CommentItem from './commentitem';

const CommentForm = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('relevant');

  // Fetch comments when component mounts or postId changes
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await commentApi.getCommentsByPostId(postId);
      setComments(data || []);
    } catch (err) {
      setError('Failed to load comments. Please try again later.');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (text) => {
    try {
      const commentData = {
        postId: postId,
        comment: text,
      };
      
      const newComment = await commentApi.addComment(commentData);
      
      // Add the new comment to the beginning of the array
      setComments([newComment, ...comments]);
      setError(null);
    } catch (err) {
      setError('Failed to add comment. Please try again.');
      console.error('Error adding comment:', err);
      throw err; // Rethrow to handle in CommentInput
    }
  };

  const handleUpdateComment = async (commentId, newText) => {
    try {
      const commentDto = {
        id: commentId,
        comment: newText,
      };
      
      await commentApi.updateComment(commentDto);
      
      // Update the comment in the local state
      setComments(comments.map((comment) =>
        comment.id === commentId 
          ? { ...comment, comment: newText } 
          : comment
      ));
      setError(null);
    } catch (err) {
      setError('Failed to update comment. Please try again.');
      console.error('Error updating comment:', err);
      throw err; // Rethrow to handle in CommentItem
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentApi.deleteComment(commentId);
      
      // Remove the comment from the local state
      setComments(comments.filter((comment) => comment.id !== commentId));
      setError(null);
    } catch (err) {
      setError('Failed to delete comment. Please try again.');
      console.error('Error deleting comment:', err);
      throw err; // Rethrow to handle in CommentItem
    }
  };

  const sortComments = (comments) => {
    if (!comments || comments.length === 0) return [];
    
    switch (sortBy) {
      case 'newest':
        return [...comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return [...comments].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'relevant':
      default:
        return comments; // Assuming backend returns them in relevant order
    }
  };

  const sortedComments = sortComments(comments);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">
            Comments ({comments.length})
          </h3>
          <div className="relative">
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none bg-transparent pr-8 py-1 text-sm text-gray-600 font-medium focus:outline-none cursor-pointer"
            >
              <option value="relevant">Most Relevant</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <svg 
              className="w-4 h-4 absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 text-sm">
          {error}
        </div>
      )}
      
      {/* Comment Input */}
      <div className="p-4">
        <CommentInput onSubmit={handleAddComment} placeholder="Write a comment..." />
      </div>
      
      {/* Comments List */}
      {loading ? (
        <div className="p-4 text-center text-gray-500">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
          <p className="mt-2">Loading comments...</p>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto">
          {sortedComments.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sortedComments.map((comment) => (
                <div key={comment.id} className="p-4">
                  <CommentItem
                    comment={comment}
                    onDelete={handleDeleteComment}
                    onUpdate={handleUpdateComment}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentForm;
// src/api/commentApi.js

const API_URL = 'http://localhost:8080/api/v1/comments';

export const commentApi = {
  // Create new comment - POST /api/v1/comments/add
  addComment: async (comment) => {
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to add comment');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  // Get comments by post ID - GET /api/v1/comments/getAllComments/{postId}
  getCommentsByPostId: async (postId) => {
    try {
      const response = await fetch(`${API_URL}/getAllComments/${postId}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch comments');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  // Update comment - PUT /api/v1/comments/update
  updateComment: async (commentDto) => {
    try {
      const response = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentDto),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update comment');
      }
      
      // Backend returns a string message, not JSON
      return await response.text();
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  },

  // Delete comment - DELETE /api/v1/comments/delete/{id}
  deleteComment: async (commentId) => {
    try {
      const response = await fetch(`${API_URL}/delete/${commentId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to delete comment');
      }
      
      // Backend returns a string message, not JSON
      return await response.text();
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },
};
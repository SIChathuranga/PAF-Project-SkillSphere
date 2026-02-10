// Comment API service using Backend REST API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const commentApi = {
    /**
     * Create new comment
     * @param {Object} comment - The comment data to create
     * @returns {Promise<Object>} Created comment object with ID
     */
    addComment: async (comment) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/comments/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            });
            if (!response.ok) {
                throw new Error('Failed to add comment');
            }
            const savedComment = await response.json();
            return {
                ...savedComment,
                createdAt: savedComment.createdAt ? new Date(savedComment.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    },

    /**
     * Get comments by post ID
     * @param {string} postId - The post document ID
     * @returns {Promise<Array>} Array of comment objects for the post
     */
    getCommentsByPostId: async (postId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/comments/getAllComments/${postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const comments = await response.json();
            return comments.map(comment => ({
                ...comment,
                createdAt: comment.createdAt ? new Date(comment.createdAt) : new Date()
            }));
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    },

    /**
     * Update comment
     * @param {Object} commentDto - Object containing id and updated comment data
     * @returns {Promise<string>} Success message
     */
    updateComment: async (commentDto) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/comments/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentDto),
            });
            if (!response.ok) {
                throw new Error('Failed to update comment');
            }
            return 'Comment updated successfully';
        } catch (error) {
            console.error('Error updating comment:', error);
            throw error;
        }
    },

    /**
     * Delete comment
     * @param {string} commentId - The comment document ID
     * @returns {Promise<string>} Success message
     */
    deleteComment: async (commentId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/comments/delete/${commentId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }
            return 'Comment deleted successfully';
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    },

    /**
     * Get comment by ID
     * @param {string} commentId - The comment document ID
     * @returns {Promise<Object|null>} Comment object or null if not found
     */
    getCommentById: async (commentId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/comments/${commentId}`);
            if (response.status === 404) {
                return null;
            }
            if (!response.ok) {
                throw new Error('Failed to fetch comment');
            }
            const comment = await response.json();
            return {
                ...comment,
                createdAt: comment.createdAt ? new Date(comment.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error fetching comment:', error);
            throw error;
        }
    },

    /**
     * Get comments by user ID
     * @param {string} userId - The Firebase user ID
     * @returns {Promise<Array>} Array of user's comment objects
     */
    getCommentsByUser: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/comments/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user comments');
            }
            const comments = await response.json();
            return comments.map(comment => ({
                ...comment,
                createdAt: comment.createdAt ? new Date(comment.createdAt) : new Date()
            }));
        } catch (error) {
            console.error('Error fetching user comments:', error);
            throw error;
        }
    },

    /**
     * Get recent comments
     * @param {number} limitCount - Maximum number of comments to fetch
     * @returns {Promise<Array>} Array of recent comment objects
     */
    getRecentComments: async (limitCount = 20) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/comments/recent?limit=${limitCount}`);
            if (!response.ok) {
                throw new Error('Failed to fetch recent comments');
            }
            const comments = await response.json();
            return comments.map(comment => ({
                ...comment,
                createdAt: comment.createdAt ? new Date(comment.createdAt) : new Date()
            }));
        } catch (error) {
            console.error('Error fetching recent comments:', error);
            throw error;
        }
    }
};

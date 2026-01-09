// Post API service for backend communication

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const postApi = {
    // Get all posts
    getAllPosts: async () => {
        try {
            const response = await fetch(`${API_URL}/posts`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    // Get single post by ID
    getPostById: async (postId) => {
        try {
            const response = await fetch(`${API_URL}/posts/${postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
    },

    // Create new post
    createPost: async (postData) => {
        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    // Update post
    updatePost: async (postId, postData) => {
        try {
            const response = await fetch(`${API_URL}/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            if (!response.ok) {
                throw new Error('Failed to update post');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    },

    // Delete post
    deletePost: async (postId) => {
        try {
            const response = await fetch(`${API_URL}/posts/${postId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            return true;
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    },

    // Like post
    likePost: async (postId, userId) => {
        try {
            const response = await fetch(`${API_URL}/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            if (!response.ok) {
                throw new Error('Failed to like post');
            }
            return await response.json();
        } catch (error) {
            console.error('Error liking post:', error);
            throw error;
        }
    },
};

// Post API service using Backend REST API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const postApi = {
    /**
     * Get all posts
     * @returns {Promise<Array>} Array of all post objects
     */
    getAllPosts: async () => {
        try {
            const response = await fetch(`${API_URL}/posts`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const posts = await response.json();
            return posts.map(post => ({
                ...post,
                id: post.postId,
                createdAt: post.createdAt ? new Date(post.createdAt) : new Date()
            }));
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    /**
     * Get single post by ID
     * @param {string} postId - The post document ID
     * @returns {Promise<Object|null>} Post object or null if not found
     */
    getPostById: async (postId) => {
        try {
            const response = await fetch(`${API_URL}/posts/${postId}`);
            if (response.status === 404) {
                return null;
            }
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            const post = await response.json();
            return {
                ...post,
                id: post.postId,
                createdAt: post.createdAt ? new Date(post.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
    },

    /**
     * Create new post
     * @param {Object} postData - The post data to create
     * @returns {Promise<Object>} Created post object with ID
     */
    createPost: async (postData) => {
        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...postData,
                    likes: postData.likes || []
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            const post = await response.json();
            return {
                ...post,
                id: post.postId,
                createdAt: post.createdAt ? new Date(post.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    /**
     * Update post
     * @param {string} postId - The post document ID
     * @param {Object} postData - The updated post data
     * @returns {Promise<Object>} Updated post object
     */
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
            const post = await response.json();
            return {
                ...post,
                id: post.postId,
                createdAt: post.createdAt ? new Date(post.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    },

    /**
     * Delete post
     * @param {string} postId - The post document ID
     * @returns {Promise<boolean>} True if deletion was successful
     */
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

    /**
     * Like/Unlike post (toggle)
     * @param {string} postId - The post document ID
     * @param {string} userId - The user ID to like/unlike
     * @returns {Promise<Object>} Updated post object
     */
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
            const post = await response.json();
            return {
                ...post,
                id: post.postId,
                createdAt: post.createdAt ? new Date(post.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error liking post:', error);
            throw error;
        }
    },

    /**
     * Get posts by user ID
     * @param {string} userId - The Firebase user ID
     * @returns {Promise<Array>} Array of user's post objects
     */
    getPostsByUser: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/posts/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user posts');
            }
            const posts = await response.json();
            return posts.map(post => ({
                ...post,
                id: post.postId,
                createdAt: post.createdAt ? new Date(post.createdAt) : new Date()
            }));
        } catch (error) {
            console.error('Error fetching user posts:', error);
            throw error;
        }
    },

    /**
     * Get recent posts (for feed)
     * @param {number} limitCount - Maximum number of posts to fetch
     * @returns {Promise<Array>} Array of recent post objects
     */
    getRecentPosts: async (limitCount = 20) => {
        try {
            // Since backend returns all posts sorted by createdAt desc, we limit client-side
            const posts = await postApi.getAllPosts();
            return posts.slice(0, limitCount);
        } catch (error) {
            console.error('Error fetching recent posts:', error);
            throw error;
        }
    }
};

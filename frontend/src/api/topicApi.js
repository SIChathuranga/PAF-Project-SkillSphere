// Topic API service using Backend REST API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const topicApi = {
    /**
     * Get all topics
     * @returns {Promise<Array>} Array of all topic objects
     */
    getAllTopics: async () => {
        try {
            const response = await fetch(`${API_URL}/api/v1/topics/all`);
            if (!response.ok) {
                throw new Error('Failed to fetch topics');
            }
            const topics = await response.json();
            return topics.map(topic => ({
                ...topic,
                createdAt: topic.createdAt ? new Date(topic.createdAt) : new Date()
            }));
        } catch (error) {
            console.error('Error fetching topics:', error);
            throw error;
        }
    },

    /**
     * Get single topic by ID
     * @param {string} topicId - The topic document ID
     * @returns {Promise<Object|null>} Topic object or null if not found
     */
    getTopicById: async (topicId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/topics/${topicId}`);
            if (response.status === 404) {
                return null;
            }
            if (!response.ok) {
                throw new Error('Failed to fetch topic');
            }
            const topic = await response.json();
            return {
                ...topic,
                createdAt: topic.createdAt ? new Date(topic.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error fetching topic:', error);
            throw error;
        }
    },

    /**
     * Create new topic
     * @param {Object} topicData - The topic data to create
     * @returns {Promise<Object>} Created topic object with ID
     */
    createTopic: async (topicData) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/topics/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(topicData),
            });
            if (!response.ok) {
                throw new Error('Failed to create topic');
            }
            const topic = await response.json();
            return {
                ...topic,
                createdAt: topic.createdAt ? new Date(topic.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error creating topic:', error);
            throw error;
        }
    },

    /**
     * Update topic
     * @param {string} topicId - The topic document ID
     * @param {Object} topicData - The updated topic data
     * @returns {Promise<Object>} Updated topic object
     */
    updateTopic: async (topicId, topicData) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/topics/update/${topicId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(topicData),
            });
            if (!response.ok) {
                throw new Error('Failed to update topic');
            }
            const topic = await response.json();
            return {
                ...topic,
                createdAt: topic.createdAt ? new Date(topic.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error updating topic:', error);
            throw error;
        }
    },

    /**
     * Delete topic
     * @param {string} topicId - The topic document ID
     * @returns {Promise<boolean>} True if deletion was successful
     */
    deleteTopic: async (topicId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/topics/delete/${topicId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete topic');
            }
            return true;
        } catch (error) {
            console.error('Error deleting topic:', error);
            throw error;
        }
    },

    /**
     * Get topics by user ID
     * @param {string} userId - The Firebase user ID
     * @returns {Promise<Array>} Array of user's topic objects
     */
    getTopicsByUser: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/topics/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user topics');
            }
            const topics = await response.json();
            return topics.map(topic => ({
                ...topic,
                createdAt: topic.createdAt ? new Date(topic.createdAt) : new Date()
            }));
        } catch (error) {
            console.error('Error fetching user topics:', error);
            throw error;
        }
    },

    /**
     * Update topic progress
     * @param {string} topicId - The topic document ID
     * @param {number} progress - The new progress value (0-100)
     * @returns {Promise<Object>} Updated topic object
     */
    updateProgress: async (topicId, progress) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/topics/${topicId}/progress`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ progress }),
            });
            if (!response.ok) {
                throw new Error('Failed to update progress');
            }
            const topic = await response.json();
            return {
                ...topic,
                createdAt: topic.createdAt ? new Date(topic.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error updating progress:', error);
            throw error;
        }
    },

    /**
     * Get recent topics
     * @param {number} limitCount - Maximum number of topics to fetch
     * @returns {Promise<Array>} Array of recent topic objects
     */
    getRecentTopics: async (limitCount = 20) => {
        try {
            // Since backend returns all topics sorted by createdAt desc, we limit client-side
            const topics = await topicApi.getAllTopics();
            return topics.slice(0, limitCount);
        } catch (error) {
            console.error('Error fetching recent topics:', error);
            throw error;
        }
    }
};

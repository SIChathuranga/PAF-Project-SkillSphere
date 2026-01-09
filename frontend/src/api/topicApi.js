// Topic/Learning Plans API service for backend communication

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const topicApi = {
    // Get all topics
    getAllTopics: async () => {
        try {
            const response = await fetch(`${API_URL}/api/v1/topics/all`);
            if (!response.ok) {
                throw new Error('Failed to fetch topics');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching topics:', error);
            throw error;
        }
    },

    // Get topic by ID
    getTopicById: async (topicId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/topics/${topicId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch topic');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching topic:', error);
            throw error;
        }
    },

    // Create new topic
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
            return await response.json();
        } catch (error) {
            console.error('Error creating topic:', error);
            throw error;
        }
    },

    // Update topic
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
            return await response.json();
        } catch (error) {
            console.error('Error updating topic:', error);
            throw error;
        }
    },

    // Delete topic
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

    // Get topics by user ID
    getTopicsByUser: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/topics/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user topics');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching user topics:', error);
            throw error;
        }
    },

    // Update topic progress
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
            return await response.json();
        } catch (error) {
            console.error('Error updating progress:', error);
            throw error;
        }
    },
};

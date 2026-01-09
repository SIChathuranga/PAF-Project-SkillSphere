// User Status API service for backend communication

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const userStatusApi = {
    // Get all user statuses
    getAllStatuses: async () => {
        try {
            const response = await fetch(`${API_URL}/api/v1/user-status/all`);
            if (!response.ok) {
                throw new Error('Failed to fetch statuses');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching statuses:', error);
            throw error;
        }
    },

    // Get status by ID
    getStatusById: async (statusId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/user-status/${statusId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch status');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching status:', error);
            throw error;
        }
    },

    // Create new status
    createStatus: async (statusData) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/user-status/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(statusData),
            });
            if (!response.ok) {
                throw new Error('Failed to create status');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating status:', error);
            throw error;
        }
    },

    // Update status
    updateStatus: async (statusId, statusData) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/user-status/update/${statusId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(statusData),
            });
            if (!response.ok) {
                throw new Error('Failed to update status');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating status:', error);
            throw error;
        }
    },

    // Delete status
    deleteStatus: async (statusId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/user-status/delete/${statusId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete status');
            }
            return true;
        } catch (error) {
            console.error('Error deleting status:', error);
            throw error;
        }
    },

    // Get statuses by user ID
    getStatusesByUser: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/user-status/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user statuses');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching user statuses:', error);
            throw error;
        }
    },
};

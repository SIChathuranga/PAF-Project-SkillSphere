// User Status API service using Backend REST API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const userStatusApi = {
    /**
     * Get all user statuses
     * @returns {Promise<Array>} Array of all status objects
     */
    getAllStatuses: async () => {
        try {
            const response = await fetch(`${API_URL}/api/v1/user-status/all`);
            if (!response.ok) {
                throw new Error('Failed to fetch statuses');
            }
            const statuses = await response.json();
            return statuses.map(status => ({
                ...status,
                createdAt: status.createdAt ? new Date(status.createdAt) : new Date()
            }));
        } catch (error) {
            console.error('Error fetching statuses:', error);
            throw error;
        }
    },

    /**
     * Get single status by ID
     * @param {string} statusId - The status document ID
     * @returns {Promise<Object|null>} Status object or null if not found
     */
    getStatusById: async (statusId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/user-status/${statusId}`);
            if (response.status === 404) {
                return null;
            }
            if (!response.ok) {
                throw new Error('Failed to fetch status');
            }
            const status = await response.json();
            return {
                ...status,
                createdAt: status.createdAt ? new Date(status.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error fetching status:', error);
            throw error;
        }
    },

    /**
     * Create new status
     * @param {Object} statusData - The status data to create
     * @returns {Promise<Object>} Created status object with ID
     */
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
            const status = await response.json();
            return {
                ...status,
                createdAt: status.createdAt ? new Date(status.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error creating status:', error);
            throw error;
        }
    },

    /**
     * Update status
     * @param {string} statusId - The status document ID
     * @param {Object} statusData - The updated status data
     * @returns {Promise<Object>} Updated status object
     */
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
            const status = await response.json();
            return {
                ...status,
                createdAt: status.createdAt ? new Date(status.createdAt) : new Date()
            };
        } catch (error) {
            console.error('Error updating status:', error);
            throw error;
        }
    },

    /**
     * Delete status
     * @param {string} statusId - The status document ID
     * @returns {Promise<boolean>} True if deletion was successful
     */
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

    /**
     * Get statuses by user ID
     * @param {string} userId - The Firebase user ID
     * @returns {Promise<Array>} Array of user's status objects
     */
    getStatusesByUser: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/api/v1/user-status/user/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user statuses');
            }
            const statuses = await response.json();
            return statuses.map(status => ({
                ...status,
                createdAt: status.createdAt ? new Date(status.createdAt) : new Date()
            }));
        } catch (error) {
            console.error('Error fetching user statuses:', error);
            throw error;
        }
    },

    /**
     * Get recent statuses
     * @param {number} limitCount - Maximum number of statuses to fetch
     * @returns {Promise<Array>} Array of recent status objects
     */
    getRecentStatuses: async (limitCount = 20) => {
        try {
            // Since backend returns all statuses sorted by createdAt desc, we limit client-side
            const statuses = await userStatusApi.getAllStatuses();
            return statuses.slice(0, limitCount);
        } catch (error) {
            console.error('Error fetching recent statuses:', error);
            throw error;
        }
    }
};

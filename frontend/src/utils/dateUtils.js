// Date utility functions

/**
 * Format a date to relative time (e.g., "2 hours ago", "3 days ago")
 * @param {Date} date - The date to format
 * @returns {string} - Formatted relative time string
 */
export const formatDistanceToNow = (date) => {
    if (!date) return 'Recently';

    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return 'Just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays}d ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return `${diffInWeeks}w ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths}mo ago`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears}y ago`;
};

/**
 * Format a date to a readable string (e.g., "January 15, 2024")
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return '';

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return new Date(date).toLocaleDateString('en-US', options);
};

/**
 * Format a date to a short readable string (e.g., "Jan 15, 2024")
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatShortDate = (date) => {
    if (!date) return '';

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    return new Date(date).toLocaleDateString('en-US', options);
};

/**
 * Format a date to include time (e.g., "January 15, 2024 at 3:30 PM")
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date and time string
 */
export const formatDateTime = (date) => {
    if (!date) return '';

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    };

    return new Date(date).toLocaleDateString('en-US', options);
};

/**
 * Check if a date is today
 * @param {Date} date - The date to check
 * @returns {boolean}
 */
export const isToday = (date) => {
    const today = new Date();
    const d = new Date(date);
    return d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear();
};

/**
 * Check if a date is this week
 * @param {Date} date - The date to check
 * @returns {boolean}
 */
export const isThisWeek = (date) => {
    const now = new Date();
    const d = new Date(date);
    const diffInDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    return diffInDays < 7 && diffInDays >= 0;
};

export default {
    formatDistanceToNow,
    formatDate,
    formatShortDate,
    formatDateTime,
    isToday,
    isThisWeek
};

import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Ensure this points to your backend server

const apiService = {
    // Register a new user
    signup: async (userData) => {
        const response = await axios.post(`${API_URL}/auth/signup`, userData);
        return response.data;
    },

    // Login a user
    login: async (credentials) => {
        try {
            console.log('Sending login request:', credentials);
            const response = await axios.post(`${API_URL}/auth/login`, credentials);
            console.log('Login response:', response.data);
            
            // Store the token immediately after successful login
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            console.error('API login error:', error.response?.data || error);
            throw error.response?.data || { message: 'Login failed' };
        }
    },

    // Fetch news articles
    getNews: async (category, page = 1) => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/news`, {
            params: { category, page },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // Fetch bookmarks for the authenticated user
    getBookmarks: async (token) => {
        const response = await axios.get(`${API_URL}/bookmarks`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // Add a bookmark
    addBookmark: async (articleId, token) => {
        const response = await axios.post(`${API_URL}/bookmarks`, { articleId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // Delete a bookmark
    deleteBookmark: async (bookmarkId, token) => {
        const response = await axios.delete(`${API_URL}/bookmarks/${bookmarkId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // Get user preferences
    getPreferences: async (token) => {
        const response = await axios.get(`${API_URL}/preferences`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // Update user preferences
    updatePreferences: async (preferences, token) => {
        const response = await axios.put(`${API_URL}/preferences`, preferences, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    // Fetch user data
    getUserData: async (token) => {
        const response = await axios.get(`${API_URL}/auth/user`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};

export default apiService;
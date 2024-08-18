import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [preferences, setPreferences] = useState({});
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const response = await axios.get('/preferences', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setPreferences(response.data);
            } catch (error) {
                console.error('Error fetching preferences:', error);
            }
        };

        const fetchBookmarks = async () => {
            try {
                const response = await axios.get('/bookmarks', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setBookmarks(response.data);
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            }
        };

        if (user) {
            fetchPreferences();
            fetchBookmarks();
        }
    }, [user]);

    const login = async (email, password) => {
        const response = await axios.post('/auth/login', { email, password });
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const updatePreferences = (newPreferences) => {
        setPreferences(newPreferences);
    };

    const addBookmark = (article) => {
        setBookmarks((prevBookmarks) => [...prevBookmarks, article]);
    };

    const removeBookmark = (articleId) => {
        setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.id !== articleId));
    };

    return (
        <AppContext.Provider value={{ user, setUser, login, logout, preferences, updatePreferences, bookmarks, addBookmark, removeBookmark, loading, setLoading }}>
            {children}
        </AppContext.Provider>
    );
};
import React, { useContext, useEffect } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import { AppContext } from '../context/AppContext';
import BookmarkList from '../components/Bookmarks/BookmarkList';
import apiService from '../services/apiService';

const BookmarksPage = () => {
    const { bookmarks, setBookmarks, loading, setLoading } = useContext(AppContext);

    useEffect(() => {
        const fetchBookmarks = async () => {
            setLoading(true);
            try {
                const response = await apiService.getBookmarks(localStorage.getItem('token'));
                setBookmarks(response.bookmarks);
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, [setBookmarks, setLoading]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Bookmarked Articles
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <BookmarkList bookmarks={bookmarks} />
            )}
        </Container>
    );
};

export default BookmarksPage;
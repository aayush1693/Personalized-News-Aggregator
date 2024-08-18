import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import apiService from '../../services/apiService';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const BookmarkList = () => {
    const { bookmarks, setBookmarks } = useContext(AppContext);

    useEffect(() => {
        const fetchBookmarks = async () => {
            const data = await apiService.getBookmarks(localStorage.getItem('token'));
            setBookmarks(data.bookmarks);
        };
        fetchBookmarks();
    }, [setBookmarks]);

    return (
        <Grid container spacing={2}>
            {bookmarks.length > 0 ? (
                bookmarks.map((bookmark) => (
                    <Grid item xs={12} sm={6} md={4} key={bookmark.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{bookmark.title}</Typography>
                                <Typography variant="body2">{bookmark.description}</Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    href={bookmark.url} 
                                    target="_blank"
                                >
                                    Read More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Typography variant="h6">No bookmarks found.</Typography>
            )}
        </Grid>
    );
};

export default BookmarkList;
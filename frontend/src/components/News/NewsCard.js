import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import apiService from '../../services/apiService';

const NewsCard = ({ article, onBookmark }) => {
    const handleBookmark = async () => {
        try {
            const token = localStorage.getItem('token');
            await apiService.addBookmark(article.id, token); // Ensure article.id is passed correctly
            onBookmark(article.id); // Call the onBookmark function passed as a prop
        } catch (error) {
            console.error('Error bookmarking article:', error); // Add this line to log the error
        }
    };

    return (
        <Card variant="outlined" style={{ margin: '16px' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {article.description}
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleBookmark}
                    style={{ marginTop: '8px' }}
                >
                    Bookmark
                </Button>
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    href={article.url} 
                    target="_blank" 
                    style={{ marginLeft: '8px', marginTop: '8px' }}
                >
                    Read More
                </Button>
            </CardContent>
        </Card>
    );
};

export default NewsCard;
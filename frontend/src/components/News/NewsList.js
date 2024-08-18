import React, { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import NewsCard from './NewsCard';
import { AppContext } from '../../context/AppContext';
import apiService from '../../services/apiService';

const NewsList = () => {
    const { articles, setArticles } = useContext(AppContext);

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await apiService.getNews();
            setArticles(response.data);
        };

        fetchArticles();
    }, [setArticles]);

    const handleBookmark = (article) => {
        // handle bookmark logic here
    };

    return (
        <Grid container spacing={2}>
            {articles.map(article => (
                <Grid item xs={12} sm={6} md={4} key={article.id}>
                    <NewsCard article={article} onBookmark={handleBookmark} />
                </Grid>
            ))}
        </Grid>
    );
};

export default NewsList;
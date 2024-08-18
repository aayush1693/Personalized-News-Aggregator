import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress } from '@mui/material';
import NewsCard from '../components/News/NewsCard';
import { AppContext } from '../context/AppContext';
import apiService from '../services/apiService';

const DashboardPage = () => {
    const { preferences } = useContext(AppContext);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const category = preferences.categories || 'general'; // Default to 'general' category
                const response = await apiService.getNews(category);
                setArticles(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [preferences]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Grid container spacing={2}>
            {articles.map(article => (
                <Grid item xs={12} sm={6} md={4} key={article.id}>
                    <NewsCard article={article} />
                </Grid>
            ))}
        </Grid>
    );
};

export default DashboardPage;
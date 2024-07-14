const axios = require('axios');
const Article = require('../models/articleModel');

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Fetch news articles based on category and pagination
const getNews = async (req, res) => {
    const { category, page = 1 } = req.query;

    if (!NEWS_API_KEY) {
        return res.status(500).json({ message: 'NEWS_API_KEY is not set' });
    }

    if (!category) {
        return res.status(400).json({ message: 'Category is required' });
    }

    try {
        const response = await axios.get(NEWS_API_URL, {
            params: {
                category,
                page,
                apiKey: NEWS_API_KEY,
            },
        });

        const articles = response.data.articles;

        // Optionally, save articles to the database
        // articles.forEach(article => {
        //     Article.create(article);
        // });

        res.status(200).json(articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: 'Error fetching news articles' });
    }
};

module.exports = {
    getNews,
};
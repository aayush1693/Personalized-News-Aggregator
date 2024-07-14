const db = require('../config/dbConfig');

// Article model
const Article = {
    create: (articleData) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO articles (title, description, url, source, category, published_at) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(query, [articleData.title, articleData.description, articleData.url, articleData.source, articleData.category, articleData.published_at], (error, results) => {
                if (error) return reject(error);
                resolve(results.insertId);
            });
        });
    },

    findAll: (category) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM articles WHERE category = ?';
            db.query(query, [category], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM articles WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
    },

    update: (id, articleData) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE articles SET title = ?, description = ?, url = ?, source = ?, category = ?, published_at = ? WHERE id = ?';
            db.query(query, [articleData.title, articleData.description, articleData.url, articleData.source, articleData.category, articleData.published_at, id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM articles WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows);
            });
        });
    }
};

module.exports = Article;
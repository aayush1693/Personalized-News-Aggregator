const db = require('../config/dbConfig');

const Bookmark = {
    create: (userId, articleId) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO bookmarks (user_id, article_id, created_at) VALUES (?, ?, NOW())';
            db.query(query, [userId, articleId], (err, results) => {
                if (err) {
                    console.error('Error inserting bookmark:', err);
                    return reject(err);
                }
                resolve(results.insertId);
            });
        });
    },

    findByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM bookmarks WHERE user_id = ?';
            db.query(query, [userId], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM bookmarks WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results.affectedRows);
            });
        });
    }
};

module.exports = Bookmark;
const mysql = require('mysql2');
const db = require('../config/dbConfig');

const User = {
    create: async ({ name, email, password }) => {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [name, email, password]);
        return { id: result.insertId, name, email };
    },

    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0];
    },

    findById: async (id) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    },

    updatePreferences: async (id, preferences) => {
        const query = 'UPDATE users SET preferences = ? WHERE id = ?';
        await db.execute(query, [JSON.stringify(preferences), id]);
    },

    getPreferences: async (id) => {
        const query = 'SELECT preferences FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0] ? JSON.parse(rows[0].preferences) : null;
    }
};

module.exports = User;
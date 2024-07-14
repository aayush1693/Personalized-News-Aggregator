const db = require('../config/dbConfig');
const { validationResult } = require('express-validator');

// Get user preferences
exports.getPreferences = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user by auth middleware
        const [preferences] = await db.query('SELECT preferences FROM users WHERE id = ?', [userId]);
        
        if (preferences.length > 0) {
            return res.status(200).json(preferences[0]);
        } else {
            return res.status(404).json({ message: 'Preferences not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Update user preferences
exports.updatePreferences = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user by auth middleware
        const { preferences } = req.body;

        await db.query('UPDATE users SET preferences = ? WHERE id = ?', [JSON.stringify(preferences), userId]);
        return res.status(200).json({ message: 'Preferences updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
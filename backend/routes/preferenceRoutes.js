const express = require('express');
const { getPreferences, updatePreferences } = require('../controllers/preferenceController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get user preferences
router.get('/', verifyToken, getPreferences);

// Route to update user preferences
router.put('/', verifyToken, updatePreferences);

module.exports = router;
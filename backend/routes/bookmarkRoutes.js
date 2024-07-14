const express = require('express');
const { addBookmark, getBookmarks, deleteBookmark } = require('../controllers/bookmarkController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to add a bookmark
router.post('/', verifyToken, addBookmark);

// Route to get all bookmarks for the authenticated user
router.get('/', verifyToken, getBookmarks);

// Route to delete a specific bookmark by ID
router.delete('/:id', verifyToken, deleteBookmark);

module.exports = router;
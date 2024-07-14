const Bookmark = require('../models/bookmarkModel');

// Add a bookmark
exports.addBookmark = async (req, res) => {
    try {
        const { articleId } = req.body; // Ensure articleId is extracted correctly
        const userId = req.user.id;

        if (!articleId) {
            return res.status(400).json({ success: false, message: 'Article ID is required' });
        }

        const bookmarkId = await Bookmark.create(userId, articleId);
        res.status(201).json({ success: true, bookmarkId });
    } catch (error) {
        console.error('Error adding bookmark:', error); // Add this line to log the error
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all bookmarks for the authenticated user
exports.getBookmarks = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookmarks = await Bookmark.findByUserId(userId);

        res.status(200).json({ success: true, bookmarks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete a bookmark
exports.deleteBookmark = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const affectedRows = await Bookmark.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Bookmark not found' });
        }

        res.status(200).json({ success: true, message: 'Bookmark deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
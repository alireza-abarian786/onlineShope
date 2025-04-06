const Bookmark = require('../models/Bookmark');

// Get all bookmarks
exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در دریافت بوکمارک‌ها' });
  }
};

// Create a new bookmark
exports.createBookmark = async (req, res) => {
  try {
    const newBookmark = new Bookmark(req.body);
    await newBookmark.save();
    res.status(201).json({ message: 'بوکمارک اضافه شد', bookmark: newBookmark });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در ذخیره بوکمارک' });
  }
};

// Update a bookmark
exports.updateBookmark = async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const updatedBookmark = await Bookmark.findByIdAndUpdate(bookmarkId, req.body, { new: true });
    if (!updatedBookmark) return res.status(404).json({ error: 'بوکمارک یافت نشد' });
    res.json(updatedBookmark);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در به‌روزرسانی بوکمارک' });
  }
};

// Delete a bookmark
exports.deleteBookmark = async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const deletedBookmark = await Bookmark.findByIdAndDelete(bookmarkId);
    if (!deletedBookmark) return res.status(404).json({ error: 'بوکمارک یافت نشد' });
    res.json({ message: 'بوکمارک حذف شد', bookmark: deletedBookmark });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در حذف بوکمارک' });
  }
};
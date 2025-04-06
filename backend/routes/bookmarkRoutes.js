const express = require('express');
const router = express.Router();
const {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark
} = require('../controllers/bookmarkController');

router.get('/', getBookmarks);
router.post('/', createBookmark);
router.put('/:id', updateBookmark);
router.delete('/:id', deleteBookmark);

module.exports = router;
const express = require('express');
const { getBlogs, getBlogById, createBlog } = require('../controllers/blogController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', protect, admin, createBlog);

module.exports = router;

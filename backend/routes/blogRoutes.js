// const express = require('express');
// const router = express.Router();
// const {
//   getBlogs,
//   createBlog,
//   updateBlog,
//   deleteBlog
// } = require('../controllers/blogController');

// router.get('/', getBlogs);
// router.post('/', createBlog);
// router.put('/:id', updateBlog);
// router.delete('/:id', deleteBlog);

// module.exports = router;




const express = require('express');
const { getBlogs, getBlogById, createBlog } = require('../controllers/blogController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', protect, admin, createBlog);

module.exports = router;

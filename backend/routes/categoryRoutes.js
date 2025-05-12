// const express = require('express');
// const router = express.Router();
// const {
//   getCategories,
//   createCategory,
//   updateCategory,
//   deleteCategory
// } = require('../controllers/categoryController');

// router.get('/', getCategories);
// router.post('/', createCategory);
// router.put('/:id', updateCategory);
// router.delete('/:id', deleteCategory);

// module.exports = router;




const express = require('express');
const { getCategories, createCategory } = require('../controllers/categoryController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, admin, createCategory);

module.exports = router;

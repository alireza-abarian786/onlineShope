// const express = require('express');
// const router = express.Router();
// const {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct
// } = require('../controllers/productController');

// router.get('/', getProducts);
// router.post('/', createProduct);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

// module.exports = router;





const express = require('express');
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const { protect, admin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, admin, createProduct);

module.exports = router;

const express = require('express');
// const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { getCart, addToCart, removeFromCart, updateCartItem } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
console.log("cartRoutes loaded");

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.delete('/remove', protect, removeFromCart);
router.put('/update', protect, updateCartItem);

module.exports = router;

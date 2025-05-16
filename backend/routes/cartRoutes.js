const express = require('express');
const { getCart, addToCart, removeFromCart, updateCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
console.log("cartRoutes loaded");

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.delete('/remove', protect, removeFromCart);
router.put('/update', protect, updateCart);

module.exports = router;

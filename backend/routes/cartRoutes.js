// const express = require('express');
// const router = express.Router();
// const {
//   getCart,
//   addItemToCart,
//   updateCartItem,
//   deleteCartItem,
//   deleteCart
// } = require('../controllers/cartController');

// router.get('/:userId', getCart);
// router.post('/:userId/items', addItemToCart);
// router.put('/:userId/items/:itemId', updateCartItem);
// router.delete('/:userId/items/:itemId', deleteCartItem);
// router.delete('/:userId/items', deleteCart);

// module.exports = router;



const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.delete('/remove', protect, removeFromCart);

module.exports = router;

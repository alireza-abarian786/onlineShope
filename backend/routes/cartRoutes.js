const express = require('express');
const router = express.Router();
const {
  getCart,
  addItemToCart,
  updateCartItem,
  deleteCartItem
} = require('../controllers/cartController');

router.get('/:userId', getCart);
router.post('/:userId/items', addItemToCart);
router.put('/:userId/items/:productId', updateCartItem);
router.delete('/:userId/items/:productId', deleteCartItem);

module.exports = router;
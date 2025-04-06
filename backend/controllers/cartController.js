const Cart = require('../models/Cart');

// Get cart by user ID
exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ _id: userId });
    if (!cart) return res.status(404).json({ error: 'سبد خرید یافت نشد' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در دریافت سبد خرید' });
  }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newItem = req.body;
    let cart = await Cart.findOne({ _id: userId });

    if (!cart) {
      cart = new Cart({ _id: userId, items: [], totalPrice: 0 });
    }

    cart.items.push(newItem);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();
    res.status(201).json({ message: 'محصول به سبد اضافه شد', cart });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در افزودن به سبد' });
  }
};

// Update item in cart
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const updatedItem = req.body;

    const cart = await Cart.findOne({ _id: userId });
    if (!cart) return res.status(404).json({ error: 'سبد خرید یافت نشد' });

    const itemIndex = cart.items.findIndex(item => item.product_id === productId);
    if (itemIndex === -1) return res.status(404).json({ error: 'محصول در سبد وجود ندارد' });

    cart.items[itemIndex] = updatedItem;
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();
    res.json({ message: 'محصول به‌روزرسانی شد', cart });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در به‌روزرسانی سبد' });
  }
};

// Delete item from cart
exports.deleteCartItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const cart = await Cart.findOne({ _id: userId });
    if (!cart) return res.status(404).json({ error: 'سبد خرید یافت نشد' });

    cart.items = cart.items.filter(item => item.product_id !== productId);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    await cart.save();
    res.json({ message: 'محصول از سبد حذف شد', cart });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در حذف از سبد' });
  }
};
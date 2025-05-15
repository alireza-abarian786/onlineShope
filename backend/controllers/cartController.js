const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's cart with total price
const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  let totalWithoutDiscount = 0;
  let totalWithDiscount = 0;

  cart.products.forEach(item => {
    const product = item.product;
    const quantity = item.quantity;
    const price = product.price;

    totalWithoutDiscount += price * quantity;

    // استخراج درصد تخفیف از دو رقم اول discount
    const discountStr = product.discount?.toString() || "0";
    const discountPercent = parseInt(discountStr.substring(0, 2)) || 0;

    const discountedPrice = price - (price * discountPercent / 100);
    totalWithDiscount += discountedPrice * quantity;
  });

  res.json({
    products: cart.products,
    totalWithoutDiscount: Math.round(totalWithoutDiscount),
    totalWithDiscount: Math.round(totalWithDiscount),
    totalDiscountAmount: Math.round(totalWithoutDiscount - totalWithDiscount)
  });
};




// Add product to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    cart = new Cart({ user: req.user.id, products: [] });
  }

  const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
  if (productIndex >= 0) {
    cart.products[productIndex].quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(201).json(cart);
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.products = cart.products.filter(item => item.product.toString() !== productId);
  await cart.save();
  res.json(cart);
};

// Update product quantity in cart
const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity == null) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const itemIndex = cart.products.findIndex(item => item.product.toString() === productId);
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Product not found in cart' });
  }

  cart.products[itemIndex].quantity = quantity;
  await cart.save();

  res.json({ message: 'Cart updated', cart });
};

module.exports = { getCart, addToCart, removeFromCart, updateCartItem };
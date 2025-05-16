const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's cart with total price
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');

    if (!cart || !cart.products || cart.products.length === 0) {
      return res.status(200).json({
        products: [],
        totalWithoutDiscount: 0,
        totalDiscountAmount: 0,
        totalWithDiscount: 0,
      });
    }

    let totalWithoutDiscount = 0;
    let totalDiscountAmount = 0;

    const detailedProducts = cart.products.map((item) => {
      const product = item.product;
      const quantity = item.quantity;
      const price = product?.price || 0;
      const discountPercent = product.discount ? parseInt(product.discount.toString().slice(0, 2)) : 0;

      const productTotal = price * quantity;
      const discountAmount = (productTotal * discountPercent) / 100;
      const finalPrice = productTotal - discountAmount;

      totalWithoutDiscount += productTotal;
      totalDiscountAmount += discountAmount;

      return {
        ...item.toObject(),
        productTotal,
        discountAmount,
        finalPrice,
        discountPercent,
      };
    });

    const totalWithDiscount = totalWithoutDiscount - totalDiscountAmount;

    res.status(200).json({
      products: detailedProducts,
      totalWithoutDiscount,
      totalDiscountAmount,
      totalWithDiscount,
    });

  } catch (error) {
    console.error('🔥 خطا در getCart:', error);
    res.status(500).json({ message: 'خطا در دریافت سبد خرید' });
  }
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
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.products.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.products[itemIndex].quantity = quantity;
    await cart.save();

    // برگردوندن cart با اطلاعات کامل محصول
    const updatedCart = await Cart.findOne({ user: req.user.id }).populate('products.product');

    res.status(200).json({
      message: 'Cart updated',
      cart: updatedCart,
    });

  } catch (error) {
    console.error('🔥 خطا در updateCartItem:', error);
    res.status(500).json({ message: 'خطا در به‌روزرسانی سبد خرید' });
  }
};


module.exports = { getCart, addToCart, removeFromCart, updateCartItem };
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
      if (!product) return null;

      const quantity = item.quantity;
      const price = product.price || 0;
      const discountPercent = product.discount
        ? parseInt(product.discount.toString().slice(0, 2))
        : 0;

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
    }).filter(Boolean);

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

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
      return res.status(400).json({ message: 'productId و quantity الزامی است.' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'quantity باید بزرگتر از صفر باشد.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'محصول یافت نشد' });
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
    await cart.populate('products.product');

    let totalWithoutDiscount = 0;
    let totalDiscountAmount = 0;

    const processedProducts = cart.products.map(item => {
      const product = item.product;
      if (!product) return null;

      const qty = item.quantity;
      const price = product.price || 0;
      const discountPercent = product.discount ? parseInt(product.discount.toString().slice(0, 2)) : 0;
      const productTotal = price * qty;
      const discountAmount = (productTotal * discountPercent) / 100;
      const finalPrice = productTotal - discountAmount;

      totalWithoutDiscount += productTotal;
      totalDiscountAmount += discountAmount;

      return {
        product: item.product.toObject(),
        quantity: item.quantity,
        _id: item._id,
        discountAmount,
        discountPercent,
        finalPrice,
        productTotal,
      };
    }).filter(Boolean);

    const totalWithDiscount = totalWithoutDiscount - totalDiscountAmount;

    res.status(201).json({
      message: 'محصول با موفقیت به سبد خرید اضافه شد',
      cart: {
        _id: cart._id,
        user: cart.user,
        products: processedProducts,
        totalWithoutDiscount,
        totalDiscountAmount,
        totalWithDiscount,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
        __v: cart.__v,
      },
    });
  } catch (error) {
    console.error('🔥 خطا در addToCart:', error);
    res.status(500).json({ message: 'خطا در افزودن به سبد خرید' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId الزامی است.' });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'سبد خرید یافت نشد' });
    }

    cart.products = cart.products.filter(item => item.product.toString() !== productId);
    await cart.save();

    if (cart.products.length === 0) {
      return res.status(200).json({
        message: 'محصول با موفقیت از سبد خرید حذف شد',
        cart: {
          _id: cart._id,
          user: cart.user,
          products: [],
          totalWithoutDiscount: 0,
          totalDiscountAmount: 0,
          totalWithDiscount: 0,
          createdAt: cart.createdAt,
          updatedAt: cart.updatedAt,
          __v: cart.__v,
        },
      });
    }

    await cart.populate('products.product');

    let totalWithoutDiscount = 0;
    let totalDiscountAmount = 0;

    const processedProducts = cart.products.map(item => {
      const product = item.product;
      if (!product) return null;

      const qty = item.quantity;
      const price = product.price || 0;
      const discountPercent = product.discount ? parseInt(product.discount.toString().slice(0, 2)) : 0;
      const productTotal = price * qty;
      const discountAmount = (productTotal * discountPercent) / 100;
      const finalPrice = productTotal - discountAmount;

      totalWithoutDiscount += productTotal;
      totalDiscountAmount += discountAmount;

      return {
        product: item.product.toObject(),
        quantity: item.quantity,
        _id: item._id,
        discountAmount,
        discountPercent,
        finalPrice,
        productTotal,
      };
    }).filter(Boolean);

    const totalWithDiscount = totalWithoutDiscount - totalDiscountAmount;

    res.status(200).json({
      message: 'محصول با موفقیت از سبد خرید حذف شد',
      cart: {
        _id: cart._id,
        user: cart.user,
        products: processedProducts,
        totalWithoutDiscount,
        totalDiscountAmount,
        totalWithDiscount,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
        __v: cart.__v,
      },
    });
  } catch (error) {
    console.error('🔥 خطا در removeFromCart:', error);
    res.status(500).json({ message: 'خطا در حذف از سبد خرید' });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
      return res.status(400).json({ message: 'productId و quantity الزامی است.' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex > -1) {
      if (quantity <= 0) {
        cart.products.splice(productIndex, 1);
      } else {
        cart.products[productIndex].quantity = quantity;
      }
    } else {
      if (quantity > 0) {
        cart.products.push({ product: productId, quantity });
      } else {
        return res.status(400).json({ message: 'quantity باید بزرگتر از صفر باشد.' });
      }
    }

    await cart.save();
    await cart.populate('products.product');

    let totalWithoutDiscount = 0;
    let totalDiscountAmount = 0;

    const processedProducts = cart.products.map(item => {
      const product = item.product;
      if (!product) return null;

      const qty = item.quantity;
      const price = product.price || 0;
      const discountPercent = product.discount ? parseInt(product.discount.toString().slice(0, 2)) : 0;
      const productTotal = price * qty;
      const discountAmount = (productTotal * discountPercent) / 100;
      const finalPrice = productTotal - discountAmount;

      totalWithoutDiscount += productTotal;
      totalDiscountAmount += discountAmount;

      return {
        product: item.product.toObject(),
        quantity: item.quantity,
        _id: item._id,
        discountAmount,
        discountPercent,
        finalPrice,
        productTotal,
      };
    }).filter(Boolean);

    const totalWithDiscount = totalWithoutDiscount - totalDiscountAmount;

    res.status(200).json({
      message: 'Cart updated',
      cart: {
        _id: cart._id,
        user: cart.user,
        products: processedProducts,
        totalWithoutDiscount,
        totalDiscountAmount,
        totalWithDiscount,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
        __v: cart.__v,
      },
    });
  } catch (error) {
    console.error('🔥 خطا در updateCart:', error);
    res.status(500).json({ message: 'خطا در به‌روزرسانی سبد خرید' });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'سبد خرید یافت نشد' });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({ message: 'سبد خرید با موفقیت خالی شد', cart });
  } catch (error) {
    console.error('🔥 خطا در clearCart:', error);
    res.status(500).json({ message: 'خطا در خالی کردن سبد خرید' });
  }
};

module.exports = { getCart, addToCart, removeFromCart, updateCart, clearCart };

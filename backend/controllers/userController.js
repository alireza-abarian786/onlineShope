const User = require('../models/User');
const Cart = require('../models/Cart');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در دریافت کاربران' });
  }
};

// ثبت‌نام کاربر
exports.createUser = async (req, res) => {
  try {
    // بررسی اطلاعات ورودی
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'لطفاً تمام فیلدهای ضروری را پر کنید' });
    }

    // بررسی وجود ایمیل تکراری
    const existingUser = await User.findOne({ 
      $or: [
        { email: req.body.email },
        { name: req.body.name }
      ]
    });

    if (existingUser) {
      if (existingUser.email === req.body.email) {
        return res.status(400).json({ error: 'این ایمیل قبلاً ثبت شده است' });
      }
      if (existingUser.name === req.body.name) {
        return res.status(400).json({ error: 'این نام کاربری قبلاً ثبت شده است' });
      }
    }

    const newUser = new User(req.body);
    await newUser.save();

    // ایجاد یک سبد خرید خالی برای کاربر جدید
    const newCart = new Cart({
      _id: newUser._id,
      items: [],
      totalPrice: 0
    });
    await newCart.save();

    res.status(201).json({ 
      message: 'کاربر با موفقیت ثبت شد',
      user: newUser,
      cart: newCart 
    });

  } catch (error) {
    console.error("🚨 Error in createUser:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'داده‌های ورودی نامعتبر هستند' });
    }
    
    res.status(500).json({ error: 'خطا در ثبت کاربر جدید' });
  }
};

// لاگین کاربر
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. بررسی وجود کاربر با ایمیل و رمز عبور
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'ایمیل یا رمز عبور اشتباه است' });
    }

    // 2. بررسی وجود سبد خرید برای کاربر
    let cart = await Cart.findOne({ _id: user._id });
    if (!cart) {
      // ایجاد سبد خرید خالی اگر وجود نداشت
      cart = new Cart({
        _id: user._id,
        items: [],
        totalPrice: 0,
      });
      await cart.save();
    }

    // 3. ارسال پاسخ موفقیت‌آمیز
    res.status(200).json({
      message: 'کاربر با موفقیت لاگین کرد',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      cart: cart,
    });
  } catch (error) {
    console.error("🚨 Error in loginUser:", error);
    return res.status(500).json({ error: 'مشکل در لاگین کاربر' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'کاربر یافت نشد' });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در به‌روزرسانی کاربر' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ error: 'کاربر یافت نشد' });
    res.json({ message: 'کاربر حذف شد', user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در حذف کاربر' });
  }
};
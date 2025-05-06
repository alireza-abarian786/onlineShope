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
    console.log('Received request body:', req.body);

    // بررسی اطلاعات ورودی
    if (!req.body.name || !req.body.email || !req.body.password) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'لطفاً تمام فیلدهای ضروری را پر کنید' });
    }

    // اعتبارسنجی ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      console.log('Invalid email format');
      return res.status(400).json({ error: 'فرمت ایمیل نامعتبر است' });
    }

    // اعتبارسنجی شماره تلفن
    if (req.body.phone) {
      const phoneRegex = /^09[0-9]{9}$/;
      if (!phoneRegex.test(req.body.phone)) {
        console.log('Invalid phone format');
        return res.status(400).json({ error: 'شماره تلفن باید با 09 شروع شود و 11 رقم باشد' });
      }
    }

    // بررسی وجود ایمیل تکراری
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ 
      $or: [
        { email: req.body.email.toLowerCase() },
        { name: req.body.name }
      ]
    });

    if (existingUser) {
      console.log('Found existing user:', existingUser);
      if (existingUser.email === req.body.email.toLowerCase()) {
        return res.status(400).json({ error: 'این ایمیل قبلاً ثبت شده است' });
      }
      if (existingUser.name === req.body.name) {
        return res.status(400).json({ error: 'این نام کاربری قبلاً ثبت شده است' });
      }
    }

    console.log('Creating new user...');
    const newUser = new User({
      name: req.body.name.trim(),
      email: req.body.email.toLowerCase().trim(),
      password: req.body.password.trim(),
      phone: req.body.phone ? req.body.phone.trim() : undefined,
      address: req.body.address ? req.body.address.trim() : undefined
    });

    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser);

    // ایجاد یک سبد خرید خالی برای کاربر جدید
    console.log('Creating new cart...');
    const newCart = new Cart({
      _id: savedUser._id,
      items: [],
      totalPrice: 0
    });
    
    const savedCart = await newCart.save();
    console.log('Cart created successfully:', savedCart);

    res.status(201).json({ 
      message: 'کاربر با موفقیت ثبت شد',
      user: savedUser,
      cart: savedCart 
    });

  } catch (error) {
    console.error("🚨 Error in createUser:", error);
    console.error("Error stack:", error.stack);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: 'داده‌های ورودی نامعتبر هستند',
        details: errors
      });
    }

    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ 
        error: 'این ایمیل یا نام کاربری قبلاً ثبت شده است'
      });
    }
    
    res.status(500).json({ 
      error: 'خطا در ثبت کاربر جدید',
      details: error.message 
    });
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
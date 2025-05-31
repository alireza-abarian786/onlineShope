const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register user
const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  // بررسی وجود تمام فیلدها
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: 'تمام فیلدها الزامی هستند.' });
  }

  // بررسی فرمت شماره تلفن
  const phoneRegex = /^09\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'فرمت شماره تلفن معتبر نیست.' });
  }

  // بررسی وجود شماره تلفن تکراری
  const existingPhone = await User.findOne({ phone });
  if (existingPhone) {
    return res.status(400).json({ message: 'این شماره قبلاً ثبت شده.' });
  }

  // بررسی وجود ایمیل تکراری
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'این ایمیل قبلاً ثبت شده.' });
  }

  // هش کردن رمز عبور
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ساخت کاربر جدید
  const user = new User({
    name,
    email,
    password: hashedPassword,
    phone,
  });

  await user.save();

  // ساخت توکن
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '72h' });

  // ارسال پاسخ
  res.status(201).json({ token });
};



// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '72h' });

  res.json({ token , username: user.name});
};

module.exports = { registerUser, loginUser };

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register user
const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  // بررسی وجود تمام فیلدها
  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "تمام فیلدها الزامی هستند." });
  }

  // بررسی فرمت شماره تلفن
  const phoneRegex = /^09\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ message: "فرمت شماره تلفن معتبر نیست." });
  }

  // بررسی وجود شماره تلفن تکراری
  const existingPhone = await User.findOne({ phone });
  if (existingPhone) {
    return res.status(400).json({ message: "این شماره قبلاً ثبت شده." });
  }

  // بررسی وجود ایمیل تکراری
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "این ایمیل قبلاً ثبت شده." });
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
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "72h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // فقط در HTTPS روشن بشه
    sameSite: "strict", // جلوگیری از حمله CSRF
    maxAge: 1000 * 60 * 60 * 72, // ۳ روز
  });

  res.json({ username: user.name }); // فقط اطلاعات غیرحساس برگردون

  // ارسال پاسخ
  // res.status(201).json({ token });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "72h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // فقط در HTTPS روشن بشه
    sameSite: "strict", // جلوگیری از حمله CSRF
    maxAge: 1000 * 60 * 60 * 72, // ۳ روز
  });

  res.json({ username: user.name }); // فقط اطلاعات غیرحساس برگردون

  // res.json({ token , username: user.name});
};


const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({ message: "خروج با موفقیت انجام شد" });
};


module.exports = { registerUser, loginUser };

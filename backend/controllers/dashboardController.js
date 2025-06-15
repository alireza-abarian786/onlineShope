const asyncHandler = require('express-async-handler');
const PendingTask = require('../models/pendingTask');
const RecentActivity = require('../models/recentActivity');
const User = require('../models/User');
// مدل‌های دیگه (مثل Order یا Product) که برای purchases یا recommended-products نیازه
const Order = require('../models/Cart'); // فرضی
const Product = require('../models/Product'); // فرضی

// @desc    دریافت خریدها
// @route   GET /api/dashboard/purchases
// @access  Private
const getPurchases = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    دریافت وظایف در انتظار
// @route   GET /api/dashboard/pending-tasks
// @access  Private
const getPendingTasks = asyncHandler(async (req, res) => {
  const tasks = await PendingTask.find({ user: req.user._id });
  res.json(tasks);
});

// @desc    اضافه کردن وظیفه جدید
// @route   POST /api/dashboard/pending-tasks
// @access  Private
const addPendingTask = asyncHandler(async (req, res) => {
  const { task } = req.body;
  if (!task) {
    res.status(400);
    throw new Error('لطفاً متن وظیفه را وارد کنید');
  }

  const pendingTask = await PendingTask.create({
    user: req.user._id,
    task,
  });

  res.status(201).json(pendingTask);
});

// @desc    حذف وظیفه
// @route   DELETE /api/dashboard/pending-tasks/:id
// @access  Private
const deletePendingTask = asyncHandler(async (req, res) => {
  const task = await PendingTask.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('وظیفه یافت نشد');
  }
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('شما اجازه حذف این وظیفه را ندارید');
  }

  await task.deleteOne();
  res.json({ message: 'وظیفه حذف شد' });
});

// @desc    دریافت محصولات پیشنهادی
// @route   GET /api/dashboard/recommended-products
// @access  Private
const getRecommendedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().limit(5); // مثال ساده
  res.json(products);
});

// @desc    دریافت فعالیت‌های اخیر
// @route   GET /api/dashboard/recent-activities
// @access  Private
const getRecentActivities = asyncHandler(async (req, res) => {
  const activities = await RecentActivity.find({ user: req.user._id });
  res.json(activities);
});

// @desc    اضافه کردن فعالیت جدید
// @route   POST /api/dashboard/recent-activities
// @access  Private
const addRecentActivity = asyncHandler(async (req, res) => {
  const { activity } = req.body;
  if (!activity) {
    res.status(400);
    throw new Error('لطفاً متن فعالیت را وارد کنید');
  }

  const recentActivity = await RecentActivity.create({
    user: req.user._id,
    activity,
  });

  res.status(201).json(recentActivity);
});

// @desc    حذف فعالیت
// @route   DELETE /api/dashboard/recent-activities/:id
// @access  Private
const deleteRecentActivity = asyncHandler(async (req, res) => {
  const activity = await RecentActivity.findById(req.params.id);
  if (!activity) {
    res.status(404);
    throw new Error('فعالیت یافت نشد');
  }
  if (activity.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('شما اجازه حذف این فعالیت را ندارید');
  }

  await activity.deleteOne();
  res.json({ message: 'فعالیت حذف شد' });
});

// @desc    دریافت موجودی
// @route   GET /api/dashboard/balance
// @access  Private
const getBalance = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('balance');
  res.json({ balance: user.balance });
});

// @desc    اضافه کردن موجودی
// @route   PUT /api/dashboard/balance
// @access  Private
const addBalance = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error('مبلغ باید بیشتر از صفر باشد');
  }

  const user = await User.findById(req.user._id);
  user.balance += amount;
  await user.save();

  res.json({ balance: user.balance });
});

module.exports = {
  getPurchases,
  getPendingTasks,
  addPendingTask,
  deletePendingTask,
  getRecommendedProducts,
  getRecentActivities,
  addRecentActivity,
  deleteRecentActivity,
  getBalance,
  addBalance,
};
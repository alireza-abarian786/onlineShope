const Purchase = require('../models/purchase');
const PendingTask = require('../models/pendingTask');
const Product = require('../models/Product');
const RecentActivity = require('../models/recentActivity');

const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id });
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
};

const getPendingTasks = async (req, res) => {
  try {
    const tasks = await PendingTask.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
};

const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(2); // فقط ۲ محصول پیشنهادی
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
};

const getRecentActivities = async (req, res) => {
  try {
    const activities = await RecentActivity.find({ user: req.user._id });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
};

const getBalance = async (req, res) => {
  try {
    res.json({ balance: req.user.balance || 0 });
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
};

const addBalance = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await req.user;
    user.balance = (user.balance || 0) + amount;
    await user.save();
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
};

module.exports = {
  getPurchases,
  getPendingTasks,
  getRecommendedProducts,
  getRecentActivities,
  getBalance,
  addBalance,
};
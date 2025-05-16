const User = require('../models/User');
const Product = require('../models/Product');

// Get user profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ name: user.name, email: user.email, favorites: user.favorites });
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  await user.save();
  res.json({ message: 'Profile updated successfully' });
};

// Add product to user's favorites
const addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'کاربر یافت نشد' });
    if (!await Product.findById(productId)) return res.status(404).json({ message: 'محصول یافت نشد' });

    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }

    res.status(200).json({ message: 'محصول به علاقه‌مندی‌ها اضافه شد', favorites: user.favorites });
  } catch (error) {
    console.error('🔥 خطا در addToFavorites:', error);
    res.status(500).json({ message: 'خطا در افزودن به علاقه‌مندی‌ها' });
  }
};

// Remove product from user's favorites
const removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'کاربر یافت نشد' });

    user.favorites = user.favorites.filter(id => id.toString() !== productId);
    await user.save();

    res.status(200).json({ message: 'محصول از علاقه‌مندی‌ها حذف شد', favorites: user.favorites });
  } catch (error) {
    console.error('🔥 خطا در removeFromFavorites:', error);
    res.status(500).json({ message: 'خطا در حذف از علاقه‌مندی‌ها' });
  }
};

// Get user's favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    if (!user) return res.status(404).json({ message: 'کاربر یافت نشد' });

    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error('🔥 خطا در getFavorites:', error);
    res.status(500).json({ message: 'خطا در دریافت علاقه‌مندی‌ها' });
  }
};

module.exports = { getUserProfile, updateUserProfile, addToFavorites, removeFromFavorites, getFavorites };
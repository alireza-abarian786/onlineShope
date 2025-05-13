const User = require('../models/User');

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

module.exports = { getUserProfile, updateUserProfile };

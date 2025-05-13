const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};

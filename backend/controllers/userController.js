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

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    // Create an empty cart for the new user
    const newCart = new Cart({
      _id: newUser._id,
      items: [],
      totalPrice: 0
    });
    await newCart.save();

    res.status(201).json({ message: 'کاربر اضافه شد', user: newUser, cart: newCart });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در ذخیره کاربر' });
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
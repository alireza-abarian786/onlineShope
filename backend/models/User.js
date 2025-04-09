const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  phone: String,
  registration_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
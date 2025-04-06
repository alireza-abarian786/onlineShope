const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  id: { type: String, required: true },
  product_name: String,
  user_id: String,
  product_id: String
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
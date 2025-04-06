const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category_id: { type: String, required: true },
  description: String,
  images: [String],
  stock: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  ratings: { type: Number, default: 0 },
  reviews: [{
    user_id: String,
    comment: String,
    rating: Number
  }]
});

module.exports = mongoose.model('Product', productSchema);
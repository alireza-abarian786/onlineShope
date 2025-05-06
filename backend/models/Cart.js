const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    // cart_id: String,
    // _id: String,
    product_id: String,
    product_name: String,
    product_images: [String],
    product_description: String,
    product_ratings: { type: Number },
    discount: { type: Number },
    price: Number,
    quantity: Number,
    totalPriceProductCart: Number
  }],
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
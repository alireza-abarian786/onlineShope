// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [{
//     _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
//     product_id: { type: String, required: true },
//     product_name: { type: String, required: true },
//     product_images: [String],
//     product_description: String,
//     product_ratings: { type: Number, default: 0 },
//     discount: { type: Number, default: 0 },
//     price: { type: Number, required: true },
//     quantity: { type: Number, default: 1 },
//     totalPriceProductCart: { type: Number, required: true }
//   }],
//   totalPrice: { type: Number, default: 0 }
// }, {
//   timestamps: true
// });

// // ایجاد ایندکس برای جستجوی سریع‌تر
// cartSchema.index({ userId: 1 });

// module.exports = mongoose.model('Cart', cartSchema);




const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Cart', cartSchema);

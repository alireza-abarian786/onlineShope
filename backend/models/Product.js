const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image: {
    type: String,
  },
  discount: {         // <-- اضافه کن این خط
    type: Number,
    default: 0,       // اگر مقدار نداشت صفر فرض می‌کنیم
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);

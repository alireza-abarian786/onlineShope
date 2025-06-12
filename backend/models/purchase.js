const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['ارسال شده', 'در حال پردازش', 'تحویل شده'],
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Purchase', purchaseSchema);
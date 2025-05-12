// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   name: { type: String, required: true },
//   urlSearch: { type: String, required: true },
//   description: String
// });

// module.exports = mongoose.model('Category', categorySchema);





const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Category', categorySchema);

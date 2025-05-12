// const mongoose = require('mongoose');

// const blogSchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   image: String,
//   author_id: { type: String, required: true },
//   created_at: { type: Date, default: Date.now },
//   comments: [{
//     user_id: String,
//     text: String
//   }]
// });

// module.exports = mongoose.model('Blog', blogSchema);




const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);

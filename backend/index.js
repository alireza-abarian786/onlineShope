// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// // const connectionString = 'mongodb+srv://alireza-user:PcCjLKlPX2QdvKMc@cluster0.ay7lp.mongodb.net/onlineShopDB?retryWrites=true&w=majority';
// console.log('MONGODB_URI:', process.env.MONGODB_URI); // برای تست

// // Import Routes
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const userRoutes = require('./routes/userRoutes');
// const blogRoutes = require('./routes/blogRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
// const bookmarkRoutes = require('./routes/bookmarkRoutes');

// const app = express();
// const PORT = process.env.PORT || 4001;

// // Middleware
// app.use(cors({
//   origin: '*', // یا آدرس دقیق فرانت‌اند شما
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));


// app.use(express.json());
// // اضافه کردن middleware برای لاگ کردن درخواست‌ها
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//   console.log('Request Body:', req.body);
//   next();
// });

// // Routes
// app.use('/api/products', productRoutes);
// app.use('/api/carts', cartRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/bookmarks', bookmarkRoutes);
// // اضافه کردن در server.js
// app.get('/api/test', (req, res) => {
//   res.json({
//     status: 'ok',
//     message: 'سرور در حال کار کردن است',
//     time: new Date().toISOString()
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Global error handler:', err);
//   console.error('Error stack:', err.stack);
//   res.status(500).json({
//     error: 'خطای سرور',
//     details: err.message,
//     stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//   });
// });

// // Connect to MongoDB
// // const MONGODB_URI = 'mongodb+srv://alireza-user:PcCjLKlPX2QdvKMc@cluster0.ay7lp.mongodb.net/onlineShopDB?retryWrites=true&w=majority';

// mongoose.connect(MONGODB_URI)
//   .then(async () => {
//     console.log('Connected to MongoDB');
//     console.log('MongoDB URI:', MONGODB_URI);

//     try {
//       // حذف ایندکس‌های قبلی
//       const db = mongoose.connection.db;
//       await db.collection('users').dropIndexes();
//       console.log('Indexes dropped successfully');
//     } catch (error) {
//       console.error('Error dropping indexes:', error);
//     }
//   })
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log('Environment:', process.env.NODE_ENV || 'development');
// });










// server.js - بک‌اند فروشگاه آنلاین بهینه‌شده
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
// const dotenv = require('dotenv');

// اتصال به دیتابیس با mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Connection error:', err));


// تنظیمات اولیه
// dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/onlineshop';

// میدلورها
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

// مدل‌های دیتابیس
const User = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}));

const Product = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  images: [String],
  ratings: { type: Number, default: 0 },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}));

const CartItemSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  product_name: { type: String, required: true },
  product_images: [String],
  product_description: String,
  product_ratings: Number,
  discount: Number,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  totalPriceProductCart: { type: Number, required: true }
});

const Cart = mongoose.model('Cart', new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [CartItemSchema],
  updatedAt: { type: Date, default: Date.now }
}));

const Category = mongoose.model('Category', new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String
}));

const Bookmark = mongoose.model('Bookmark', new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}));

const Blog = mongoose.model('Blog', new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: String,
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}));

// روت‌های API
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'خطا در دریافت اطلاعات کاربران' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'خطا در دریافت اطلاعات محصولات' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'خطا در دریافت اطلاعات دسته‌بندی‌ها' });
  }
});

app.get('/api/bookmarks', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: 'خطا در دریافت اطلاعات نشانک‌ها' });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'خطا در دریافت اطلاعات وبلاگ‌ها' });
  }
});

// سبد خرید
app.get('/api/carts/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      cart = new Cart({ userId: req.params.userId, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'خطا در دریافت اطلاعات سبد خرید' });
  }
});

app.post('/api/carts/:userId/items', async (req, res) => {
  try {
    const { userId } = req.params;
    const newItem = req.body;
    if (!newItem.product_id || !newItem.product_name || !newItem.price) {
      return res.status(400).json({ error: 'اطلاعات محصول ناقص است' });
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });
    const exists = cart.items.some(item => item.product_id === newItem.product_id);
    if (exists) return res.status(400).json({ error: 'محصول قبلاً اضافه شده است' });
    cart.items.push(newItem);
    cart.updatedAt = Date.now();
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'خطا در افزودن محصول به سبد خرید' });
  }
});

app.put('/api/carts/:userId/items/:itemId', async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity, totalPriceProductCart } = req.body;
    if (!quantity || quantity < 1) return res.status(400).json({ error: 'تعداد نامعتبر است' });
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'سبد خرید یافت نشد' });
    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ error: 'آیتم یافت نشد' });
    item.quantity = quantity;
    item.totalPriceProductCart = totalPriceProductCart;
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'خطا در به‌روزرسانی محصول' });
  }
});

app.delete('/api/carts/:userId/items/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ error: 'سبد خرید یافت نشد' });
    cart.items = cart.items.filter(item => item.id !== req.params.itemId);
    cart.updatedAt = Date.now();
    await cart.save();
    res.json({ message: 'محصول حذف شد' });
  } catch (error) {
    res.status(500).json({ error: 'خطا در حذف محصول' });
  }
});

app.delete('/api/carts/:userId/items', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ error: 'سبد خرید یافت نشد' });
    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();
    res.json({ message: 'سبد خرید خالی شد' });
  } catch (error) {
    res.status(500).json({ error: 'خطا در خالی کردن سبد خرید' });
  }
});

// اجرای سرور
app.listen(PORT, () => console.log(`🚀 سرور در حال اجرا روی پورت ${PORT}`));


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










// server.js - بک‌اند سرور برای فروشگاه آنلاین
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');

// تنظیمات اولیه
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// میدلور‌ها
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));

// اتصال به دیتابیس
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/onlineshop')
  .then(() => console.log('اتصال به دیتابیس با موفقیت انجام شد'))
  .catch(err => console.error('خطا در اتصال به دیتابیس:', err));

// مدل‌های دیتابیس
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  images: [String],
  ratings: { type: Number, default: 0 },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const CartItemSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  product_name: { type: String, required: true },
  product_images: [String],
  product_description: String,
  product_ratings: Number,
  discount: Number,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  totalPriceProductCart: { type: Number, required: true }
});

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [CartItemSchema],
  updatedAt: { type: Date, default: Date.now }
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String
});

const BookmarkSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: String,
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// ایجاد مدل‌ها
const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Cart = mongoose.model('Cart', CartSchema);
const Category = mongoose.model('Category', CategorySchema);
const Bookmark = mongoose.model('Bookmark', BookmarkSchema);
const Blog = mongoose.model('Blog', BlogSchema);

// روت‌های API

// کاربران
app.get('/api/users', async (req, res) => {
  try {
    console.log('GET /api/users');
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('خطا در دریافت کاربران:', error);
    res.status(500).json({ error: 'خطا در دریافت اطلاعات کاربران' });
  }
});

// محصولات
app.get('/api/products', async (req, res) => {
  try {
    console.log('GET /api/products');
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('خطا در دریافت محصولات:', error);
    res.status(500).json({ error: 'خطا در دریافت اطلاعات محصولات' });
  }
});

// دسته‌بندی‌ها
app.get('/api/categories', async (req, res) => {
  try {
    console.log('GET /api/categories');
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('خطا در دریافت دسته‌بندی‌ها:', error);
    res.status(500).json({ error: 'خطا در دریافت اطلاعات دسته‌بندی‌ها' });
  }
});

// نشانک‌ها
app.get('/api/bookmarks', async (req, res) => {
  try {
    console.log('GET /api/bookmarks');
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (error) {
    console.error('خطا در دریافت نشانک‌ها:', error);
    res.status(500).json({ error: 'خطا در دریافت اطلاعات نشانک‌ها' });
  }
});

// وبلاگ‌ها
app.get('/api/blogs', async (req, res) => {
  try {
    console.log('GET /api/blogs');
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('خطا در دریافت وبلاگ‌ها:', error);
    res.status(500).json({ error: 'خطا در دریافت اطلاعات وبلاگ‌ها' });
  }
});

// سبد خرید
app.get('/api/carts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`GET /api/carts/${userId}`);
    console.log('Request Body:', req.body);
    
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    console.error('خطا در دریافت سبد خرید:', error);
    res.status(500).json({ error: 'خطا در دریافت اطلاعات سبد خرید' });
  }
});

// افزودن آیتم به سبد خرید
app.post('/api/carts/:userId/items', async (req, res) => {
  try {
    const { userId } = req.params;
    const newItem = req.body;
    console.log(`POST /api/carts/${userId}/items`);
    console.log('Request Body:', newItem);
    
    if (!newItem.product_id || !newItem.product_name || !newItem.price) {
      return res.status(400).json({ error: 'اطلاعات محصول ناقص است' });
    }
    
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    
    // بررسی وجود محصول در سبد خرید
    const existingItemIndex = cart.items.findIndex(item => 
      item.product_id.toString() === newItem.product_id.toString()
    );
    
    if (existingItemIndex > -1) {
      return res.status(400).json({ error: 'این محصول قبلاً به سبد خرید اضافه شده است' });
    }
    
    cart.items.push(newItem);
    cart.updatedAt = Date.now();
    
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error('خطا در افزودن به سبد خرید:', error);
    res.status(500).json({ error: 'خطا در افزودن محصول به سبد خرید' });
  }
});

// به‌روزرسانی آیتم در سبد خرید
app.put('/api/carts/:userId/items/:itemId', async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const updatedItem = req.body;
    
    console.log(`PUT /api/carts/${userId}/items/${itemId}`);
    console.log('Request Body:', updatedItem);
    
    if (!updatedItem.quantity || updatedItem.quantity < 1) {
      return res.status(400).json({ error: 'تعداد محصول باید حداقل 1 باشد' });
    }
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'سبد خرید یافت نشد' });
    }
    
    const itemIndex = cart.items.findIndex(item => 
      item._id.toString() === itemId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'محصول در سبد خرید یافت نشد' });
    }
    
    cart.items[itemIndex].quantity = updatedItem.quantity;
    cart.items[itemIndex].totalPriceProductCart = updatedItem.totalPriceProductCart;
    cart.updatedAt = Date.now();
    
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('خطا در به‌روزرسانی سبد خرید:', error);
    res.status(500).json({ error: 'خطا در به‌روزرسانی محصول در سبد خرید' });
  }
});

// حذف آیتم از سبد خرید
app.delete('/api/carts/:userId/items/:itemId', async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    console.log(`DELETE /api/carts/${userId}/items/${itemId}`);
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'سبد خرید یافت نشد' });
    }
    
    const itemIndex = cart.items.findIndex(item => 
      item._id.toString() === itemId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'محصول در سبد خرید یافت نشد' });
    }
    
    cart.items.splice(itemIndex, 1);
    cart.updatedAt = Date.now();
    
    await cart.save();
    res.json({ message: 'محصول با موفقیت از سبد خرید حذف شد' });
  } catch (error) {
    console.error('خطا در حذف از سبد خرید:', error);
    res.status(500).json({ error: 'خطا در حذف محصول از سبد خرید' });
  }
});

// حذف تمام آیتم‌ها از سبد خرید
app.delete('/api/carts/:userId/items', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`DELETE /api/carts/${userId}/items`);
    
    const cart = await Cart.findOne({ userId });
    
    if (!cart) {
      return res.status(404).json({ error: 'سبد خرید یافت نشد' });
    }
    
    cart.items = [];
    cart.updatedAt = Date.now();
    
    await cart.save();
    res.json({ message: 'سبد خرید با موفقیت خالی شد' });
  } catch (error) {
    console.error('خطا در خالی کردن سبد خرید:', error);
    res.status(500).json({ error: 'خطا در خالی کردن سبد خرید' });
  }
});

// شروع سرور
app.listen(PORT, () => {
  console.log(`سرور در پورت ${PORT} در حال اجرا است...`);
});
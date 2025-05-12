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









require('dotenv').config({ path: __dirname + '/.env' });
const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

console.log('MONGO_URI is:', process.env.MONGO_URI);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



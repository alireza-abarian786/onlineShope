const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './backend/.env' });

// const connectionString = 'mongodb+srv://alireza-user:PcCjLKlPX2QdvKMc@cluster0.ay7lp.mongodb.net/onlineShopDB?retryWrites=true&w=majority';
console.log('MONGODB_URI:', process.env.MONGODB_URI); // برای تست

// Import Routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');

const app = express();
const PORT = process.env.PORT || 4000;


// Middleware
app.use(cors({
  origin: '*', // یا آدرس دقیق فرانت‌اند شما
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// Connect to MongoDB
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1); // خروج از برنامه در صورت عدم وجود MONGODB_URI
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Connection error:', err.message);
    process.exit(1); // خروج از برنامه در صورت بروز خطا
  });

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// require('dotenv').config();
require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require("cookie-parser");

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userPanelRoutes = require('./routes/userPanelRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middleware
// app.use(cors());
// app.use(cors({
//   origin: function (origin, callback) {
//     const allowedOrigins = ['http://127.0.0.1:5501', 'https://onlineshope.onrender.com'];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

const allowedOrigins = [
  "http://127.0.0.1:5501", // لوکال
  "https://alireza-abarian786.github.io", // GitHub Pages
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));



app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

console.log("Mounting cart routes...");

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/user', userPanelRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);


// Error handler
app.use(errorHandler);

module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// فعال کردن CORS و JSON Parser
app.use(cors());
app.use(express.json());

// Connection String MongoDB (به دقت ID و پسورد خودتون رو وارد کنید)
const connectionString = 'mongodb+srv://alireza-user:PcCjLKlPX2QdvKMc@cluster0.ay7lp.mongodb.net/onlineShopDB?retryWrites=true&w=majority';

// اتصال به دیتابیس بدون گزینه‌های deprecated
mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// تعریف Models:

// 1. Model Products:
const productSchema = new mongoose.Schema({
  id: { type: String, required: true }, // تبدیل به String
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category_id: { type: String, required: true }, // تبدیل به String
  description: String,
  images: [String],
  stock: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  ratings: { type: Number, default: 0 },
  reviews: [{
    user_id: String,
    comment: String,
    rating: Number
  }]
});
const Product = mongoose.model('Product', productSchema);

// 2. Model Carts:
const cartSchema = new mongoose.Schema({  
  id: String,
  user_id: { type: String, required: true },
  items: [{
    _id: false, // غیرفعال کردن _id برای زیرمستندها
    cart_id: String,
    product_id: String,
    product_name: String,
    product_images: [String],
    product_description: String,
    product_ratings: { type: Number },
    discount: { type: Number },
    price: Number,
    quantity: Number
  }],
  totalPrice: { type: Number, required: true }
});
const Cart = mongoose.model('Cart', cartSchema);

// 3. Model Bookmarks:
const bookmarkSchema = new mongoose.Schema({
  id: { type: String, required: true },
  product_name: String,
  user_id: String,
  product_id: String
});
const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

// 4. Model Users:
const userSchema = new mongoose.Schema({
  id: { type: String, required: true }, // تبدیل به String
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  phone: String, // تبدیل به String برای تلفن
  registration_date: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// 5. Model Blogs:
const blogSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: String,
  author_id: { type: String, required: true }, // تبدیل به String
  created_at: { type: Date, default: Date.now },
  comments: [{
    user_id: String,
    text: String
  }]
});
const Blog = mongoose.model('Blog', blogSchema);

// 6. Model Categories:
const categorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  urlSearch: { type: String, required: true },
  description: String
});
const Category = mongoose.model('Category', categorySchema);

// Function پاک کردن تمام داده‌ها:
// async function deleteAllData() {
//   try {
//     await Product.deleteMany({});
//     await Cart.deleteMany({});
//     await Bookmark.deleteMany({});
//     await User.deleteMany({});
//     await Blog.deleteMany({});
//     await Category.deleteMany({});
//     console.log('تمام داده‌ها پاک شدند!');
//   } catch (error) {
//     console.error('خطا در پاک کردن:', error);
//   }
// }

// // Function مهاجرت داده‌ها از db.json به MongoDB:
// async function migrateData() {
//   try {
//     const fs = require('fs');
//     const path = require('path');
    
//     // مسیر فایل db.json
//     const dbPath = path.join(__dirname, 'public', 'vendor', 'db.json');
//     const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

//     // پاک کردن داده‌های موجود
//     await deleteAllData();

//     // انتقال داده‌ها به MongoDB با اطمینان از ساختار صحیح
//     if (data.products) await Product.insertMany(data.products);
//     if (data.carts) await Cart.insertMany(data.carts);
//     if (data.bookmarks) await Bookmark.insertMany(data.bookmarks);
//     if (data.users) await User.insertMany(data.users);
//     if (data.blogs) await Blog.insertMany(data.blogs);
//     if (data.categories) await Category.insertMany(data.categories);

//     console.log('مهاجرت با موفقیت انجام شد!');
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// اجرای مهاجرت بعد از اتصال به دیتابیس
// mongoose.connection.once('open', () => {
//   migrateData();
// });

// Rout‌های CRUD برای تمام مجموعه‌داده‌ها:

// Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در دریافت محصولات' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'محصول اضافه شد', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در ذخیره محصول' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'محصول یافت نشد' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در به‌روزرسانی محصول' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) return res.status(404).json({ error: 'محصول یافت نشد' });
    res.json({ message: 'محصول حذف شد', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در حذف محصول' });
  }
});

// Carts
app.get('/api/carts/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;    
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) return res.status(404).json({ error: 'سبد خرید یافت نشد'});
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در دریافت سبد خرید' });
  }
});

app.post('/api/carts/:userId/items', async (req, res) => {
  try {
    const userId = req.params.userId;
    const newItem = req.body;

    // console.log("🔍 User ID received:", userId); // لاگ برای userId
    // console.log("🔍 New item received:", newItem); // لاگ برای داده‌های ارسالی
    
    // ساخت سبد خرید جدید اگر وجود نداشت
    let cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      cart = new Cart({
        id: userId + '-cart',
        user_id: userId,
        items: [],
        totalPrice: 0, // مقدار اولیه
      });
    }
    
    // افزودن محصول به items
    cart.items.push(newItem);

    // محاسبه totalPrice
    // cart.totalPrice = cart.items.reduce((sum, item) => sum + ((item.discount || item.price) * item.quantity), 0);

    cart.totalPrice = cart.items.reduce((sum, item) => {
      const finalPrice = item.discount !== undefined ? item.discount : item.price; // اولویت به discount
      return sum + (finalPrice * item.quantity);
    }, 0);

    await cart.save();
    res.status(201).json({ message: 'محصول به سبد اضافه شد', cart });
  } catch (error) {
    console.error("🚨 Error in /api/carts/:userId/items:", error); // لاگ برای خطاهای سرور
    res.status(500).json({ error: 'مشکل در افزودن به سبد' });
  }
});

app.put('/api/carts/:userId/items/:productId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartId = req.params.productId;
    const updatedItem = req.body;

    console.log(userId);
    console.log(cartId);
    console.log(updatedItem);
    
    
    const cart = await Cart.findOne({ user_id: userId });
    console.log(cart);
    
    if (!cart) return res.status(404).json({ error: 'سبد خرید یافت نشد' });

    const itemIndex = cart.items.findIndex(i => i.cart_id === cartId);
    console.log(itemIndex);
    
    if (itemIndex === -1) return res.status(404).json({ error: 'محصول در سبد وجود ندارد' });

    cart.items[itemIndex] = updatedItem;
    await cart.save();
    res.json({ message: 'محصول به‌روزرسانی شد', cart });
  } catch (error) {
    console.error("🚨 Error in /api/carts/:userId/items/:productId", error); // لاگ برای خطاهای سرور
    res.status(500).json({ error: 'مشکل در به‌روزرسانی سبد' });
  }
});

app.delete('/api/carts/:userId/items/:productId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) return res.status(404).json({ error: 'سبد خرید یافت نشد' });

    // حذف آیتم موردنظر
    cart.items = cart.items.filter(item => item.product_id !== productId);
    await cart.save();
    res.json({ message: 'محصول از سبد حذف شد', cart });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در حذف از سبد' });
  }
});

// Bookmarks
app.get('/api/bookmarks', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در دریافت بوکمارک‌ها' });
  }
});

app.post('/api/bookmarks', async (req, res) => {
  try {
    const newBookmark = new Bookmark(req.body);
    await newBookmark.save();
    res.status(201).json({ message: 'بوکمارک اضافه شد', bookmark: newBookmark });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در ذخیره بوکمارک' });
  }
});

app.put('/api/bookmarks/:id', async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      bookmarkId, 
      req.body, 
      { new: true }
    );
    if (!updatedBookmark) return res.status(404).json({ error: 'بوکمارک یافت نشد' });
    res.json(updatedBookmark);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در به‌روزرسانی بوکمارک' });
  }
});

app.delete('/api/bookmarks/:id', async (req, res) => {
  try {
    const bookmarkId = req.params.id;
    const deletedBookmark = await Bookmark.findByIdAndDelete(bookmarkId);
    if (!deletedBookmark) return res.status(404).json({ error: 'بوکمارک یافت نشد' });
    res.json({ message: 'بوکمارک حذف شد', bookmark: deletedBookmark });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در حذف بوکمارک' });
  }
});

// Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در دریافت کاربران' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'کاربر اضافه شد', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در ذخیره کاربر' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      req.body, 
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: 'کاربر یافت نشد' });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در به‌روزرسانی کاربر' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ error: 'کاربر یافت نشد' });
    res.json({ message: 'کاربر حذف شد', user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در حذف کاربر' });
  }
});

// Blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در دریافت بلاگ‌ها' });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json({ message: 'بلاگ اضافه شد', blog: newBlog });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در ذخیره بلاگ' });
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId, 
      req.body, 
      { new: true }
    );
    if (!updatedBlog) return res.status(404).json({ error: 'بلاگ یافت نشد' });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در به‌روزرسانی بلاگ' });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) return res.status(404).json({ error: 'بلاگ یافت نشد' });
    res.json({ message: 'بلاگ حذف شد', blog: deletedBlog });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در حذف بلاگ' });
  }
});

// Categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در دریافت دسته‌بندی‌ها' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({ message: 'دسته‌بندی اضافه شد', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در ذخیره دسته‌بندی' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId, 
      req.body, 
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ error: 'دسته‌بندی یافت نشد' });
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در به‌روزرسانی دسته‌بندی' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) return res.status(404).json({ error: 'دسته‌بندی یافت نشد' });
    res.json({ message: 'دسته‌بندی حذف شد', category: deletedCategory });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در حذف دسته‌بندی' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
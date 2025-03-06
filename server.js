// Function برای مهاجرت داده‌ها از db.json به MongoDB
async function migrateData() {
  try {
    const fs = require('fs');
    const path = require('path');
    
    // خواندن داده‌های db.json
    const dbPath = path.join(__dirname, 'public', 'vendor', 'db.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // انتقال Products
    if (data.products) {
      await Product.insertMany(data.products);
    }

    // انتقال Carts
    if (data.carts) {
      await Cart.insertMany(data.carts);
    }

    // انتقال Bookmarks
    if (data.bookmarks) {
      await Bookmark.insertMany(data.bookmarks);
    }

    // انتقال Users
    if (data.users) {
      await User.insertMany(data.users);
    }

    // انتقال Blogs
    if (data.blogs) {
      await Blog.insertMany(data.blogs);
    }

    // انتقال Categories
    if (data.categories) {
      await Category.insertMany(data.categories);
    }

    console.log('Data migration completed successfully!');
  } catch (error) {
    console.error('Error migrating data:', error);
  }
}

// اجرای مهاجرت پس از اتصال به دیتابیس
mongoose.connection.once('open', () => {
  migrateData();
});

//! ----------------------------------------------------------------------------------------------------------


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// فعال کردن CORS و JSON Parser
app.use(cors());
app.use(express.json());

// Connection String
const connectionString = 'mongodb+srv://alireza-user:PcCjLKlPX2QdvKMc@cluster0.ay7lp.mongodb.net/onlineShopDB?retryWrites=true&w=majority&appName=Cluster0';

// اتصال به دیتابیس MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error:', err));

// تعریف Models برای تمام مجموعه‌داده‌ها:

// 1. Model برای محصولات (Products)
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
});
const Product = mongoose.model('Product', productSchema);

// 2. Model برای سبد خرید (Carts)
const cartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: Number,
      quantity: Number,
    },
  ],
});
const Cart = mongoose.model('Cart', cartSchema);

// 3. Model برای بوکمارک‌ها (Bookmarks)
const bookmarkSchema = new mongoose.Schema({
  id: Number,
  name: String,
});
const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

// 4. Model برای کاربران (Users)
const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
});
const User = mongoose.model('User', userSchema);

// 5. Model برای بلاگ‌ها (Blogs)
const blogSchema = new mongoose.Schema({
  id: Number,
  title: String,
  content: String,
});
const Blog = mongoose.model('Blog', blogSchema);

// 6. Model برای دسته‌بندی‌ها (Categories)
const categorySchema = new mongoose.Schema({
  id: Number,
  name: String,
});
const Category = mongoose.model('Category', categorySchema);

// CRUD Operations for Products:
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// CRUD Operations for Carts:
app.get('/api/carts/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

app.post('/api/carts/:userId/items', async (req, res) => {
  try {
    const userId = req.params.userId;
    const newItem = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    cart.items.push(newItem);
    await cart.save();

    res.status(201).json({ message: 'Item added to cart successfully', cart: cart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

app.put('/api/carts/:userId/items/:productId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = parseInt(req.params.productId, 10);
    const updatedItem = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const itemIndex = cart.items.findIndex(i => i.productId === productId);
    if (itemIndex === -1) return res.status(404).json({ error: 'Product not found in cart' });

    cart.items[itemIndex] = { ...cart.items[itemIndex], ...updatedItem };
    await cart.save();

    res.json({ message: 'Cart item updated successfully', cart: cart });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

app.delete('/api/carts/:userId/items/:productId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = parseInt(req.params.productId, 10);

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const itemIndex = cart.items.findIndex(i => i.productId === productId);
    if (itemIndex === -1) return res.status(404).json({ error: 'Product not found in cart' });

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.json({ message: 'Cart item deleted successfully', cart: cart });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
});

// CRUD Operations for Bookmarks:
app.get('/api/bookmarks', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});

app.post('/api/bookmarks', async (req, res) => {
  try {
    const newBookmark = new Bookmark(req.body);
    await newBookmark.save();
    res.status(201).json({ message: 'Bookmark added successfully', bookmark: newBookmark });
  } catch (error) {
    console.error('Error adding bookmark:', error);
    res.status(500).json({ error: 'Failed to add bookmark' });
  }
});

app.put('/api/bookmarks/:id', async (req, res) => {
  try {
    const bookmarkId = parseInt(req.params.id, 10);
    const updatedBookmark = await Bookmark.findByIdAndUpdate(bookmarkId, req.body, { new: true });
    if (!updatedBookmark) return res.status(404).json({ error: 'Bookmark not found' });
    res.json(updatedBookmark);
  } catch (error) {
    console.error('Error updating bookmark:', error);
    res.status(500).json({ error: 'Failed to update bookmark' });
  }
});

app.delete('/api/bookmarks/:id', async (req, res) => {
  try {
    const bookmarkId = parseInt(req.params.id, 10);
    const deletedBookmark = await Bookmark.findByIdAndDelete(bookmarkId);
    if (!deletedBookmark) return res.status(404).json({ error: 'Bookmark not found' });
    res.json({ message: 'Bookmark deleted successfully', bookmark: deletedBookmark });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({ error: 'Failed to delete bookmark' });
  }
});

// CRUD Operations for Users:
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// CRUD Operations for Blogs:
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json({ message: 'Blog added successfully', blog: newBlog });
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).json({ error: 'Failed to add blog' });
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const blogId = parseInt(req.params.id, 10);
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
    res.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blogId = parseInt(req.params.id, 10);
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully', blog: deletedBlog });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// CRUD Operations for Categories:
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Failed to add category' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
    if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });
    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted successfully', category: deletedCategory });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to db.json
const dbPath = path.join(__dirname, 'public', 'vendor', 'db.json');

// Read data from db.json
let data;
try {
  const rawData = fs.readFileSync(dbPath, 'utf-8');
  data = JSON.parse(rawData);
} catch (err) {
  console.error('Error reading or parsing db.json:', err);
  data = {}; // Initialize empty data if file is missing or invalid
}

// Helper function to save data to db.json
function saveData() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving data to db.json:', error);
  }
}

// CRUD Operations for Products
app.get('/api/products', (req, res) => {
  res.json(data.products || []);
});

app.post('/api/products', (req, res) => {
  try {
    const newItem = req.body;

    if (!data.products) data.products = [];
    data.products.push(newItem);

    saveData(); // Save changes to db.json

    res.status(201).json({ message: 'Product added successfully', product: newItem });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const updatedProduct = req.body;

    if (!data.products || data.products.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }

    const index = data.products.findIndex(p => p.id === productId);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    data.products[index] = { ...data.products[index], ...updatedProduct };

    saveData(); // Save changes to db.json

    res.json({ message: 'Product updated successfully', product: data.products[index] });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id, 10);

    if (!data.products || data.products.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }

    const index = data.products.findIndex(p => p.id === productId);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const deletedProduct = data.products.splice(index, 1);

    saveData(); // Save changes to db.json

    res.json({ message: 'Product deleted successfully', product: deletedProduct[0] });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// CRUD Operations for Bookmarks
app.get('/api/bookmarks', (req, res) => {
  res.json(data.bookmarks || []);
});

app.post('/api/bookmarks', (req, res) => {
  try {
    const newItem = req.body;

    if (!data.bookmarks) data.bookmarks = [];
    data.bookmarks.push(newItem);

    saveData(); // Save changes to db.json

    res.status(201).json({ message: 'Bookmark added successfully', bookmark: newItem });
  } catch (error) {
    console.error('Error adding bookmark:', error);
    res.status(500).json({ error: 'Failed to add bookmark' });
  }
});

app.put('/api/bookmarks/:id', (req, res) => {
  try {
    const bookmarkId = parseInt(req.params.id, 10);
    const updatedBookmark = req.body;

    if (!data.bookmarks || data.bookmarks.length === 0) {
      return res.status(404).json({ error: 'No bookmarks found' });
    }

    const index = data.bookmarks.findIndex(b => b.id === bookmarkId);
    if (index === -1) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    data.bookmarks[index] = { ...data.bookmarks[index], ...updatedBookmark };

    saveData(); // Save changes to db.json

    res.json({ message: 'Bookmark updated successfully', bookmark: data.bookmarks[index] });
  } catch (error) {
    console.error('Error updating bookmark:', error);
    res.status(500).json({ error: 'Failed to update bookmark' });
  }
});

app.delete('/api/bookmarks/:id', (req, res) => {
  try {
    const bookmarkId = parseInt(req.params.id, 10);

    if (!data.bookmarks || data.bookmarks.length === 0) {
      return res.status(404).json({ error: 'No bookmarks found' });
    }

    const index = data.bookmarks.findIndex(b => b.id === bookmarkId);
    if (index === -1) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    const deletedBookmark = data.bookmarks.splice(index, 1);

    saveData(); // Save changes to db.json

    res.json({ message: 'Bookmark deleted successfully', bookmark: deletedBookmark[0] });
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    res.status(500).json({ error: 'Failed to delete bookmark' });
  }
});

// CRUD Operations for Users
app.get('/api/users', (req, res) => {
  res.json(data.users || []);
});

app.post('/api/users', (req, res) => {
  try {
    const newUser = req.body;

    if (!data.users) data.users = [];
    data.users.push(newUser);

    saveData(); // Save changes to db.json

    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// CRUD Operations for Blogs
app.get('/api/blogs', (req, res) => {
  res.json(data.blogs || []);
});

app.post('/api/blogs', (req, res) => {
  try {
    const newBlog = req.body;

    if (!data.blogs) data.blogs = [];
    data.blogs.push(newBlog);

    saveData(); // Save changes to db.json

    res.status(201).json({ message: 'Blog added successfully', blog: newBlog });
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).json({ error: 'Failed to add blog' });
  }
});

// CRUD Operations for Carts
app.get('/api/carts', (req, res) => {
  res.json(data.carts || []);
});

app.post('/api/carts', (req, res) => {
  try {
    const newItem = req.body;

    if (!data.carts) data.carts = [];
    data.carts.push(newItem);

    saveData(); // Save changes to db.json

    res.status(201).json({ message: 'Cart item added successfully', cart: newItem });
  } catch (error) {
    console.error('Error adding cart item:', error);
    res.status(500).json({ error: 'Failed to add cart item' });
  }
});

// CRUD Operations for Categories
app.get('/api/categories', (req, res) => {
  res.json(data.categories || []);
});

app.post('/api/categories', (req, res) => {
  try {
    const newCategory = req.body;

    if (!data.categories) data.categories = [];
    data.categories.push(newCategory);

    saveData(); // Save changes to db.json

    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Failed to add category' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
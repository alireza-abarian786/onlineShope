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

app.put('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const updatedUser = req.body;

    if (!data.users || data.users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    const index = data.users.findIndex(u => u.id === userId);
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    data.users[index] = { ...data.users[index], ...updatedUser };

    saveData(); // Save changes to db.json

    res.json({ message: 'User updated successfully', user: data.users[index] });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (!data.users || data.users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    const index = data.users.findIndex(u => u.id === userId);
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const deletedUser = data.users.splice(index, 1);

    saveData(); // Save changes to db.json

    res.json({ message: 'User deleted successfully', user: deletedUser[0] });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
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

app.put('/api/blogs/:id', (req, res) => {
  try {
    const blogId = parseInt(req.params.id, 10);
    const updatedBlog = req.body;

    if (!data.blogs || data.blogs.length === 0) {
      return res.status(404).json({ error: 'No blogs found' });
    }

    const index = data.blogs.findIndex(b => b.id === blogId);
    if (index === -1) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    data.blogs[index] = { ...data.blogs[index], ...updatedBlog };

    saveData(); // Save changes to db.json

    res.json({ message: 'Blog updated successfully', blog: data.blogs[index] });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

app.delete('/api/blogs/:id', (req, res) => {
  try {
    const blogId = parseInt(req.params.id, 10);

    if (!data.blogs || data.blogs.length === 0) {
      return res.status(404).json({ error: 'No blogs found' });
    }

    const index = data.blogs.findIndex(b => b.id === blogId);
    if (index === -1) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const deletedBlog = data.blogs.splice(index, 1);

    saveData(); // Save changes to db.json

    res.json({ message: 'Blog deleted successfully', blog: deletedBlog[0] });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// CRUD Operations for Carts
app.get('/api/carts', (req, res) => {
  res.json(data.carts || []);
});

app.post('/api/carts', (req, res) => {
  try {
    const newCart = req.body;

    if (!data.carts) data.carts = [];
    data.carts.push(newCart);

    saveData(); // Save changes to db.json

    res.status(201).json({ message: 'Cart added successfully', cart: newCart });
  } catch (error) {
    console.error('Error adding cart:', error);
    res.status(500).json({ error: 'Failed to add cart' });
  }
});

app.put('/api/carts/:userId/items/:productId', (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = parseInt(req.params.productId, 10);
    const updatedItem = req.body;

    if (!data.carts || data.carts.length === 0) {
      return res.status(404).json({ error: 'No carts found' });
    }

    const cartIndex = data.carts.findIndex(c => c.userId === userId);
    if (cartIndex === -1) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cart = data.carts[cartIndex];

    const itemIndex = cart.items.findIndex(i => i.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    cart.items[itemIndex] = { ...cart.items[itemIndex], ...updatedItem };

    saveData(); // Save changes to db.json

    res.json({ message: 'Cart item updated successfully', cart: cart });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

app.delete('/api/carts/:userId/items/:productId', (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = parseInt(req.params.productId, 10);

    if (!data.carts || data.carts.length === 0) {
      return res.status(404).json({ error: 'No carts found' });
    }

    const cartIndex = data.carts.findIndex(c => c.userId === userId);
    if (cartIndex === -1) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cart = data.carts[cartIndex];

    const itemIndex = cart.items.findIndex(i => i.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    const deletedItem = cart.items.splice(itemIndex, 1);

    saveData(); // Save changes to db.json

    res.json({ message: 'Cart item deleted successfully', item: deletedItem[0], cart: cart });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Failed to delete cart item' });
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

app.put('/api/categories/:id', (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);
    const updatedCategory = req.body;

    if (!data.categories || data.categories.length === 0) {
      return res.status(404).json({ error: 'No categories found' });
    }

    const index = data.categories.findIndex(c => c.id === categoryId);
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }

    data.categories[index] = { ...data.categories[index], ...updatedCategory };

    saveData(); // Save changes to db.json

    res.json({ message: 'Category updated successfully', category: data.categories[index] });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

app.delete('/api/categories/:id', (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);

    if (!data.categories || data.categories.length === 0) {
      return res.status(404).json({ error: 'No categories found' });
    }

    const index = data.categories.findIndex(c => c.id === categoryId);
    if (index === -1) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const deletedCategory = data.categories.splice(index, 1);

    saveData(); // Save changes to db.json

    res.json({ message: 'Category deleted successfully', category: deletedCategory[0] });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
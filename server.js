const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// مسیر فایل db.json
const dbPath = path.join(__dirname, 'public', 'vendor', 'db.json');

// خواندن داده‌های JSON از فایل db.json
let data;
try {
  const rawData = fs.readFileSync(dbPath, 'utf-8'); // خواندن محتوای فایل
  data = JSON.parse(rawData); // تبدیل متن به شیء JSON
} catch (err) {
  console.error('Error reading or parsing db.json:', err);
  data = {}; // اگر خطایی رخ دهد، داده‌ها را خالی می‌کنیم
}

// GET all products
app.get('/api/products', (req, res) => {
  res.json(data.products || []);
});

// GET all carts
app.get('/api/carts', (req, res) => {
  res.json(data.carts || []);
});

// GET all bookmarks
app.get('/api/bookmarks', (req, res) => {
  res.json(data.bookmarks || []);
});

// GET all blogs
app.get('/api/blogs', (req, res) => {
  res.json(data.blogs || []);
});

// POST a new blog
app.post('/api/blogs', (req, res) => {
  try {
    const newItem = req.body;

    if (!data.blogs) data.blogs = [];
    data.blogs.push(newItem);

    // Save changes to db.json
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

    res.status(201).json({ message: 'Blog added successfully', blog: newItem });
  } catch (error) {
    console.error('Error saving blog:', error);
    res.status(500).json({ error: 'Failed to save blog' });
  }
});

// POST a new bookmark
app.post('/api/bookmarks', (req, res) => {
  try {
    const newItem = req.body;

    if (!data.bookmarks) data.bookmarks = [];
    data.bookmarks.push(newItem);

    // Save changes to db.json
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

    res.status(201).json({ message: 'Bookmark added successfully', bookmark: newItem });
  } catch (error) {
    console.error('Error saving bookmark:', error);
    res.status(500).json({ error: 'Failed to save bookmark' });
  }
});

// POST a new cart item
app.post('/api/carts', (req, res) => {
  try {
    const newItem = req.body; // دریافت داده جدید از Body درخواست

    if (!data.carts) data.carts = []; // اگر carts وجود ندارد، آن را ایجاد کنید
    data.carts.push(newItem); // اضافه کردن داده جدید به لیست carts

    // ذخیره تغییرات در db.json
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

    res.status(201).json({ message: 'Item added successfully', item: newItem });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ error: 'Failed to save item' });
  }
});

// PUT (Update) a cart item
app.put('/api/carts/:id', (req, res) => {
  try {
    const itemId = parseInt(req.params.id, 10); // دریافت ID از URL
    const updatedItem = req.body; // دریافت داده‌های به‌روزرسانی شده

    if (!data.carts || data.carts.length === 0) {
      return res.status(404).json({ error: 'No carts found' });
    }

    // یافتن Index Item مورد نظر
    const index = data.carts.findIndex(item => item.id === itemId);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // به‌روزرسانی Item
    data.carts[index] = { ...data.carts[index], ...updatedItem };

    // ذخیره تغییرات در db.json
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

    res.json({ message: 'Item updated successfully', item: data.carts[index] });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE a cart item
app.delete('/api/carts/:id', (req, res) => {
  try {
    const itemId = parseInt(req.params.id, 10); // دریافت ID از URL

    if (!data.carts || data.carts.length === 0) {
      return res.status(404).json({ error: 'No carts found' });
    }

    // یافتن Index Item مورد نظر
    const index = data.carts.findIndex(item => item.id === itemId);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // حذف Item
    const deletedItem = data.carts.splice(index, 1);

    // ذخیره تغییرات در db.json
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

    res.json({ message: 'Item deleted successfully', item: deletedItem[0] });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// شروع سرور
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import cors

const app = express();
const port = process.env.PORT || 4000;

// مسیر فایل db.json
const dbPath = path.join(__dirname, 'public' , 'vendor' , 'db.json');

// فعال کردن CORS
app.use(cors());

// خواندن داده‌های JSON از فایل db.json
let data;
try {
  const rawData = fs.readFileSync(dbPath, 'utf-8'); // خواندن محتوای فایل
  data = JSON.parse(rawData); // تبدیل متن به شیء JSON
} catch (err) {
  console.error('Error reading or parsing db.json:', err);
  data = {}; // اگر خطایی رخ دهد، داده‌ها را خالی می‌کنیم
}

// Route برای دریافت همه داده‌های db.json
app.get('/api/products', (req, res) => {
  res.json(data.products || []);
});

app.get('/api/carts', (req, res) => {
  res.json(data.carts || []);
});

app.get('/api/bookmarks', (req, res) => {
  res.json(data.bookmarks || []);
});

app.get('/api/blogs', (req, res) => {
  res.json(data.blogs || []);
});

app.get('/api/users', (req, res) => {
  res.json(data.users || []);
});

app.get('/api/categories', (req, res) => {
  res.json(data.categories || []);
});

// شروع سرور
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
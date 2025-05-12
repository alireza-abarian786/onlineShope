// const Blog = require('../models/Blog');

// // Get all blogs
// exports.getBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find();
//     res.json(blogs);
//   } catch (error) {
//     res.status(500).json({ error: 'مشکل در دریافت بلاگ‌ها' });
//   }
// };

// // Create a new blog
// exports.createBlog = async (req, res) => {
//   try {
//     const newBlog = new Blog(req.body);
//     await newBlog.save();
//     res.status(201).json({ message: 'بلاگ اضافه شد', blog: newBlog });
//   } catch (error) {
//     res.status(500).json({ error: 'مشکل در ذخیره بلاگ' });
//   }
// };

// // Update a blog
// exports.updateBlog = async (req, res) => {
//   try {
//     const blogId = req.params.id;
//     const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
//     if (!updatedBlog) return res.status(404).json({ error: 'بلاگ یافت نشد' });
//     res.json(updatedBlog);
//   } catch (error) {
//     res.status(500).json({ error: 'مشکل در به‌روزرسانی بلاگ' });
//   }
// };

// // Delete a blog
// exports.deleteBlog = async (req, res) => {
//   try {
//     const blogId = req.params.id;
//     const deletedBlog = await Blog.findByIdAndDelete(blogId);
//     if (!deletedBlog) return res.status(404).json({ error: 'بلاگ یافت نشد' });
//     res.json({ message: 'بلاگ حذف شد', blog: deletedBlog });
//   } catch (error) {
//     res.status(500).json({ error: 'مشکل در حذف بلاگ' });
//   }
// };



const Blog = require('../models/Blog');

// Get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

// Get blog by ID
const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  res.json(blog);
};

// Create a new blog
const createBlog = async (req, res) => {
  const { title, content, author } = req.body;

  const blog = new Blog({ title, content, author });

  await blog.save();
  res.status(201).json(blog);
};

module.exports = { getBlogs, getBlogById, createBlog };

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

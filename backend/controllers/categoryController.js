const Category = require('../models/Category');

// Get all categories
const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

// Create a new category
const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = new Category({ name });

  await category.save();
  res.status(201).json(category);
};

module.exports = { getCategories, createCategory };

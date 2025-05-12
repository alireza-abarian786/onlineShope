// const Category = require('../models/Category');

// // Get all categories
// exports.getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: 'مشکل در دریافت دسته‌بندی‌ها' });
//   }
// };

// // Create a new category
// exports.createCategory = async (req, res) => {
//   try {
//     const newCategory = new Category(req.body);
//     await newCategory.save();
//     res.status(201).json({ message: 'دسته‌بندی اضافه شد', category: newCategory });
//   } catch (error) {
//     res.status(500).json({ error: 'مشکل در ذخیره دسته‌بندی' });
//   }
// };

// // Update a category
// exports.updateCategory = async (req, res) => {
//   try {
//     const categoryId = req.params.id;
//     const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
//     if (!updatedCategory) return res.status(404).json({ error: 'دسته‌بندی یافت نشد' });
//     res.json(updatedCategory);
//   } catch (error) {
//     res.status(500).json({ error: 'مشکل در به‌روزرسانی دسته‌بندی' });
//   }
// };

// // Delete a category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const categoryId = req.params.id;
//     const deletedCategory = await Category.findByIdAndDelete(categoryId);
//     if (!deletedCategory) return res.status(404).json({ error: 'دسته‌بندی یافت نشد' });
//     res.json({ message: 'دسته‌بندی حذف شد', category: deletedCategory });
//   } catch (error) {
//     res.status(500).json({ error: 'مشکل در حذف دسته‌بندی' });
//   }
// };



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

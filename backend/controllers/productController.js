const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در دریافت محصولات' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'محصول اضافه شد', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در ذخیره محصول' });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'محصول یافت نشد' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'مشکل در به‌روزرسانی محصول' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) return res.status(404).json({ error: 'محصول یافت نشد' });
    res.json({ message: 'محصول حذف شد', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'مشکل در حذف محصول' });
  }
};
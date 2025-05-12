// const Cart = require('../models/Cart');
// const mongoose = require('mongoose');

// // Get cart by user ID
// // exports.getCart = async (req, res) => {
// //   try {
// //     const userId = req.params.userId;
// //     const cart = await Cart.findOne({ userId: userId });
// //     if (!cart) return res.status(404).json({ error: 'سبد خرید یافت نشد' });
// //     res.json(cart);
// //   } catch (error) {
// //     console.error('Error in getCart:', error);
// //     res.status(500).json({ error: 'مشکل در دریافت سبد خرید' });
// //   }
// // };


// exports.getCart = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     console.log(`GET /api/carts/${userId}`);
    
//     // بررسی وجود userId
//     if (!userId) {
//       return res.status(400).json({ error: 'شناسه کاربر ارائه نشده است' });
//     }
    
//     let userIdToSearch = userId;
    
//     // اگر ObjectId معتبر است، آن را تبدیل کنید
//     if (mongoose.Types.ObjectId.isValid(userId)) {
//       userIdToSearch = new mongoose.Types.ObjectId(userId);
//     }
    
//     console.log('جستجوی سبد خرید برای userId:', userIdToSearch);
    
//     // ابتدا بر اساس ObjectId جستجو کنید
//     let cart = await Cart.findOne({ userId: userIdToSearch });
    
//     // اگر پیدا نشد، به عنوان رشته امتحان کنید
//     if (!cart && typeof userIdToSearch !== 'string') {
//       cart = await Cart.findOne({ userId: userId });
//     }
    
//     console.log('نتیجه جستجوی سبد خرید:', cart);
    
//     if (!cart) {
//       // اگر سبد خرید وجود نداشت، یک مورد جدید ایجاد کنید
//       const newCart = {
//         userId: userIdToSearch,
//         items: [],
//         totalPrice: 0
//       };
      
//       cart = new Cart(newCart);
//       await cart.save();
//       console.log('سبد خرید جدید ایجاد شد:', cart);
//     }
    
//     res.json(cart);
//   } catch (error) {
//     console.error('خطا در دریافت سبد خرید:', error);
//     res.status(500).json({ error: 'خطا در دریافت اطلاعات سبد خرید', details: error.message });
//   }
// };



// // Add item to cart
// exports.addItemToCart = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const newItem = req.body;
    
//     console.log('=== Server Debug Info ===');
//     console.log('1. User ID:', userId);
//     console.log('2. New Item:', newItem);

//     // بررسی فیلدهای اجباری
//     if (!newItem.product_id || !newItem.product_name || !newItem.price || !newItem.totalPriceProductCart) {
//       console.error('Missing required fields:', newItem);
//       return res.status(400).json({ 
//         error: 'اطلاعات ناقص است',
//         details: 'فیلدهای اجباری وجود ندارند'
//       });
//     }

//     // تبدیل userId به ObjectId
//     const objectId = new mongoose.Types.ObjectId(userId);
    
//     // جستجوی سبد خرید با userId
//     let cart = await Cart.findOne({ userId: objectId });
//     console.log('3. Found cart:', cart ? cart : 'No cart found, creating new one');

//     if (!cart) {
//       console.log('4. Creating new cart');
//       cart = new Cart({ 
//         userId: objectId,
//         items: [], 
//         totalPrice: 0 
//       });
//     }

//     // بررسی وجود محصول در سبد
//     const existingItemIndex = cart.items.findIndex(
//       item => item.product_id === newItem.product_id
//     );

//     if (existingItemIndex !== -1) {
//       console.log('5. Updating existing item');
//       cart.items[existingItemIndex].quantity += newItem.quantity;
//       cart.items[existingItemIndex].totalPriceProductCart = 
//         cart.items[existingItemIndex].quantity * 
//         (cart.items[existingItemIndex].discount || cart.items[existingItemIndex].price);
//     } else {
//       console.log('5. Adding new item');
//       cart.items.push(newItem);
//     }

//     // محاسبه قیمت کل
//     cart.totalPrice = cart.items.reduce((sum, item) => {
//       return sum + item.totalPriceProductCart;
//     }, 0);

//     console.log('6. Before saving cart:', cart);
//     await cart.save();
    
//     // بارگذاری مجدد سبد خرید برای اطمینان از ذخیره‌سازی
//     const updatedCart = await Cart.findOne({ userId: objectId });
//     console.log('7. Saved cart items:', updatedCart.items.map(item => ({ _id: item._id.toString(), product_id: item.product_id, product_name: item.product_name })));
//     const newItemId = updatedCart.items[updatedCart.items.length - 1]._id.toString();
//     console.log('8. New item _id:', newItemId);
    
//     res.status(201).json({ 
//       message: 'محصول به سبد اضافه شد', 
//       cart: updatedCart,
//       newItemId
//     });
//   } catch (error) {
//     console.error('=== Server Error ===');
//     console.error('Error:', error);
//     res.status(500).json({ 
//       error: 'مشکل در افزودن به سبد',
//       details: error.message,
//       stack: error.stack
//     });
//   }
// };

// // Update item in cart
// // exports.updateCartItem = async (req, res) => {
// //   try {
// //     const userId = req.params.userId;
// //     const itemId = req.params.itemId;
// //     const updatedItem = req.body;

// //     console.log('=== Server Debug Update Cart Item ===');
// //     console.log('1. User ID:', userId);
// //     console.log('2. Item ID:', itemId);
// //     console.log('2.1 Item ID type:', typeof itemId);
// //     console.log('3. Updated Item:', updatedItem);

// //     // بررسی فرمت itemId
// //     if (!mongoose.Types.ObjectId.isValid(itemId)) {
// //       console.log('Invalid itemId format:', itemId);
// //       return res.status(400).json({ error: 'شناسه آیتم نامعتبر است' });
// //     }

// //     // تبدیل userId به ObjectId
// //     const userObjectId = new mongoose.Types.ObjectId(userId);
// //     // تبدیل itemId به ObjectId
// //     const itemObjectId = new mongoose.Types.ObjectId(itemId);

// //     const cart = await Cart.findOne({ userId: userObjectId });
// //     if (!cart) {
// //       console.log('4. Cart not found for user:', userId);
// //       return res.status(404).json({ error: 'سبد خرید یافت نشد' });
// //     }

// //     console.log('5. Cart items IDs:', cart.items.map(item => item._id.toString()));
// //     console.log('6. Cart items:', cart.items.map(item => ({ 
// //       _id: item._id.toString(), 
// //       product_id: item.product_id, 
// //       product_name: item.product_name 
// //     })));

// //     // پیدا کردن آیتم با شناسه مورد نظر
// //     const itemIndex = cart.items.findIndex(item => {
// //       const itemIdStr = item._id.toString();
// //       console.log('7. Comparing:', itemIdStr, 'with', itemId);
// //       return itemIdStr === itemId;
// //     });
    
// //     if (itemIndex === -1) {
// //       console.log('8. Item not found in cart for itemId:', itemId);
// //       return res.status(404).json({ error: 'محصول در سبد وجود ندارد' });
// //     }

// //     console.log('9. Found item at index:', itemIndex);

// //     // به‌روزرسانی آیتم با حفظ شناسه اصلی
// //     const originalItem = cart.items[itemIndex];
    
// //     // مطمئن شویم که فیلدهای ضروری از درخواست حفظ می‌شوند
// //     cart.items[itemIndex] = {
// //       ...originalItem,
// //       ...updatedItem,
// //       _id: originalItem._id,          // حفظ شناسه اصلی
// //       product_id: originalItem.product_id  // حفظ شناسه محصول
// //     };

// //     // اگر quantity و totalPriceProductCart در updatedItem وجود دارند، آنها را به‌روزرسانی کنیم
// //     if (updatedItem.quantity !== undefined) {
// //       cart.items[itemIndex].quantity = updatedItem.quantity;
// //     }
    
// //     if (updatedItem.totalPriceProductCart !== undefined) {
// //       cart.items[itemIndex].totalPriceProductCart = updatedItem.totalPriceProductCart;
// //     }

// //     // محاسبه قیمت کل
// //     cart.totalPrice = cart.items.reduce((sum, item) => 
// //       sum + (item.totalPriceProductCart || 0), 0
// //     );

// //     console.log('10. Before saving updated cart:', cart);
// //     await cart.save();
    
// //     const updatedCart = await Cart.findOne({ userId: userObjectId });
// //     console.log('11. After saving updated cart:', updatedCart);
    
// //     res.json({ 
// //       message: 'محصول به‌روزرسانی شد', 
// //       cart: updatedCart 
// //     });
// //   } catch (error) {
// //     console.error('خطا در به‌روزرسانی سبد:', error);
// //     res.status(500).json({ 
// //       error: 'مشکل در به‌روزرسانی سبد',
// //       details: error.message 
// //     });
// //   }
// // };



// // به‌روزرسانی آیتم در سبد خرید
// exports.updateCartItem = async (req, res) => {
//   try {
//     const { userId, itemId } = req.params;
//     const updatedItem = req.body;
    
//     console.log(`PUT /api/carts/${userId}/items/${itemId}`);
//     console.log('Request Body:', updatedItem);
    
//     if (!updatedItem.quantity || updatedItem.quantity < 1) {
//       return res.status(400).json({ error: 'تعداد محصول باید حداقل 1 باشد' });
//     }
    
//     const cart = await Cart.findOne({ userId });
    
//     if (!cart) {
//       return res.status(404).json({ error: 'سبد خرید یافت نشد' });
//     }
    
//     const itemIndex = cart.items.findIndex(item => 
//       item._id.toString() === itemId
//     );
    
//     if (itemIndex === -1) {
//       return res.status(404).json({ error: 'محصول در سبد خرید یافت نشد' });
//     }
    
//     cart.items[itemIndex].quantity = updatedItem.quantity;
//     cart.items[itemIndex].totalPriceProductCart = updatedItem.totalPriceProductCart;
//     cart.updatedAt = Date.now();
    
//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     console.error('خطا در به‌روزرسانی سبد خرید:', error);
//     res.status(500).json({ error: 'خطا در به‌روزرسانی محصول در سبد خرید' });
//   }
// };




// // Delete item from cart
// exports.deleteCartItem = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const itemId = req.params.itemId;

//     console.log('=== Delete Cart Item Debug ===');
//     console.log('1. User ID:', userId);
//     console.log('2. Item ID:', itemId);

//     if (!mongoose.Types.ObjectId.isValid(itemId)) {
//       console.log('Invalid itemId format:', itemId);
//       return res.status(400).json({ error: 'شناسه آیتم نامعتبر است' });
//     }

//     const cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(userId) });
//     if (!cart) {
//       console.log('3. Cart not found for user:', userId);
//       return res.status(404).json({ error: 'سبد خرید یافت نشد' });
//     }

//     const itemObjectId = new mongoose.Types.ObjectId(itemId);
//     console.log('4. Cart items IDs:', cart.items.map(item => item._id.toString()));
    
//     const initialLength = cart.items.length;
//     cart.items = cart.items.filter(item => !item._id.equals(itemObjectId));
    
//     if (cart.items.length === initialLength) {
//       console.log('5. Item not found in cart for itemId:', itemId);
//       return res.status(404).json({ error: 'محصول در سبد وجود ندارد' });
//     }

//     cart.totalPrice = cart.items.reduce((sum, item) => sum + item.totalPriceProductCart, 0);
//     console.log('6. Before saving updated cart:', cart);
//     await cart.save();
    
//     console.log('7. After saving updated cart:', cart);
//     res.json({ message: 'محصول از سبد حذف شد', cart });
//   } catch (error) {
//     console.error('Error in deleteCartItem:', error);
//     res.status(500).json({ error: 'مشکل در حذف از سبد' });
//   }
// };

// // Delete all items from cart
// exports.deleteCart = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     console.log('=== Delete All Cart Items Debug ===');
//     console.log('1. User ID:', userId);

//     // بررسی وجود سبد خرید برای کاربر
//     const cart = await Cart.findOne({ userId: userId });
//     if (!cart) {
//       console.log('2. Cart not found for user:', userId);
//       return res.status(404).json({ error: 'سبد خرید یافت نشد' });
//     }

//     // خالی کردن آیتم‌ها و تنظیم totalPrice به صفر
//     cart.items = [];
//     cart.totalPrice = 0;
//     console.log('3. Before saving cleared cart:', cart);
//     await cart.save();

//     console.log('4. After saving cleared cart:', cart);
//     return res.status(200).json({ message: 'همه آیتم‌های سبد خرید حذف شدند', cart });
//   } catch (error) {
//     console.error("Error in deleteCart:", error);
//     return res.status(500).json({ error: 'مشکل در حذف آیتم‌های سبد خرید' });
//   }
// };









const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's cart
const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  res.json(cart);
};

// Add product to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    cart = new Cart({ user: req.user.id, products: [] });
  }

  const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
  if (productIndex >= 0) {
    cart.products[productIndex].quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(201).json(cart);
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.products = cart.products.filter(item => item.product.toString() !== productId);
  await cart.save();
  res.json(cart);
};

module.exports = { getCart, addToCart, removeFromCart };

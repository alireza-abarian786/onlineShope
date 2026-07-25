// src/js/funcs/boxProduct/bookMarkBtn.js

import { getLocalStorage } from "../storage.js";
import { showModal, updateFavoritesUI } from "../ui.js";
import { hideLoader, showAlertLogin, showLoader } from "../utils.js";

//!---------------------------------------------------------------------- function -------------------------------------------------------
//todo========================================================== افزودن محصول به علاقه مندی ها
const addToFavorites = async (productId) => {
  try {
    if (!(await showAlertLogin())) return false;

    showLoader();
    
    // 1. دریافت لیست علاقه‌مندی‌ها از localStorage
    const favoritesData = JSON.parse(localStorage.getItem('favoritesData')) || { items: [] };
    
    // 2. چک کردن وجود محصول
    const exists = favoritesData.items.some(item => item.productId === productId);
    
    if (!exists) {
      // 3. دریافت اطلاعات محصول
      const products = JSON.parse(localStorage.getItem('productsData')) || [];
      const product = products.find(p => p._id === productId);
      
      if (!product) {
        throw new Error("محصول پیدا نشد");
      }
      
      // 4. اضافه کردن به علاقه‌مندی‌ها
      const discountPercent = product.discount || 0;
      const finalPrice = discountPercent > 0 
        ? Math.round(product.price - (product.price * discountPercent / 100))
        : product.price;
      
      favoritesData.items.push({
        _id: "fav_" + Date.now(),
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        discount: discountPercent,
        finalPrice: finalPrice,
        category: product.category,
        brand: product.brand,
        rating: product.rating || 0,
        inStock: product.stock > 0,
        addedAt: new Date().toLocaleDateString('fa-IR'),
      });
      
      // 5. ذخیره در localStorage
      localStorage.setItem('favoritesData', JSON.stringify(favoritesData));
      
      // 6. بروزرسانی UI
      await updateFavoritesUI();
      
      showModal("✅ محصول به علاقه‌مندی‌ها اضافه شد");
      
    } else {
      // اگر وجود داشت، حذفش کن
      await removeFromFavorites(productId);
    }

  } catch (error) {
    console.error("Error in addToFavorites:", error);
    showModal("❌ خطا در افزودن به علاقه‌مندی‌ها");
  } finally {
    hideLoader();
  }
};

//todo========================================================== حذف محصول از علاقه مندی ها
async function removeFromFavorites(productId) {
  try {
    if (!(await showAlertLogin())) return false;

    showLoader();
    
    // 1. دریافت لیست علاقه‌مندی‌ها
    const favoritesData = JSON.parse(localStorage.getItem('favoritesData')) || { items: [] };
    
    // 2. حذف محصول
    favoritesData.items = favoritesData.items.filter(item => item.productId !== productId);
    
    // 3. ذخیره در localStorage
    localStorage.setItem('favoritesData', JSON.stringify(favoritesData));
    
    // 4. بروزرسانی UI
    await updateFavoritesUI();
    
    showModal("✅ محصول از علاقه‌مندی‌ها حذف شد");

  } catch (error) {
    console.error("Error in removeFromFavorites:", error);
    showModal("❌ خطا در حذف از علاقه‌مندی‌ها");
  } finally {
    hideLoader();
  }
}

export { removeFromFavorites, addToFavorites };
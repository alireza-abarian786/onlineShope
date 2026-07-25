// src/js/funcs/boxProduct/addCartBtn.js

import { updateCartNotification } from "../header/cartBtn.js";
import { getLocalStorage } from "../storage.js";
import { shoppingCartModal, showModal } from "../ui.js";
import { hideLoader, showAlertLogin, showLoader } from "../utils.js";

// ✅ تابع آپدیت وضعیت دکمه‌های سبد خرید
function updateCartButtons() {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: [] };
    const productIdsInCart = cartData.products.map(item => item.product._id);
    
    // پیدا کردن همه دکمه‌های سبد خرید
    const allCartButtons = document.querySelectorAll('.add-cart');
    
    if (allCartButtons.length === 0) return;
    
    allCartButtons.forEach(button => {
        // دریافت productId از onclick
        const onclickAttr = button.getAttribute('onclick');
        if (!onclickAttr) return;
        
        const match = onclickAttr.match(/addToCartAndToggleButton\('([^']+)'\)/);
        if (!match) return;
        
        const productId = match[1];
        const isInCart = productIdsInCart.includes(productId);
        
        // تغییر ظاهر دکمه
        if (isInCart) {
            button.classList.remove('btn-success');
            button.classList.add('btn-warning');
            const pElement = button.querySelector('p');
            if (pElement) pElement.textContent = '✓ در سبد خرید';
        } else {
            button.classList.remove('btn-warning');
            button.classList.add('btn-success');
            const pElement = button.querySelector('p');
            if (pElement) pElement.textContent = 'اضافه به سبد خرید';
        }
    });
}

//!---------------------------------------------------------------------- function -------------------------------------------------------
//todo============================================================= تابع افزودن محصول به سبد خرید
async function addToCartAndToggleButton(id) {
  try {
    if (!(await showAlertLogin())) return false;

    showLoader();
    
    // 1. دریافت دیتای فعلی سبد خرید از localStorage
    let cartData = JSON.parse(localStorage.getItem('cartData'));
    
    // ✅ اگر localStorage خالی بود، ساختار پیش‌فرض
    if (!cartData || !cartData.products) {
      cartData = { products: [], totalWithoutDiscount: 0, totalWithDiscount: 0 };
    }
    
    // 2. چک کردن وجود محصول در سبد خرید
    const existingItem = cartData.products.find(item => item.product._id === id);
    
    if (!existingItem) {
      // 3. دریافت اطلاعات محصول از localStorage یا دیتای فیک
      let products = JSON.parse(localStorage.getItem('productsData'));
      if (!products) {
        const fakeProducts = (await import('../../data/ProductData.js')).default;
        products = fakeProducts;
        localStorage.setItem('productsData', JSON.stringify(products));
      }
      
      const product = products.find(p => p._id === id);
      
      if (!product) {
        throw new Error("محصول پیدا نشد");
      }
      
      // 4. محاسبه قیمت نهایی
      const discountPercent = product.discount || 0;
      const finalPrice = discountPercent > 0 
        ? Math.round(product.price - (product.price * discountPercent / 100))
        : product.price;
      
      // 5. اضافه کردن به سبد خرید
      const newItem = {
        product: product,
        quantity: 1,
        discountPercent: discountPercent,
        finalPrice: finalPrice
      };
      
      cartData.products.push(newItem);
      
      // 6. محاسبه مجدد قیمت‌ها
      cartData.totalWithoutDiscount = cartData.products.reduce(
        (sum, item) => sum + (item.product.price * item.quantity), 0
      );
      cartData.totalWithDiscount = cartData.products.reduce(
        (sum, item) => sum + (item.finalPrice), 0
      );
      
      // 7. ذخیره در localStorage
      localStorage.setItem('cartData', JSON.stringify(cartData));
      
      // 8. بروزرسانی UI
      shoppingCartModal(cartData.products);
      updateCartNotification();
      
      // ✅ بروزرسانی دکمه‌های سبد خرید
      updateCartButtons();
      
      showModal(`✅🛒 محصول به سبد خرید شما اضافه شد`);
      
    } else {
      showModal(`✅🛒 این محصول از قبل در سبد خرید شما موجود است`);
    }
    
  } catch (error) {
    console.error("Error in addToCartAndToggleButton:", error);
    showModal("❌ مشکلی در افزودن محصول به سبد خرید وجود دارد");
  } finally {
    hideLoader();
  }
}

export { addToCartAndToggleButton, updateCartButtons };
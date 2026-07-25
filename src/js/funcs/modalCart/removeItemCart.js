// src/js/funcs/modalCart/removeItemCart.js

import { updateCartNotification } from "../header/cartBtn.js";
import { boxPaymentHtmlTemplate, createBoxProductToPageCart, shoppingCartModal, showModal } from "../ui.js";
import { hideLoader, showAlertLogin, showLoader } from "../utils.js";
import { positionOpenCart } from "./positionCart.js";
import { updateCartButtons } from "../boxProduct/addCartBtn.js";

//todo=================================================================== تابع حذف محصول از سبد خرید
async function removeFromCart(id) {
  try {
    if (!(await showAlertLogin())) return false;
    showLoader();
    
    // ✅ دریافت دیتا از localStorage
    const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: [] };
    
    // ✅ حذف محصول
    const itemIndex = cartData.products.findIndex(item => item.product._id === id);
    if (itemIndex === -1) {
      hideLoader();
      showModal("❌ محصول در سبد خرید یافت نشد");
      return;
    }
    
    cartData.products.splice(itemIndex, 1);
    
    // ✅ محاسبه مجدد قیمت‌ها
    cartData.totalWithoutDiscount = cartData.products.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 0
    );
    cartData.totalWithDiscount = cartData.products.reduce(
      (sum, item) => sum + (item.finalPrice), 0
    );
    
    // ✅ ذخیره در localStorage
    localStorage.setItem('cartData', JSON.stringify(cartData));
    
    // ✅ بروزرسانی UI
    shoppingCartModal(cartData.products);
    createBoxProductToPageCart(cartData);
    boxPaymentHtmlTemplate(cartData);
    updateCartNotification();
    positionOpenCart();
    
    // ✅ آپدیت دکمه‌های سبد خرید در صفحه محصولات
    updateCartButtons();

    hideLoader();
    showModal(`❌🧺 محصول از سبد خرید شما حذف شد`);
    
  } catch (error) {
    console.error("Error in Function removeFromCart =>", error);
    hideLoader();
    showModal("خطا در حذف محصول از سبد خرید");
  }
}

export { removeFromCart };
// src/js/funcs/modalCart/quantity.js

import { boxPaymentHtmlTemplate, createBoxProductToPageCart, shoppingCartModal, showModal } from "../ui.js";
import { hideLoader, showAlertLogin, showLoader } from "../utils.js";
import { positionOpenCart } from "./positionCart.js";
import { updateCartButtons } from "../boxProduct/addCartBtn.js";

//! -------------------------------------------------------------------functions-------------------------------------------------------------------------
//todo=================================================================== عملیات افزایش یا کاهش تعداد محصول در سبد خرید
let updateQuantity = async (operation, id, quantity) => {
  try {
    if (!(await showAlertLogin())) return false;
    showLoader();    

    quantity = Number(quantity);
    if (operation === "increase") {
      quantity += 1;
    } else if (operation === "decrease" && quantity > 1) {
      quantity -= 1;
    } else {
      hideLoader();
      showModal("⚠️ حداقل تعداد محصول 1 می‌باشد.");
      return;
    }

    // ✅ دریافت سبد خرید از localStorage
    const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: [] };
    
    // ✅ پیدا کردن محصول در سبد خرید
    const itemIndex = cartData.products.findIndex(item => item.product._id === id);
    
    if (itemIndex === -1) {
      hideLoader();
      showModal("❌ محصول در سبد خرید یافت نشد");
      return;
    }
    
    // ✅ بروزرسانی تعداد
    cartData.products[itemIndex].quantity = quantity;
    cartData.products[itemIndex].finalPrice = Math.round(
      cartData.products[itemIndex].product.price * 
      (1 - (cartData.products[itemIndex].discountPercent || 0) / 100) * 
      quantity
    );
    
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
    positionOpenCart();
    
    // ✅ آپدیت دکمه‌های سبد خرید (اگر محصولی از سبد خرید حذف شده باشه)
    updateCartButtons();
    
    hideLoader();

  } catch (error) {
    console.error("Error in Function updateQuantity =>", error);
    hideLoader();
    showModal("❌ مشکل در به‌روزرسانی تعداد محصول");
  }
};

//!---------------------------------------------------------------------- exports -------------------------------------------------------
export { updateQuantity };
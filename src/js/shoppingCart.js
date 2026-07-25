// src/js/shoppingCart.js

import { boxPaymentHtmlTemplate, createBoxProductToPageCart } from "./funcs/ui.js";
import { hideLoader, pagesInLoginState } from "./funcs/utils.js";
import { updateCartButtons } from "./funcs/boxProduct/addCartBtn.js";

// ✅ دریافت دیتا از localStorage
const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: [] };

//! --------------------------------------------------------------------- نمایش سبد خرید
createBoxProductToPageCart(cartData);
boxPaymentHtmlTemplate(cartData);

// ✅ بروزرسانی دکمه‌های سبد خرید در صفحه سبد خرید
document.addEventListener('DOMContentLoaded', () => {
    hideLoader();
    pagesInLoginState();
    updateCartButtons();
});

console.log('✅ Shopping cart page loaded successfully');
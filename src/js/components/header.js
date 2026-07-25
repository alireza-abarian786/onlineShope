// src/js/header.js

import { toggleCart, updateCartNotification } from "../funcs/header/cartBtn.js";
import { closeCart } from "../funcs/header/closeCart.js";
import { isLogin } from "../funcs/header/loginBtn.js";
import { fetchCategoriesForShowToMenu } from "../funcs/header/menu.js";
import { hideLoader } from "../funcs/utils.js";
import { getLocalStorage } from "../funcs/storage.js";

//!---------------------------------------------------------------------- اجرا -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // اجرای توابع هدر
    isLogin();
    closeCart();
    toggleCart();
    updateCartNotification();
    fetchCategoriesForShowToMenu();
    hideLoader();
    
    // گوش دادن به تغییرات localStorage
    window.addEventListener('storage', (e) => {
        if (e.key === 'isAuthorized' || e.key === 'login' || e.key === 'userData') {
            isLogin();
            updateCartNotification();
        }
        if (e.key === 'cartData') {
            updateCartButtons();
        }
    });
});

console.log('✅ Header components loaded successfully');
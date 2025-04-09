// import { getLocalStorage } from "./storage.js";
import { toggleCart, closeCart , initializeCart} from "./cart.js";
import { isLogin , fetchCategoriesForShowToMenu} from "../utils.js";
import { settingSliderGlide} from "../sliders.js";
import { initializeStatusCarts , initializeStatusMarks , updateCartNotification} from "./ui.js";

//! رویداد بارگذاری صفحه
document.addEventListener('DOMContentLoaded', async () => { 
    try {
        settingSliderGlide()                            //* 🛒 فراخوانی اسلایدر عکس های محصولات
        initializeCart()                               //* 🛒 فراخوانی توابع محتوای سبد خرید
        toggleCart();                                //* 🛒 فراخوانی تابع باز کردن سبد خرید
        closeCart();                                //*❌ فراخوانی تابع بستن سبد خرید
        isLogin()                                  //* بررسی وضعیت لاگین کاربر
        initializeStatusMarks();                  //* 🔖 فراخوانی تابع بررسی وضعیت بوکمارک محصول
        initializeStatusCarts();                 //* 🔖 فراخوانی تابع بررسی وضعیت خرید محصول
        fetchCategoriesForShowToMenu()
        updateCartNotification()
    } catch (error) {
        console.error("خطا در بارگذاری داده‌ها:", error);

    }

});


import { toggleCart, closeCart , initializeCart} from "./cart.js";
import { isLogin , fetchCategoriesForShowToMenu} from "../utils.js";
import { getLocalStorage } from "./storage.js";
import { settingSliderGlide} from "../sliders.js";
import { showModal , initializeStatusCarts , initializeStatusMarks} from "./ui.js";

//! رویداد بارگذاری صفحه
document.addEventListener('DOMContentLoaded', async () => {      
    settingSliderGlide()                            //* 🛒 فراخوانی اسلایدر عکس های محصولات
    initializeCart()                               //* 🛒 فراخوانی توابع محتوای سبد خرید
    toggleCart();                                //* 🛒 فراخوانی تابع باز کردن سبد خرید
    closeCart();                                //*❌ فراخوانی تابع بستن سبد خرید
    isLogin(getLocalStorage('login'))          //* بررسی وضعیت لاگین کاربر
    initializeStatusMarks();                  //* 🔖 فراخوانی تابع بررسی وضعیت بوکمارک محصول
    initializeStatusCarts();                 //* 🔖 فراخوانی تابع بررسی وضعیت خرید محصول

    fetchCategoriesForShowToMenu()
});

//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { toggleCart, closeCart} from "./cart.js";
import { settingSliderGlide} from "../sliders.js";
import { initializeStatusCarts } from "./ui.js";
import { fetchCategoriesForShowToMenu, isLogin } from "../../header.js";
//!---------------------------------------------------------------------- addEventListener -------------------------------------------------------

//todo==================================================== رویداد بارگذاری صفحه
document.addEventListener('DOMContentLoaded', async () => { 
    try {
        settingSliderGlide()                            //* 🛒 فراخوانی اسلایدر عکس های محصولات
        toggleCart();                                //* 🛒 فراخوانی تابع باز کردن سبد خرید
        closeCart();                                //*❌ فراخوانی تابع بستن سبد خرید
        isLogin()                                  //* بررسی وضعیت لاگین کاربر
        initializeStatusCarts();                 //* 🔖 فراخوانی تابع بررسی وضعیت خرید محصول
        fetchCategoriesForShowToMenu()
    } catch (error) {
        console.error("خطا در بارگذاری داده‌ها:", error);

    }

});


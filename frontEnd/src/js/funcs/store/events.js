import { initializeCart } from "./cart.js";
import { initializeNavigation } from "./navigation.js";
import { toggleCart, closeCart , fetchAllCartItems , finalBuyCartFunc} from "./cart.js";
import { isLogin} from "../utils.js";
import { getLocalStorage } from "./storage.js";
import { settingSliderGlide} from "../sliders.js";
import { showModal , updateCartNotification , initializeStatusCarts , initializeStatusMarks} from "./ui.js";

//! رویداد بارگذاری صفحه
document.addEventListener('DOMContentLoaded', async () => {      
    let Carts = await fetchAllCartItems()                      //* دریافت سبد خرید 
    settingSliderGlide()                            //* 🛒 فراخوانی اسلایدر عکس های محصولات
    initializeCart()                               //* 🛒 فراخوانی توابع محتوای سبد خرید
    initializeNavigation();                       //* ⬅️➡️ فراخوانی تابع تنظیمات مریوط به دکمه های جابجایی بین تصاویر باکس محصول
    toggleCart();                                //* 🛒 فراخوانی تابع باز کردن سبد خرید
    closeCart();                                //*❌ فراخوانی تابع بستن سبد خرید
    isLogin(getLocalStorage('login'))          //* بررسی وضعیت لاگین کاربر
    updateCartNotification(Carts)             //* نمایش نوتیف سبد خرید

    initializeStatusMarks();                //* 🔖 فراخوانی تابع بررسی وضعیت بوکمارک محصول
    initializeStatusCarts();               //* 🔖 فراخوانی تابع بررسی وضعیت خرید محصول
    // finalBuyCartFunc()
});

// document.addEventListener('DOMContentLoaded', () => {            
//     if (getLocalStorage('mark').length === 0) {
//         fetch('http://localhost:3000/bookmarks')
//         .then(response => response.json())
//         .then(products => {
//             products.forEach(product => {
//                 fetch(`http://localhost:3000/bookmarks/${product.id}`, {
//                     method: 'DELETE'
//                 });
//             });
//         })
//         .then(() => {
//             showModal("❌ همه بوکمارک ها حذف شدند")
//             localStorage.removeItem('id')
//         })
//         .catch(error => console.error("خطا در حذف بوکمارک ها :", error));
//     }
// });

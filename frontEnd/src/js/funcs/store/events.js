import { initializeCart , productToCart , increaseQuantity} from "./cart.js";
import { handleAddToCart} from "./box.js";
import { toggleBookmark } from "./bookMarks.js";
import { initializeNavigation } from "./navigation.js";
import { toggleCart, closeCart , allCart} from "./cart.js";
import { isLogin} from "../utils.js";
import { getLocalStorage } from "./storage.js";
import { settingSliderGlide} from "../sliders.js";
import { showModal , updateCartNotification , initializeStatusCarts , initializeStatusMarks} from "./ui.js";
import { allBookmarks } from "./bookMarks.js";

document.addEventListener('DOMContentLoaded', async () => {  
    // دریافت اطلاعات تمام بوکمارک‌ها
    let Marks = await allBookmarks()

    // دریافت سبد خرید
    let Carts = await allCart()       

    settingSliderGlide()
    initializeCart()             //* 🛒 فراخوانی توابع محتوای سبد خرید
    initializeNavigation();     //* ⬅️➡️ فراخوانی تابع تنظیمات مریوط به دکمه های جابجایی بین تصاویر باکس محصول
    toggleCart();              //* 🛒 فراخوانی تابع باز کردن سبد خرید
    closeCart();              //*❌ فراخوانی تابع بستن سبد خرید

    initializeStatusMarks(Marks , '.icon-bookmark' , 'is-mark' , 'not-mark');       // 🔖 فراخوانی تابع بررسی وضعیت بوکمارک محصول
    initializeStatusCarts(Carts , '.add-cart > p' , 'text-bg-primary');       // 🔖 فراخوانی تابع بررسی وضعیت خرید محصول

    isLogin(getLocalStorage('login'))
    updateCartNotification(Carts)
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

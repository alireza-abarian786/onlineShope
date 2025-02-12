import { initializeCart } from "./cart.js";
import { handleAddToCart} from "./box.js";
import { toggleBookmark, initializeStatus } from "./bookMarks.js";
import { initializeNavigation } from "./navigation.js";
import { toggleCart, closeCart } from "./cart.js";
import { isLogin , changeSrcLoginBtn} from "../utils.js";
import { getLocalStorage } from "./storage.js";
import { settingSliderGlide , settingSliderSwiper} from "../sliders.js";
import { showModal } from "./ui.js";

document.addEventListener('DOMContentLoaded', () => {    
    settingSliderGlide()
    settingSliderSwiper()
    initializeCart();             // 🛒 فراخوانی توابع محتوای سبد خرید
    initializeNavigation();     // ⬅️➡️ فراخوانی تابع تنظیمات مریوط به دکمه های جابجایی بین تصاویر باکس محصول
    toggleCart();              // 🛒 فراخوانی تابع باز کردن سبد خرید
    closeCart();              // ❌ فراخوانی تابع بستن سبد خرید
    initializeStatus('mark' , '.icon-bookmark' , 'is-mark' , 'not-mark');       // 🔖 فراخوانی تابع بررسی وضعیت بوکمارک محصول
    initializeStatus('cart' , '.add-cart > p' , 'text-bg-primary');       // 🔖 فراخوانی تابع بررسی وضعیت خرید محصول

    isLogin(getLocalStorage('login'))
    changeSrcLoginBtn()

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

//🛒 ست کردن رویداد کلیک روی دکمه افزودن محصول به سبد خرید
document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', handleAddToCart);
});

//🛒 ست کردن رویداد کلیک روی دکمه بوکمارک شدن محصول
document.querySelectorAll('.icon-bookmark').forEach(icon => {    
    icon.addEventListener('click', toggleBookmark);
});


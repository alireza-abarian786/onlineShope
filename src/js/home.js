//!---------------------------------------------------------------------- import -------------------------------------------------------
import { runTimer } from "./funcs/timer.js";
import { createBlogs } from './funcs/store/ui.js';
import { hideLoader } from "./funcs/utils.js";
import { searchGlobalHandler, showProductHomePage } from "./funcs/fetchProducts.js";
import { setLocalStorage } from "./funcs/store/storage.js";

//!---------------------------------------------------------------------- Variable -------------------------------------------------------
const containerArticles = document.querySelector(".box-articles");
const searchGlobalInputElem = document.querySelector("#search-global");

//!---------------------------------------------------------------------- function -------------------------------------------------------
//todo========================================================== نمایش محصولات صفحه اصلی
showProductHomePage()

// todo========================================================== نمایش مقالات صفحه اصلی
createBlogs(containerArticles);

//todo========================================================== نمایش تایمر صفحه اصلی
runTimer();

//todo========================================================== جستجوی سراسری محصولات
searchGlobalInputElem.addEventListener("keyup" , (event) => searchGlobalHandler(event))

// const res = await fetch("https://onlineshope.onrender.com/api/user/me" , {
//     method: 'GET',
//     credentials: 'include'
// })

fetch("https://onlineshope.onrender.com/api/user/me", {
  method: "GET",
  credentials: "include", // ⬅️ خیلی مهم برای ارسال کوکی
})
  .then(res => res.json())
  .then(data => {
    console.log("✅ کاربر:", data);
  })
  .catch(err => {
    console.error("❌ خطا در گرفتن پروفایل", err);
  });

// console.log(res);


// setLocalStorage('login' , "ali")
hideLoader()
console.log('home');

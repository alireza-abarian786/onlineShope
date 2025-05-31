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

// setLocalStorage('login' , "ali")
hideLoader()
console.log('home');

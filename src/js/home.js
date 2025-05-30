//!---------------------------------------------------------------------- import -------------------------------------------------------
import { runTimer } from "./funcs/timer.js";
import { createBlogs } from './funcs/store/ui.js';
import { hideLoader } from "./funcs/utils.js";
import { showProductHomePage } from "./funcs/fetchProducts.js";

//!---------------------------------------------------------------------- Variable -------------------------------------------------------
const containerArticles = document.querySelector(".box-articles");

//!---------------------------------------------------------------------- function -------------------------------------------------------
//todo========================================================== نمایش محصولات صفحه اصلی
showProductHomePage()

// todo========================================================== نمایش مقالات صفحه اصلی
createBlogs(containerArticles);

//todo========================================================== نمایش تایمر صفحه اصلی
runTimer();

hideLoader()
console.log('home');

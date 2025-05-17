import './header.js'
import './funcs/store/box.js'
//!---------------------------------------------------------------------- import -------------------------------------------------------
// import { settingSliderSwiper } from "./funcs/sliders.js";
// import { createProductsAppliances , createBlogs, initializeStatusMarks, updateCartNotification, initializeStatusCarts} from "./funcs/store/ui.js";
// import { fetchDataFromApi, hideLoader , showAlertLogin} from "./funcs/utils.js";
// import { fetchCategoriesForShowToMenu, isLogin, searchGlobalHandler } from "./header.js";
// import { closeCart, toggleCart } from "./funcs/store/cart.js";
// import { getToken } from "./funcs/store/storage.js";

import { runTimer } from "./funcs/timer.js";
import { resultProductsFetchOperation, updateFavoritesUI } from './funcs/store/box.js';
import { hideLoader } from './funcs/utils.js';
import { createProductsTemplateHtml } from './funcs/store/box.js';
import { createBlogs } from './funcs/store/ui.js';


//!---------------------------------------------------------------------- Variable -------------------------------------------------------
const discountsGoodsSlider = document.querySelector(".cantainer-category-discounts");
const containerCategoryAppliances = document.querySelector(".cantainer-category-appliances");
const containerCategoryPhones = document.querySelector(".cantainer-category-phones");
const containerCategoryTools = document.querySelector(".cantainer-category-tools");
const containerCategoryModes = document.querySelector(".cantainer-category-modes");
const containerArticles = document.querySelector(".box-articles");
//!---------------------------------------------------------------------- function -------------------------------------------------------

//todo===================================== نمایش محصولات و دسته بندی های صفحه اصلی
const arrDiscount = resultProductsFetchOperation.filter((product) => product.discount);
const arrAppliances = resultProductsFetchOperation.filter((item) => item.category_id === "3");
const arrPhones = resultProductsFetchOperation.filter((item) => item.category_id === "10");
const arrTools = resultProductsFetchOperation.filter((item) => item.category_id === "9");
const arrModes = resultProductsFetchOperation.filter((item) => item.category_id === "2");

createProductsTemplateHtml(discountsGoodsSlider, arrDiscount);
createProductsTemplateHtml(containerCategoryAppliances, arrAppliances);
createProductsTemplateHtml(containerCategoryPhones, arrPhones);
createProductsTemplateHtml(containerCategoryTools, arrTools);
createProductsTemplateHtml(containerCategoryModes, arrModes);

//todo========================================================== نمایش باکس مقالات صفحه اصلی
createBlogs(containerArticles)

//todo========================================================== نمایش تایمر صفحه اصلی
runTimer();

//todo========================================================== نمایش محصولات بوکمارک شده
updateFavoritesUI()

//todo========================================================== مخفی شدن لودر
hideLoader()

//!---------------------------------------------------------------------- addEventListener -------------------------------------------------------

//todo======================================== رویداد بارگذاری محتویات صفحه اصلی
window.addEventListener("load", async () => {  
  // hideLoader()
  // changeBtnAfterAdd()
  // fetchCategoriesForShowToMenu()
  // toggleCart()
  // closeCart()
  // isLogin()
  // settingSliderSwiper();
  // getAllProduct();
  // createBlogs(containerArticles);
  // initializeStatusMarks();                  
  // initializeStatusCarts()
  // hideLoader()
  // updateCartNotification()
});




//!---------------------------------------------------------------------- import -------------------------------------------------------
import './header.js'
import './funcs/store/box.js'
import { runTimer } from "./funcs/timer.js";
import { resultProductsFetchOperation } from './funcs/store/box.js';
import { createProductsTemplateHtml } from './funcs/store/box.js';
import { createBlogs } from './funcs/store/ui.js';
import { refreshedPage } from './funcs/utils.js';
import { getCartData, updateCartNotification } from './funcs/store/cart.js';

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

//todo========================================================== رفرش شدن بعد از بازگشت به صفحه
refreshedPage()


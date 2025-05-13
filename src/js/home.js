//!---------------------------------------------------------------------- import -------------------------------------------------------
import { settingSliderSwiper } from "./funcs/sliders.js";
import { runTimer } from "./funcs/timer.js";
import { createProductsAppliances , createBlogs, initializeStatusMarks, updateCartNotification, initializeStatusCarts, changeBtnAfterAdd} from "./funcs/store/ui.js";
import { fetchDataFromApi, hideLoader } from "./funcs/utils.js";
import { fetchCategoriesForShowToMenu, isLogin, searchGlobalHandler } from "./header.js";
import { closeCart, toggleCart } from "./funcs/store/cart.js";

//!---------------------------------------------------------------------- Variable -------------------------------------------------------
const discountsGoodsSlider = document.querySelector(".cantainer-category-discounts");
const containerCategoryAppliances = document.querySelector(".cantainer-category-appliances");
const containerCategoryPhones = document.querySelector(".cantainer-category-phones");
const containerCategoryTools = document.querySelector(".cantainer-category-tools");
const containerCategoryModes = document.querySelector(".cantainer-category-modes");
const containerArticles = document.querySelector(".box-articles");
const searchGlobalInputElem = document.querySelector("#search-global");
//!---------------------------------------------------------------------- function -------------------------------------------------------

//todo===================================== نمایش محصولات صفحه اصلی
const getAllProduct = async () => {
  try {
    const result = await fetchDataFromApi('https://onlineshope.onrender.com/api/products');
    const arrDiscount = result.filter((product) => product.discount);
    const arrAppliances = result.filter((item) => item.category_id === "3");
    const arrPhones = result.filter((item) => item.category_id === "10");
    const arrTools = result.filter((item) => item.category_id === "9");
    const arrModes = result.filter((item) => item.category_id === "2");

    createProductsAppliances(discountsGoodsSlider, arrDiscount);
    createProductsAppliances(containerCategoryAppliances, arrAppliances);
    createProductsAppliances(containerCategoryPhones, arrPhones);
    createProductsAppliances(containerCategoryTools, arrTools);
    createProductsAppliances(containerCategoryModes, arrModes);

  } catch (error) {
    console.error("🚨 Error in getAllProduct:", error);
  }
};

//!---------------------------------------------------------------------- addEventListener -------------------------------------------------------

//todo======================================== رویداد وارد کردن مقدار در سرچ
searchGlobalInputElem.addEventListener("keyup" , (event) => searchGlobalHandler(event))

//todo======================================== رویداد بارگذاری محتویات صفحه اصلی
window.addEventListener("load", async () => {
  fetchCategoriesForShowToMenu()
  toggleCart()
  closeCart()
  isLogin()
  settingSliderSwiper();
  runTimer();
  getAllProduct();
  createBlogs(containerArticles);
  initializeStatusMarks();                  
  initializeStatusCarts()
  hideLoader()
  updateCartNotification()
  changeBtnAfterAdd()
});




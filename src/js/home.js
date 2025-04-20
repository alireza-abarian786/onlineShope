import { settingSliderSwiper } from "./funcs/sliders.js";
import { runTimer } from "./funcs/timer.js";
import { createProductsAppliances , createBlogs} from "./funcs/store/ui.js";
import { fetchDataFromApi } from "./funcs/utils.js";
import { initializeStatusMarks } from "./funcs/store/ui.js";

// -------------------------------------------------------------------------------------

const discountsGoodsSlider = document.querySelector(".cantainer-category-discounts");
const containerCategoryAppliances = document.querySelector(".cantainer-category-appliances");
const containerCategoryPhones = document.querySelector(".cantainer-category-phones");
const containerCategoryTools = document.querySelector(".cantainer-category-tools");
const containerCategoryModes = document.querySelector(".cantainer-category-modes");
const containerArticles = document.querySelector(".box-articles");
// --------------------------------------------------------------------------------------------------

//! رویداد بارگذاری صفحه
document.addEventListener("DOMContentLoaded", async () => {
  settingSliderSwiper();
  runTimer();

  await getAllProduct();
  createBlogs(containerArticles);
  initializeStatusMarks();                  //* 🔖 فراخوانی تابع بررسی وضعیت بوکمارک محصول
});

// //! نمایش محصولات صفحه اصلی
let getAllProduct = async () => {
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







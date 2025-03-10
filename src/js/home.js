import { settingSliderSwiper } from "./funcs/sliders.js";
import { runTimer } from "./funcs/timer.js";
import { createProductsAppliances , createBlogs} from "./funcs/store/ui.js";
import { fetchDataFromApi } from "./funcs/utils.js";

// -------------------------------------------------------------------------------------

let discountsGoodsSlider = document.querySelector(".cantainer-category-discounts");
let containerCategoryAppliances = document.querySelector(
  ".cantainer-category-appliances"
);
let containerCategoryPhones = document.querySelector(
  ".cantainer-category-phones"
);
let containerCategoryTools = document.querySelector(
  ".cantainer-category-tools"
);
let containerCategoryModes = document.querySelector(
  ".cantainer-category-modes"
);
let containerArticles = document.querySelector(".box-articles");
// --------------------------------------------------------------------------------------------------

//! رویداد بارگذاری صفحه
document.addEventListener("DOMContentLoaded", () => {
  settingSliderSwiper();
  runTimer();

  getAllProduct();
  createBlogs(containerArticles);
});

// //! نمایش محصولات صفحه اصلی
let getAllProduct = async () => {
  try {
    let result = await fetchDataFromApi('https://onlineshope.onrender.com/api/products');
    let arrDiscount = result.filter((product) => product.discount);
    let arrAppliances = result.filter((item) => item.category_id === "3");
    let arrPhones = result.filter((item) => item.category_id === "10");
    let arrTools = result.filter((item) => item.category_id === "9");
    let arrModes = result.filter((item) => item.category_id === "2");

    createProductsAppliances(discountsGoodsSlider, arrDiscount);
    createProductsAppliances(containerCategoryAppliances, arrAppliances);
    createProductsAppliances(containerCategoryPhones, arrPhones);
    createProductsAppliances(containerCategoryTools, arrTools);
    createProductsAppliances(containerCategoryModes, arrModes);

  } catch (error) {
    console.error("🚨 Error in getAllProduct:", error);
  }
};
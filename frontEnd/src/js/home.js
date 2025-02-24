import { settingSliderSwiper } from "./funcs/sliders.js";
import { runTimer } from "./funcs/timer.js";
import { createProductsAppliances , createBlogs} from "./funcs/store/ui.js";
import { fetchAllProducts } from "./funcs/store/box.js";
import { fetchDataFromApi } from "./funcs/utils.js";

let discountsGoodsSlider = document.querySelector(".cantainer-category-discounts");
let cantainerCategoryAppliances = document.querySelector(
  ".cantainer-category-appliances"
);
let cantainerCategoryPhones = document.querySelector(
  ".cantainer-category-phones"
);
let cantainerCategoryTools = document.querySelector(
  ".cantainer-category-tools"
);
let cantainerCategoryModes = document.querySelector(
  ".cantainer-category-modes"
);
let cantainerArticles = document.querySelector(".box-articles");
// --------------------------------------------------------------------------------------------------

//! رویداد بارگذاری صفحه
document.addEventListener("DOMContentLoaded", () => {
  settingSliderSwiper();
  runTimer();

  getAllProduct();
  createBlogs(cantainerArticles);
});

//! نمایش محصولات صفحه اصلی
let getAllProduct = async () => {
  let result = await fetchDataFromApi('http://localhost:4000/products');

  let arrDiscount = result.filter((product) => product.discount);
  let arrAppliances = result.filter((item) => item.category_id === 3);
  let arrPhones = result.filter((item) => item.category_id === 10);
  let arrTools = result.filter((item) => item.category_id === 9);
  let arrModes = result.filter((item) => item.category_id === 2);

  createProductsAppliances(discountsGoodsSlider, arrDiscount);
  createProductsAppliances(cantainerCategoryAppliances, arrAppliances);
  createProductsAppliances(cantainerCategoryPhones, arrPhones);
  createProductsAppliances(cantainerCategoryTools, arrTools);
  createProductsAppliances(cantainerCategoryModes, arrModes);
};





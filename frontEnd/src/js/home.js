import { settingSliderSwiper, settingSliderGlide } from "./funcs/sliders.js";
import { clickButtonsProduct } from "./funcs/store/box.js";
import { clickAddBookMark } from "./funcs/store/bookMarks.js";
import { runTimer } from "./funcs/timer.js";
import { createProductsAppliances } from "./funcs/store/ui.js";

let discountsGoodsSlider = document.querySelector(".discounts-goods-slider");
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
  createBlogs();
});

// ! گرفتن لیست تمام محصولات از سرور
let allProducts = async () => {
  let res = await fetch("http://localhost:4000/products");
  let result = await res.json();

  return result;
}

//! نمایش محصولات صفحه اصلی
let getAllProduct = async () => {
  let result = await allProducts()

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



//! ساخت باکس مقالات صفحه اصلی 
let createBlogs = async () => {
  let res = await fetch("http://localhost:4000/blogs");
  let result = await res.json();

  result.forEach((blog) => {
    cantainerArticles.insertAdjacentHTML(
      "beforeend",
      `
            <div class="swiper-slide">
              <div>
                <img src="${blog.image}" alt="image" />
              </div>
  
              <div>
                <h6>${blog.title}</h6>
                <p>${blog.content}</p>
                <a href="./blog.html">
                  <p class="mb-1">مطالعه مقاله</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path
                      fill="currentColor"
                      d="M529.408 149.376a29.12 29.12 0 0 1 41.728 0a30.59 30.59 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672zm256 0a29.12 29.12 0 0 1 41.728 0a30.59 30.59 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672z"
                    />
                  </svg>
                </a>
              </div>
            </div>
            
        `
    );
  });
};

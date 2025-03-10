import { settingSliderSwiper } from "./funcs/sliders.js";
import { runTimer } from "./funcs/timer.js";
import { createProductsAppliances , createBlogs} from "./funcs/store/ui.js";
import { fetchDataFromApi } from "./funcs/utils.js";

import { getLocalStorage } from "./funcs/store/storage.js";
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
let fetchUserLogged = async () => {
    let userName = await getLocalStorage("login");                                                             //* کاربری که لاگین کرده username        
    let getUsers = await fetchDataFromApi('https://onlineshope.onrender.com/api/users');                    //* دریافت لیست کل یوزر ها  
    let user = getUsers.find(user => user.name === userName)
    
    return user;
}

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
  let result = await fetchDataFromApi('https://onlineshope.onrender.com/api/products');

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



let userLogged = await fetchUserLogged()
let data = fetchDataFromApi(`https://onlineshope.onrender.com/api/carts/${userLogged.id}`);               //* دریافت لیست کل سبد خرید  
console.log(data);

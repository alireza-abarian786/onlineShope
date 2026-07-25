// src/js/home.js

import { runTimer } from "./funcs/timer.js";
import { boxCategoriesTemplateHtml, createBlogs, createProductsTemplateHtml } from './funcs/ui.js';
import { hideLoader } from './funcs/utils.js';
import fakeProducts from "../data/ProductData.js";
import fakeCategories from "../data/CategoriesData.js";
import { updateCartButtons } from "./funcs/boxProduct/addCartBtn.js";

//!---------------------------------------------------------------------- Variable -------------------------------------------------------
const containerArticles = document.querySelector(".box-articles");
const searchGlobalInputElem = document.querySelector("#search-global");

const discountsGoodsSlider = document.querySelector(".container-category-discounts");
const containerCategoryAppliances = document.querySelector(".container-category-appliances");
const containerCategoryPhones = document.querySelector(".container-category-phones");
const containerCategoryTools = document.querySelector(".container-category-tools");
const containerCategoryModes = document.querySelector(".container-category-modes");

// ✅ ذخیره دیتا در localStorage برای دسترسی سایر بخش‌ها
if (!localStorage.getItem('productsData')) {
    localStorage.setItem('productsData', JSON.stringify(fakeProducts));
}
if (!localStorage.getItem('categoriesData')) {
    localStorage.setItem('categoriesData', JSON.stringify(fakeCategories));
}

//!---------------------------------------------------------------------- function -------------------------------------------------------
//todo===================================== نمایش محصولات بر اساس دسته بندی در صفحه اصلی
const showProductHomePage = async () => {
  const productsData = fakeProducts;
  const categoriesData = fakeCategories;

  const arrDiscount = productsData.filter((product) => product.discount > 0);
  const arrAppliances = productsData.filter((item) => item.category === "kitchen");
  const arrPhones = productsData.filter((item) => item.category === "phone");
  const arrTools = productsData.filter((item) => item.category === "tools");
  const arrModes = productsData.filter((item) => item.category === "mode");

  createProductsTemplateHtml(discountsGoodsSlider, arrDiscount);
  createProductsTemplateHtml(containerCategoryAppliances, arrAppliances);
  createProductsTemplateHtml(containerCategoryPhones, arrPhones);
  createProductsTemplateHtml(containerCategoryTools, arrTools);
  createProductsTemplateHtml(containerCategoryModes, arrModes);

  boxCategoriesTemplateHtml(categoriesData);
};




// todo============================================== سرچ سراسری محصولات
const searchGlobalHandler = (event) => {
    const searchValue = event.target.value.trim();
    const ulElemListSearch = document.querySelector(".box-search__ul-list");

    if (!ulElemListSearch) return;

    if (searchValue) {
        ulElemListSearch.classList.add('show');

        ulElemListSearch.innerHTML = `
            <li class="w-100 p-3 text-center">
                <div class="mini-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </li>`;

        setTimeout(() => {
            const filterProducts = fakeProducts.filter(product =>
                product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                product.brand?.toLowerCase().includes(searchValue.toLowerCase()) ||
                product.category?.toLowerCase().includes(searchValue.toLowerCase())
            );

            ulElemListSearch.innerHTML = '';

            if (filterProducts.length > 0) {

                    filterProducts.forEach(item => {
                        ulElemListSearch.insertAdjacentHTML('beforeend',
                            `<li class="w-100 p-3 border-bottom d-flex align-items-center gap-2" 
                                style="cursor: pointer;"
                                onclick="window.location.href='./product.html?id=${item._id}'">
                                <img src="${item.image}" alt="${item.name}" 
                                    width="40" height="40" 
                                    style="object-fit: contain; border-radius: 6px;"
                                    onerror="this.src='/src/assets/images/placeholder.webp'" />
                                <div>
                                    <div class="fw-bold" style="font-size: 14px;">${item.name}</div>
                                    <div style="font-size: 12px; color: #666;">
                                        ${item.price.toLocaleString()} تومان
                                        ${item.discount > 0 ? `<span class="text-danger ms-2">${item.discount}%</span>` : ''}
                                    </div>
                                </div>
                            </li>`
                        );
                    });
            } else {
                ulElemListSearch.innerHTML = '<li class="w-100 p-3 text-center text-danger bg-secondary bg-opacity-25">محصولی یافت نشد</li>';
            }
        }, 300);

    } else {
        ulElemListSearch.classList.remove('show');
        ulElemListSearch.innerHTML = '';
    }
};




//todo========================================================== نمایش محصولات صفحه اصلی
showProductHomePage();

// todo========================================================== نمایش مقالات صفحه اصلی
createBlogs(containerArticles);

//todo========================================================== نمایش تایمر صفحه اصلی
runTimer();

//todo========================================================== جستجوی سراسری محصولات
searchGlobalInputElem.addEventListener("keyup", (event) => searchGlobalHandler(event));

// ✅ آپدیت دکمه‌های سبد خرید بعد از رندر کامل
setTimeout(() => {
    updateCartButtons();
}, 500);

// ✅ گوش دادن به تغییرات سبد خرید در سایر تب‌ها
window.addEventListener('storage', (e) => {
    if (e.key === 'cartData') {
        updateCartButtons();
    }
});

console.log('✅ Home page loaded successfully');
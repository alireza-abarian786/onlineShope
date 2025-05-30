import { createProductsTemplateHtml } from "./store/ui.js";

//!---------------------------------------------------------------------- function -------------------------------------------------------
//todo========================================================== دریافت لیست تمامی محصولات
const productsFetchOperation = await fetch("https://onlineshope.onrender.com/api/products");
const resultProductsFetchOperation = await productsFetchOperation.json();

const discountsGoodsSlider = document.querySelector(".container-category-discounts");
const containerCategoryAppliances = document.querySelector(".container-category-appliances");
const containerCategoryPhones = document.querySelector(".container-category-phones");
const containerCategoryTools = document.querySelector(".container-category-tools");
const containerCategoryModes = document.querySelector(".container-category-modes");

//todo===================================== نمایش محصولات بر اساس دسته بندی در صفحه اصلی
const showProductHomePage = () => {
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
};

// todo============================================== سرچ سراسری محصولات
const searchGlobalHandler = async (event) => {
  const searchValue = event.target.value.trim();
  const ulElemListSearch = document.querySelector(".box-search__ul-list");  

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


    try {
      const filterProducts = await resultProductsFetchOperation.filter(product =>
        product.name.toLowerCase().startsWith(searchValue.toLowerCase())
      );

      ulElemListSearch.innerHTML = '';

      if (filterProducts.length > 0) {
        filterProducts.forEach(item => {
          ulElemListSearch.insertAdjacentHTML('beforeend',
            `<li class="w-100 p-3 border-bottom">${item.name}</li>`
          );
        });
      } else {
        ulElemListSearch.innerHTML = '<li class="w-100 p-3 text-center text-danger bg-secondary bg-opacity-25">محصولی یافت نشد</li>';
      }

    } catch (err) {
      ulElemListSearch.innerHTML = '<li class="w-100 p-3 text-danger">خطا در دریافت محصولات</li>';
      console.error(err);
    }

  } else {
    ulElemListSearch.classList.remove('show');
    ulElemListSearch.innerHTML = '';
  }
}


export { showProductHomePage , searchGlobalHandler}
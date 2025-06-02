//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { clickOnPagination } from "./funcs/categoryPage/pagination.js";
import { getFavorites } from "../js/funcs/fetchData/fetchMarks.js";
import { resultProductsFetchOperation } from "../js/funcs/fetchData/fetchProducts.js";
import { hideLoader, searchParams } from "../js/funcs/utils.js";
import { handlingCategoryPageFunctions } from "./funcs/categoryPage/searchProduct.js";
import { categories } from "./funcs/fetchData/fetchCategories.js";

//!---------------------------------------------------------------------- imports -------------------------------------------------------
const data = await categories() 

//todo======================================================== URL فیلتر کردن دسته بندی ها بر اساس
const getCategoryFunc = async () => {
  const urlSearchParams = searchParams('cat'); 
  const findCategory = await data.find(item => item.urlSearch === urlSearchParams);                               
  const getProductCategory = await resultProductsFetchOperation.filter(item => item.category_id == findCategory.id);            
  return getProductCategory;
}

//todo======================================================== تابعی برای دریافت دسته‌ بندی و نمایش باکس محصولات مرتبط
const category = async () => { 
  const urlSearchParams = searchParams('cat');                                                                        
  const getProductCategory = await getCategoryFunc()                                                   
  
  switch (urlSearchParams) {
    case 'bookmarks':{
      const bookmarkedProducts = await getFavorites()    
      handlingCategoryPageFunctions([...bookmarkedProducts])
      break;
    }
    case 'discounts':{
      const discountedProducts = resultProductsFetchOperation.filter(item => item.discount)
      handlingCategoryPageFunctions([...discountedProducts])      
      break;
    }
    case 'allProducts':{
      handlingCategoryPageFunctions([...resultProductsFetchOperation])  
      break;
    }
    default:
      handlingCategoryPageFunctions([...getProductCategory])
      break;
  }
};

//todo======================================================== تغییرات کانتینر
if (window.innerWidth < '992') {
  const container = document.querySelector(".container")
  container.classList.add('container-fluid')
  container.classList.remove('container')  
}
if (window.innerWidth < '768') {
  const container = document.querySelector(".container-fluid")
  container.classList.add('container')
  container.classList.remove('container-fluid')  
}

// // todo============================================== و نمایش در قسمت منو category دریافت
// const fetchCategoriesForShowToMenu = async () => {
// //   const data = await categories();
//   const categoryWrapperXl = document.querySelector(".category-wrapper-xl");
//   const categoryWrapperLg = document.querySelector(".category-wrapper-lg");  

//   if (categoryWrapperXl) {
//     data.forEach((item) => {
//       categoryWrapperXl.insertAdjacentHTML(
//         "beforeend",
//         `
//               <a href="./category.html?cat=${item.urlSearch}&page=1">
//                   <h6 class="shadow-sm">${item.name}</h6>
//               </a>
//           `
//       );
//     });
//   }

//   if (categoryWrapperLg) {
//     data.forEach((item) => {
//       categoryWrapperLg.insertAdjacentHTML(
//         "beforeend",
//         `
//               <a href="./category.html?cat=${item.urlSearch}&page=1">
//                   <h6 class="shadow-sm">${item.name}</h6>
//               </a>
//           `
//       );
//     });
//   }
// };

category()
hideLoader()
console.log('category');
//!---------------------------------------------------------------------- binding -------------------------------------------------------
window.clickOnPagination = clickOnPagination
export { category }
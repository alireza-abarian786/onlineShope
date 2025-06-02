// import { getCategoryFunc } from "../fetchData/fetchCategories.js";
// import { getFavorites } from "../fetchData/fetchMarks.js";
// import { resultProductsFetchOperation } from "../fetchData/fetchProducts.js";
// import { searchParams } from "../../funcs/utils.js";
// import { handlingCategoryPageFunctions } from "./searchProduct.js";

// //todo======================================================== تابعی برای دریافت دسته‌ بندی و نمایش باکس محصولات مرتبط
// const category = async () => { 
//   const urlSearchParams = searchParams('cat');                                                                        
//   const getProductCategory = await getCategoryFunc()                                                   
  
//   switch (urlSearchParams) {
//     case 'bookmarks':{
//       const bookmarkedProducts = await getFavorites()    
//       handlingCategoryPageFunctions([...bookmarkedProducts])
//       break;
//     }
//     case 'discounts':{
//       const discountedProducts = resultProductsFetchOperation.filter(item => item.discount)
//       handlingCategoryPageFunctions([...discountedProducts])      
//       break;
//     }
//     case 'allProducts':{
//       handlingCategoryPageFunctions([...resultProductsFetchOperation])  
//       break;
//     }
//     default:
//       handlingCategoryPageFunctions([...getProductCategory])
//       break;
//   }
// };

// //todo======================================================== تغییرات کانتینر
// if (window.innerWidth < '992') {
//   const container = document.querySelector(".container")
//   container.classList.add('container-fluid')
//   container.classList.remove('container')  
// }
// if (window.innerWidth < '768') {
//   const container = document.querySelector(".container-fluid")
//   container.classList.add('container')
//   container.classList.remove('container-fluid')  
// }

// export { category }
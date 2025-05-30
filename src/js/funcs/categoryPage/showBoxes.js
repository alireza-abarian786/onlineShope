import { getCategoryFunc } from "../fetchCategories.js";
import { getFavorites } from "../fetchMarks.js";
import { resultProductsFetchOperation } from "../fetchProducts.js";
import { searchParams } from "../utils.js";
import { handlingCategoryPageFunctions } from "./searchProduct.js";

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

export { category }
import { getCategoryFunc } from "../fetchData/fetchCategories.js";
import { getFavorites } from "../fetchData/fetchMarks.js";
import { getProducts } from "../fetchData/fetchProducts.js";
import { searchParams } from "../../funcs/utils.js";
import { handlingCategoryPageFunctions } from "./searchProduct.js";

//todo======================================================== تابعی برای دریافت دسته‌ بندی و نمایش باکس محصولات مرتبط
const category = async () => { 
  const urlSearchParams = searchParams('cat');                                                                        
  const getProductCategory = await getCategoryFunc()                                                   
  const productsData = await getProducts()  
  
  switch (urlSearchParams) {
    case 'bookmarks':{
      const bookmarkedProductsID = await getFavorites()    
      const bookmarkedProductsData = productsData.filter(product => {
        return bookmarkedProductsID.favorites.includes(product._id);
      });          
      
      handlingCategoryPageFunctions([...bookmarkedProductsData])
      break;
    }
    case 'discounts':{
      const discountedProducts = productsData.filter(item => item.discount)
      handlingCategoryPageFunctions([...discountedProducts])      
      break;
    }
    case 'allProducts':{
      handlingCategoryPageFunctions([...productsData])  
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
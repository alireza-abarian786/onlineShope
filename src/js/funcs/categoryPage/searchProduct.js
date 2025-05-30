import { getSearchProduct, hideLoader, searchParams } from "../utils.js";
import { changeShowBoxes } from "./changingStateBoxes.js";
import { setDropdownItem } from "./filterProduct.js";
import { handlePagination } from "./pagination.js";

//todo======================================================== category تابعی برای جستجوی محصولات داخل 
const handlingCategoryPageFunctions = async (arrayProducts) => {
  const pagination = document.querySelector(".pagination")

  const urlSearchParams = searchParams('page');                                                                         
  const showProductsAnyPage = await handlePagination(arrayProducts , pagination , 9 , urlSearchParams)
  showSearchProducts(showProductsAnyPage);                                                      
  changeShowBoxes(showProductsAnyPage)                                                          
  setDropdownItem(showProductsAnyPage)                                                      
  hideLoader()
}

//todo======================================================== category تابعی برای جستجوی محصولات داخل 
const showSearchProducts = async (data) => {
  const boxSearchInput = document.querySelector(".box-search-category")

  boxSearchInput.addEventListener('input', (e) => {
    if (Array.isArray(data)) {
      const showProduct = getSearchProduct(data , 'name' , e.target.value.trim())
      showProduct.then(res => changeShowBoxes(res))  
    }
  })
}

export { handlingCategoryPageFunctions , showSearchProducts }
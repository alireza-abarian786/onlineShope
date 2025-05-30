import { resultProductsFetchOperation } from "./fetchProducts.js"
import { searchParams } from "./utils.js"

const fetchCategories = await fetch('https://onlineshope.onrender.com/api/categories')
const categoriesData = await fetchCategories.json()

//!---------------------------------------------------------------------- functions -------------------------------------------------------
//todo======================================================== URL فیلتر کردن دسته بندی ها بر اساس
const getCategoryFunc = async () => {
  const urlSearchParams = searchParams('cat');                                                                      
  const findCategory = await categoriesData.find(item => item.urlSearch === urlSearchParams);                               
  const getProductCategory = resultProductsFetchOperation.filter(item => item.category_id == findCategory.id);          
  return getProductCategory;
}

export { getCategoryFunc , categoriesData}
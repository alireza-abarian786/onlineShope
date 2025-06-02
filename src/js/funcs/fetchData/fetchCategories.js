import { searchParams } from "../utils.js";
import { getProducts } from "./fetchProducts.js";
import { safeFetchWithCache } from "./FetchWithCache.js";

//todo======================================================== URL فیلتر کردن دسته بندی ها بر اساس
async function getCategories() {
  const data = await safeFetchWithCache("https://onlineshope.onrender.com/api/categories", { maxAge: 60 * 60 * 1000 });
  
  if (Array.isArray(data)) {
    return data;
  }

  return [];
}

//todo======================================================== URL فیلتر کردن دسته بندی ها بر اساس
const getCategoryFunc = async () => {
  const categoriesData = await getCategories()  
  const productsData = await getProducts()    
  const urlSearchParamsCategory = searchParams('cat'); 
  const findCategoryRequested = await categoriesData.find(item => item.urlSearch === urlSearchParamsCategory);                                 
  const getProductCategoryRequested = await productsData.filter(item => item.category_id == findCategoryRequested.id);            
  return getProductCategoryRequested;
}

export {getCategories , getCategoryFunc}
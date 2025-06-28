import { safeFetchWithCache } from "./FetchWithCache.js";

//!---------------------------------------------------------------------- function -------------------------------------------------------
//todo========================================================== دریافت لیست تمامی محصولات
const getProducts = async (showLoaderFlag = true) => {
  const data = await safeFetchWithCache("https://onlineshope.onrender.com/api/products" , { 
    maxAge: 60 * 60 * 1000,
    showLoaderFlag,
  });

  if (Array.isArray(data)) {
    return data;
  }

  return []
  
}

export { getProducts }
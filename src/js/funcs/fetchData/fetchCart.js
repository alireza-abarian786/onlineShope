import { setLocalStorage } from "../storage.js";
import { hideLoader, modalAuthorized } from "../utils.js";

let cartCache = null;
let cartCacheTime = null;
//todo========================================================== 🛒 دریافت اطلاعات سبد خرید
async function getCartData() {
  try {
    const now = Date.now();
    if (cartCache && cartCacheTime && now - cartCacheTime < 5000) {
      return cartCache;
    }
  
    const response = await fetch("https://onlineshope.onrender.com/api/cart", { credentials: "include" });
  
    if (response.status === 401) {
      setLocalStorage("isAuthorized", false);
      modalAuthorized();
      return { products: [] };
    }

    if (!response.ok) {
      console.warn("⛔ دریافت سبد خرید ناموفق بود:", response.status);
      return { products: [] };
    }

    const data = await response.json();    
    const cartData = data && Array.isArray(data.products)
      ? data
      : { products: [] };
  
    cartCache = data;
    cartCacheTime = now;  

    return cartData;
    
  } catch (error) {
    hideLoader();
    console.error("Error in getCartData:", error);
    return { products: [] };
  }
}

function updateCartCache(newData) {  
  cartCache = newData;
  cartCacheTime = Date.now();
}

function clearCartCache() {
  cartCache = null;
  cartCacheTime = null;
}



export { getCartData , updateCartCache , clearCartCache}
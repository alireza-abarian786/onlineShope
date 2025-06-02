import { getLocalStorage } from "../storage.js";
import { showModal } from "../ui.js";

let markCache = null
let markCacheTime = null
//todo========================================================== دریافت لیست علاقه مندی های کاربر
async function getFavorites() {
  try {
    if (!(getLocalStorage('login').length) || getLocalStorage('isAuthorized') === false) return false;

    const now = Date.now()
    if (markCache && markCacheTime && now - markCacheTime < 5000) {
      return markCache
    }

    const response = await fetch("https://onlineshope.onrender.com/api/users/favorites", {
        credentials: 'include'
      }
    );
    
    if (!response.ok) {
      throw new Error("خطا در دریافت علاقه‌مندی‌ها");
    }
    
    const favoritesData =  await response.json()

    markCache = favoritesData
    markCacheTime = now

    return favoritesData;
    
  } catch (error) {
    console.error("Error in getFavorites:", error);
    if (getLocalStorage('isAuthorized') === false) return false;
    showModal("❌ خطا در دریافت علاقه‌مندی‌ها");
    return [];
  }
}


export { getFavorites }
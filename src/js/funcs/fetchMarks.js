import { getLocalStorage, getToken, setLocalStorage } from "./store/storage.js";
import { showModal } from "./store/ui.js";
import { hideLoader, modalAuthorized } from "./utils.js";

//todo========================================================== دریافت لیست علاقه مندی های کاربر
async function getFavorites() {
  try {
    const response = await fetch(
      "https://onlineshope.onrender.com/api/users/favorites",
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    
    if (response.status === 401) {
      modalAuthorized()
      setLocalStorage("isAuthorized" , false)
      return false;
    } else if (!response.ok) {
      throw new Error("خطا در دریافت علاقه‌مندی‌ها");
    }

    const favoritesData =  await response.json()
    setLocalStorage('markData' , favoritesData)
    hideLoader()
    
  } catch (error) {
    console.error("Error in getFavorites:", error);
    if (getLocalStorage('isAuthorized') === false) return false;
    showModal("❌ خطا در دریافت علاقه‌مندی‌ها");
    return [];
  }
}


export { getFavorites }
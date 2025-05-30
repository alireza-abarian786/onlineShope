//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { getLocalStorage, getToken, setLocalStorage } from "./storage.js";
import { showModal, updateArrowButtonColors, updateFavoritesUI } from "./ui.js";
import { hideLoader, modalAuthorized } from "../utils.js";
import { addToCartAndToggleButton } from "../boxProduct/addCartBtn.js";
import { addToFavorites } from "../boxProduct/bookMarkBtn.js";

//!---------------------------------------------------------------------- functions -------------------------------------------------------
//todo========================================================== دریافت لیست علاقه مندی های کاربر
export async function getFavorites() {
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

window.addEventListener("load" , () => {
  updateFavoritesUI()
  console.log('box');
})

//!---------------------------------------------------------------------- binding -------------------------------------------------------
window.addToCartAndToggleButton = addToCartAndToggleButton;
window.updateArrowButtonColors = updateArrowButtonColors;
window.addToFavorites = addToFavorites;
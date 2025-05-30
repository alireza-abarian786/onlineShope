import { getLocalStorage, getToken, setLocalStorage } from "../store/storage.js";
import { showModal, updateFavoritesUI } from "../store/ui.js";
import { hideLoader, modalAuthorized, showAlertLogin, showLoader } from "../utils.js";

//!---------------------------------------------------------------------- function -------------------------------------------------------
// //todo========================================================== افزودن محصول به علاقه مندی ها
const addToFavorites = async (productId) => {
  try {
    if (!(await showAlertLogin())) return false;
    if (getLocalStorage('isAuthorized') === false) return modalAuthorized()

    showLoader();
    const markList = await getLocalStorage('markData')    
    const checkedMark = markList.favorites.some((mark) => mark === productId);    

    if (!checkedMark) {
      const response = await fetch(
        "https://onlineshope.onrender.com/api/users/favorites/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({ productId }),
        }
      );

      hideLoader();
      if (!response.ok) throw new Error("خطا در افزودن به علاقه‌مندی‌ها");
      const favoritesData = await response.json()
      setLocalStorage('markData' , favoritesData)
      showModal("✅ محصول به علاقه‌مندی‌ها اضافه شد");
      updateFavoritesUI();      

    } else {
      removeFromFavorites(productId);
    }
  } catch (error) {
    hideLoader();
    console.error("Error in addToFavorites:", error);
    showModal("❌ خطا در افزودن به علاقه‌مندی‌ها");
  }
};

// //todo========================================================== حذف محصول از علاقه مندی ها
async function removeFromFavorites(productId) {
  try {
    if (!(await showAlertLogin())) return false;
    if (getLocalStorage('isAuthorized') === false) return modalAuthorized()

    showLoader();
    const response = await fetch(
      "https://onlineshope.onrender.com/api/users/favorites/remove",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({ productId }),
      }
    );

    hideLoader();
    if (!response.ok) throw new Error("خطا در حذف از علاقه‌ مندی‌ ها");
    const favoritesData = await response.json()
    setLocalStorage('markData' , favoritesData)
    showModal("✅ محصول از علاقه‌ مندی‌ ها حذف شد");
    updateFavoritesUI();    

  } catch (error) {
    hideLoader();
    console.error("Error in removeFromFavorites:", error);
    showModal("❌ خطا در حذف از علاقه‌مندی‌ها");
  }
}

//!---------------------------------------------------------------------- export -------------------------------------------------------
export { removeFromFavorites , addToFavorites}
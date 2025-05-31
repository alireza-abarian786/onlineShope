import { positionOpenCart } from "../modalCart/positionCart.js";
import { getLocalStorage } from "../store/storage.js";
import { renderCartItems, shoppingCartModal } from "../store/ui.js";
import { hideLoader, showAlertLogin, showLoader } from "../utils.js";

//! -------------------------------------------------------------------functions-------------------------------------------------------------------------
//todo========================================================== 🛒 تابع نمایش یا عدم نمایش نوتیف سبد خرید
async function updateCartNotification() {
  const cartNotification = document.querySelector(".cart-notification");

  try {
    if (getLocalStorage("login").length === 0) return false;
    const resultCartFetchOperation = await getLocalStorage("cartData")

    if (resultCartFetchOperation.products) {
      if (cartNotification) {
        cartNotification.classList.toggle("is-notification", resultCartFetchOperation.products.length > 0);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

//todo=================================================================== تابع کلیک روی ایکون سبد خرید و باز کردن سبد خرید
function toggleCart() {
  const containerOpenCart = document.querySelector(".container-shopping-cart");
  const shoppingCartIcon = document.querySelector(".shopping-cart-icon");


  if (shoppingCartIcon) {
    shoppingCartIcon.addEventListener("click", async () => {
      try {
        if (!(await showAlertLogin())) return false;
        if (getLocalStorage('isAuthorized') === false) return modalAuthorized()
  
        showLoader();
        const getCartData = getLocalStorage("cartData")  
        
        containerOpenCart.style.display = "flex";
        shoppingCartModal(getCartData.products)
        renderCartItems(getCartData.products);
        positionOpenCart();
        hideLoader();
  
      } catch (error) {
        hideLoader();
        console.error("Error in Function toggleCart =>", error);
      }
    });
    
  }
}

//! -------------------------------------------------------------------exports-------------------------------------------------------------------------
export { updateCartNotification , toggleCart}
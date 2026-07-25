// src/js/funcs/header/cartBtn.js

import { positionOpenCart } from "../modalCart/positionCart.js";
import { updateQuantity } from "../modalCart/quantity.js";
import { removeAllFromCart } from "../modalCart/removeAllCart.js";
import { removeFromCart } from "../modalCart/removeItemCart.js";
import { getLocalStorage } from "../storage.js";
import { shoppingCartModal } from "../ui.js";
import { hideLoader, showAlertLogin, showLoader } from "../utils.js";

//! -------------------------------------------------------------------functions-------------------------------------------------------------------------
//todo========================================================== 🛒 تابع نمایش یا عدم نمایش نوتیف سبد خرید
async function updateCartNotification() {  
  const cartNotification = document.querySelector(".cart-notification");

  try {
    if (getLocalStorage("login").length === 0) return false;
    
    // ✅ دریافت دیتا از localStorage
    const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: [] };
    
    if (cartNotification) {
      cartNotification.classList.toggle("is-notification", cartData.products.length > 0);
    }
  } catch (error) {
    console.error(error);
  }
}

//todo=================================================================== تابع کلیک روی ایکون سبد خرید و باز کردن سبد خرید
function toggleCart() {
  const containerOpenCart = document.querySelector(".container-shopping-cart");
  const shoppingCartIcon = document.querySelector(".shopping-cart-icon");

  shoppingCartIcon.addEventListener("click", async () => {
    try {
      if (!(await showAlertLogin())) return false;

      showLoader();

      // ✅ دریافت دیتا از localStorage
      const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: [] };
      
      containerOpenCart.style.display = "flex";
      shoppingCartIcon.style.zIndex = '9999';
      shoppingCartModal(cartData.products);
      positionOpenCart();
      hideLoader();

    } catch (error) {
      hideLoader();
      console.error("Error in Function toggleCart =>", error);
    }
  });
}

//! -------------------------------------------------------------------bindings-------------------------------------------------------------------------
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.removeAllFromCart = removeAllFromCart;

//! -------------------------------------------------------------------exports-------------------------------------------------------------------------
export { updateCartNotification, toggleCart };
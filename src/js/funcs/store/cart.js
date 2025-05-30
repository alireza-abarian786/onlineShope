//! ---------------------------------------------------------------------imports-----------------------------------------------------------------------
import { updateQuantity } from "../modalCart/quantity.js";
import { removeFromCart } from "../modalCart/removeItemCart.js";
import { getLocalStorage, getToken, setLocalStorage } from "./storage.js";

//! ---------------------------------------------------------------------variables-----------------------------------------------------------------------
//todo========================================================== 🛒 دریافت اطلاعات سبد خرید
export const getCartData = async () => {
  try {
    if (!(getLocalStorage('login').length) || (getLocalStorage('isAuthorized') === false)) return false;

    const cartFetchOperation = await fetch(
      "https://onlineshope.onrender.com/api/cart",
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    
    const cartData = await cartFetchOperation.json();    
    setLocalStorage('cartData' , cartData);
    updateCartNotification()
    hideLoader();

  } catch (error) {
    hideLoader();
    console.error("Error in getCartData:", error);
    return null;
  }
};

//! -------------------------------------------------------------------bindings-------------------------------------------------------------------------
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
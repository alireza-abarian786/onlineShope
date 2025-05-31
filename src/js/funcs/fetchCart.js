import { updateCartNotification } from "./header/cartBtn.js";
import { getLocalStorage, getToken, setLocalStorage } from "./store/storage.js";
import { hideLoader } from "./utils.js";

//todo========================================================== 🛒 دریافت اطلاعات سبد خرید
const getCartData = async () => {
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

export { getCartData }
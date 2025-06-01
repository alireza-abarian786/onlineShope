import { updateCartNotification } from "./header/cartBtn.js";
import { getLocalStorage, getToken, setLocalStorage } from "./store/storage.js";
import { hideLoader, modalAuthorized } from "./utils.js";

//todo========================================================== 🛒 دریافت اطلاعات سبد خرید
const getCartData = async () => {
  try {
    if (!(getLocalStorage('login').length)) return false;

    const cartFetchOperation = await fetch(
      "https://onlineshope.onrender.com/api/cart",
      {
        headers: {
          // Authorization: `Bearer ${await getToken()}`,
          credentials: "include"
        },
      }
    );

    // if (cartFetchOperation.status === 401) {
    //   modalAuthorized()
    //   setLocalStorage("isAuthorized" , false)
    //   return false;
    // } else if (!cartFetchOperation.ok) {
    //   throw new Error("خطا در دریافت سبد خرید");
    // }
    
    console.log(cartFetchOperation);
    
    const cartData = await cartFetchOperation.json();  
    console.log(cartData);
      
    setLocalStorage('cartData' , cartData);
    updateCartNotification()
    hideLoader();
    return cartData;

  } catch (error) {
    hideLoader();
    console.error("Error in getCartData:", error);
    return null;
  }
};

export { getCartData }
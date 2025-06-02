import { getCartData } from "../fetchData/fetchCart.js";
import { updateCache } from "../fetchData/FetchWithCache.js";
import { updateCartNotification } from "../header/cartBtn.js";
import { getLocalStorage } from "../storage.js";
import { shoppingCartModal, showModal } from "../ui.js";
import { hideLoader, modalAuthorized, showAlertLogin, showLoader } from "../utils.js";

//!---------------------------------------------------------------------- function -------------------------------------------------------
//todo============================================================= تابع افزودن محصول به سبد خرید
async function addToCartAndToggleButton(id) {
  try {
    if (!(await showAlertLogin())) return false;
    if (getLocalStorage('isAuthorized') === false) return modalAuthorized()

    showLoader();
    const resultCartFetchOperation = await getCartData()
    const checkedCart = resultCartFetchOperation.products.some(
      (item) => item.product._id === id
    );
    
    if (!checkedCart) {
      const response = await fetch(`https://onlineshope.onrender.com/api/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            productId: id,
            quantity: 1,
          }),
        }
      );

      if (response.ok) {
        hideLoader();
        showModal(`✅🛒 محصول به سبد خرید شما اضافه شد`);
      } else {
        throw new Error("❌ مشکلی در افزودن محصول به سبد خرید وجود دارد");
      }

      const result = await response.json();
      updateCache('https://onlineshope.onrender.com/api/cart' , result.cart)
      shoppingCartModal(result.cart)
      updateCartNotification();

    } else {
      hideLoader();
      showModal(`✅🛒 این محصول از قبل در سبد خرید شما موجود است`);
    }
  } catch (error) {
    hideLoader();
    showModal("❌ مشکلی در افزودن محصول به سبد خرید وجود دارد");
    throw error;
  }
}

//!---------------------------------------------------------------------- export -------------------------------------------------------
export { addToCartAndToggleButton }
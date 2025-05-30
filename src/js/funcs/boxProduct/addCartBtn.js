import { updateCartNotification } from "../header/cartBtn.js";
import { getLocalStorage, getToken, setLocalStorage } from "../store/storage.js";
import { renderCartItems, showModal } from "../store/ui.js";
import { hideLoader, modalAuthorized, showAlertLogin, showLoader } from "../utils.js";

//!---------------------------------------------------------------------- function -------------------------------------------------------
//todo============================================================= تابع افزودن محصول به سبد خرید
async function addToCartAndToggleButton(id) {
  try {
    if (!(await showAlertLogin())) return false;
    if (getLocalStorage('isAuthorized') === false) return modalAuthorized()

    showLoader();
    const resultCartFetchOperation = await getLocalStorage('cartData')
    const checkedCart = resultCartFetchOperation.products.some(
      (productCart) => productCart.product._id === id
    );

    if (!checkedCart) {
      const response = await fetch(
        `https://onlineshope.onrender.com/api/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            productId: id,
            quantity: 1,
          }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        hideLoader();
        showModal(`✅🛒 محصول به سبد خرید شما اضافه شد`);
      } else {
        throw new Error("❌ مشکلی در افزودن محصول به سبد خرید وجود دارد");
      }

      renderCartItems(result.cart.products);
      setLocalStorage('cartData' , result.cart)
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
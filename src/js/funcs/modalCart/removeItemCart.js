import { updateCache } from "../fetchData/FetchWithCache.js";
import { updateCartNotification } from "../header/cartBtn.js";
import { boxPaymentHtmlTemplate, createBoxProductToPageCart, shoppingCartModal, showModal } from "../ui.js";
import { hideLoader, showAlertLogin, showLoader } from "../utils.js";
import { positionOpenCart } from "./positionCart.js";

//! -------------------------------------------------------------------function-------------------------------------------------------------------------
//todo=================================================================== تابع حذف محصول از سبد خرید
async function removeFromCart(id) {
  try {
    if (!(await showAlertLogin())) return false;
    showLoader();
    const removeFromCartOperation = await fetch(
      "https://onlineshope.onrender.com/api/cart/remove",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: id,
        }),
      }
    );

    if (!removeFromCartOperation.ok) {
      throw new Error("Failed to delete item from cart");
    }
    
    const resultRemoveFromCart = await removeFromCartOperation.json();
    updateCache('https://onlineshope.onrender.com/api/cart' , resultRemoveFromCart.cart)
    shoppingCartModal(resultRemoveFromCart.cart.products)
    createBoxProductToPageCart(resultRemoveFromCart.cart);
    boxPaymentHtmlTemplate(resultRemoveFromCart.cart);
    updateCartNotification()
    positionOpenCart()

    hideLoader();
    showModal(`❌🧺  محصول از سبد خرید شما حذف شد`);
  } catch (error) {
    console.error("Error in Function removeFromCart =>", error);
    hideLoader();
    showModal("خطا در حذف محصول از سبد خرید");
  }
}

//! -------------------------------------------------------------------exports-------------------------------------------------------------------------
export { removeFromCart }
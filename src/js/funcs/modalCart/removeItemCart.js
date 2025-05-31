import { updateCartNotification } from "../header/cartBtn.js";
import { getToken, setLocalStorage } from "../store/storage.js";
import { boxPaymentHtmlTemplate, createBoxProductToPageCart, renderCartItems, shoppingCartModal, showModal } from "../store/ui.js";
import { hideLoader, showAlertLogin, showLoader } from "../utils.js";
import { showAlertEmptyCart } from "./alertEmpty.js";

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
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          productId: id,
        }),
      }
    );

    const resultRemoveFromCartOperation = await removeFromCartOperation.json();
    if (!removeFromCartOperation.ok) {
      throw new Error(
        resultRemoveFromCartOperation.error || "Failed to delete item from cart"
      );
    }

    // renderCartItems(resultRemoveFromCartOperation.cart.products);
    shoppingCartModal(resultRemoveFromCartOperation.cart.products)
    createBoxProductToPageCart(resultRemoveFromCartOperation.cart.products);
    boxPaymentHtmlTemplate(resultRemoveFromCartOperation.cart);
    // showAlertEmptyCart(resultRemoveFromCartOperation.cart.products)
    setLocalStorage('cartData' , resultRemoveFromCartOperation.cart)
    updateCartNotification();    

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
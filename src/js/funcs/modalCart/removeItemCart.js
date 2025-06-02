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

    const resultRemoveFromCartOperation = await removeFromCartOperation.json();
    if (!removeFromCartOperation.ok) {
      throw new Error(
        resultRemoveFromCartOperation.error || "Failed to delete item from cart"
      );
    }

    shoppingCartModal(resultRemoveFromCartOperation.cart.products)
    createBoxProductToPageCart(resultRemoveFromCartOperation.cart);
    boxPaymentHtmlTemplate(resultRemoveFromCartOperation.cart);
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
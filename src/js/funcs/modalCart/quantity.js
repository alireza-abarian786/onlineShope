import { getToken, setLocalStorage } from "../storage.js";
import { boxPaymentHtmlTemplate, createBoxProductToPageCart, shoppingCartModal, showModal } from "../ui.js";
import { hideLoader, showAlertLogin, showLoader } from "../utils.js";
import { positionOpenCart } from "./positionCart.js";

//! -------------------------------------------------------------------functions-------------------------------------------------------------------------
//todo=================================================================== عملیات افزایش یا کاهش تعداد محصول در سبد خرید
let updateQuantity = async (operation, id, quantity) => {
  try {
    if (!(await showAlertLogin())) return false;
    showLoader();    

    quantity = Number(quantity);
    if (operation === "increase") {
      quantity += 1;
    } else if (operation === "decrease" && quantity > 1) {
      quantity -= 1;
    } else {
      hideLoader();
      showModal("⚠️ حداقل تعداد محصول 1 می‌باشد.");
      return;
    }

    const res = await fetch(
      "https://onlineshope.onrender.com/api/cart/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          productId: id,
          quantity: +quantity,
        }),
      }
    );
    
    const resultRes = await res.json();
    shoppingCartModal(resultRes.cart.products)
    createBoxProductToPageCart(resultRes.cart);
    boxPaymentHtmlTemplate(resultRes.cart);
    positionOpenCart()
    hideLoader();

  } catch (error) {
    hideLoader();
    console.error("Error in Function updateQuantity =>", error);
    showModal("❌ مشکل در به‌روزرسانی تعداد محصول");
  }
};

//!---------------------------------------------------------------------- exports -------------------------------------------------------
export {updateQuantity , }
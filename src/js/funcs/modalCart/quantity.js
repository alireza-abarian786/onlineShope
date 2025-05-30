import { getToken, setLocalStorage } from "../store/storage.js";
import { boxPaymentHtmlTemplate, createBoxProductToPageCart, renderCartItems, showModal } from "../store/ui.js";
import { hideLoader, showAlertLogin, showLoader } from "../utils.js";

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
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity: +quantity,
        }),
      }
    );
    const resultRes = await res.json();
    renderCartItems(resultRes.cart.products);
    createBoxProductToPageCart(resultRes.cart.products);
    boxPaymentHtmlTemplate(resultRes.cart);
    setLocalStorage('cartData' , resultRes.cart)
    hideLoader();
  } catch (error) {
    hideLoader();
    console.error("Error in Function updateQuantity =>", error);
    showModal("❌ مشکل در به‌روزرسانی تعداد محصول");
  }
};

//!---------------------------------------------------------------------- exports -------------------------------------------------------
export {updateQuantity , }
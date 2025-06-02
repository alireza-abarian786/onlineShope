import { updateCache } from "../fetchData/FetchWithCache.js";
import { updateCartNotification } from "../header/cartBtn.js";
import { boxPaymentHtmlTemplate, createBoxProductToPageCart, shoppingCartModal, showModal } from "../ui.js";
import { hideLoader, showAlertLogin, showLoader } from "../utils.js";
import { positionOpenCart } from "./positionCart.js";

//! -------------------------------------------------------------------function-------------------------------------------------------------------------
//todo=================================================================== تابع حذف همه موارد موجود از سبد خرید
async function removeAllFromCart() {
  try {
    if (!(await showAlertLogin())) return false;
    showLoader();    

    const response = await fetch(
      "https://onlineshope.onrender.com/api/cart/clear",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      }
    );

    if (!response.ok) {
      throw new Error(data.message || "مشکل در خالی کردن سبد خرید");
    }

    const data = await response.json();
    updateCache('https://onlineshope.onrender.com/api/cart' , data.cart)
    shoppingCartModal(data.cart.products)
    createBoxProductToPageCart(data.cart);
    boxPaymentHtmlTemplate(data.cart);
    updateCartNotification()
    positionOpenCart()
    hideLoader();
    showModal("✅ سبد خرید با موفقیت خالی شد!");

  } catch (error) {
    hideLoader();
    console.error("Error in Function removeAllFromCart =>", error);
    showModal("خطا در خالی کردن سبد خرید");
  }
}

//! -------------------------------------------------------------------exports-------------------------------------------------------------------------
export { removeAllFromCart }
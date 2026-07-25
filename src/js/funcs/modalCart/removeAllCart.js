// src/js/funcs/modalCart/removeAllCart.js

import { updateCartNotification } from "../header/cartBtn.js";
import { boxPaymentHtmlTemplate, createBoxProductToPageCart, shoppingCartModal, showModal } from "../ui.js";
import { hideLoader, showAlertLogin, showLoader } from "../utils.js";
import { positionOpenCart } from "./positionCart.js";
import { updateCartButtons } from "../boxProduct/addCartBtn.js";

//todo=================================================================== تابع حذف همه موارد موجود از سبد خرید
async function removeAllFromCart() {
  try {
    if (!(await showAlertLogin())) return false;
    showLoader();    

    // ✅ خالی کردن سبد خرید در localStorage
    const emptyCart = {
      products: [],
      totalWithoutDiscount: 0,
      totalWithDiscount: 0
    };
    
    localStorage.setItem('cartData', JSON.stringify(emptyCart));
    
    // ✅ بروزرسانی UI
    shoppingCartModal(emptyCart.products);
    createBoxProductToPageCart(emptyCart);
    boxPaymentHtmlTemplate(emptyCart);
    updateCartNotification();
    positionOpenCart();
    
    // ✅ آپدیت دکمه‌های سبد خرید در صفحه محصولات
    updateCartButtons();
    
    hideLoader();
    showModal("✅ سبد خرید با موفقیت خالی شد!");

  } catch (error) {
    hideLoader();
    console.error("Error in Function removeAllFromCart =>", error);
    showModal("خطا در خالی کردن سبد خرید");
  }
}

export { removeAllFromCart };
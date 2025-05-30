import { updateQuantity } from "./funcs/modalCart/quantity.js";
import { getLocalStorage } from "./funcs/store/storage.js";
import { boxPaymentHtmlTemplate, createBoxProductToPageCart } from "./funcs/store/ui.js";
import { hideLoader } from "./funcs/utils.js";

//! ---------------------------------------------------------------------imports-----------------------------------------------------------------------
const cartData = getLocalStorage("cartData")
createBoxProductToPageCart(cartData)
boxPaymentHtmlTemplate(cartData)
hideLoader()
//! -------------------------------------------------------------------binding-------------------------------------------------------------------------
window.updateQuantity = updateQuantity;

// window.removeAllFromCart = removeAllFromCart

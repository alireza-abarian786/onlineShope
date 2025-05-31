//! ---------------------------------------------------------------------imports-----------------------------------------------------------------------
import { getCartData } from "../fetchCart.js";
import { updateQuantity } from "../modalCart/quantity.js";
import { removeAllFromCart } from "../modalCart/removeAllCart.js";
import { removeFromCart } from "../modalCart/removeItemCart.js";

//! ---------------------------------------------------------------------variables-----------------------------------------------------------------------
// const clearCartAll = document.querySelector(".clear-cart-all");

getCartData()
// clearCartAll.addEventListener("click", removeAllFromCart);

console.log('cart');

//! -------------------------------------------------------------------bindings-------------------------------------------------------------------------
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.removeAllFromCart = removeAllFromCart

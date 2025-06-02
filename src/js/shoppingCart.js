import { getCartData } from "./funcs/fetchData/fetchCart.js";
import { boxPaymentHtmlTemplate, createBoxProductToPageCart } from "./funcs/ui.js";
import { hideLoader } from "./funcs/utils.js";

const cartData = await getCartData() 
//! ---------------------------------------------------------------------imports-----------------------------------------------------------------------
createBoxProductToPageCart(cartData)
boxPaymentHtmlTemplate(cartData)

hideLoader()

console.log('shoppingCart');

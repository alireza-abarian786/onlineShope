import { getCartData } from "./funcs/fetchData/fetchCart.js";
import { boxPaymentHtmlTemplate, createBoxProductToPageCart } from "./funcs/ui.js";
import { hideLoader, pagesInLoginState } from "./funcs/utils.js";

const cartData = await getCartData() 
//! ---------------------------------------------------------------------imports-----------------------------------------------------------------------
createBoxProductToPageCart(cartData)
boxPaymentHtmlTemplate(cartData)

hideLoader()
pagesInLoginState()

console.log('shoppingCart');

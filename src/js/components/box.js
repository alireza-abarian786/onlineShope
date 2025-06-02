//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { updateArrowButtonColors, updateFavoritesUI } from "../funcs/ui.js";
import { addToCartAndToggleButton } from "../funcs/boxProduct/addCartBtn.js";
import { addToFavorites } from "../funcs/boxProduct/bookMarkBtn.js";
//!---------------------------------------------------------------------- functions -------------------------------------------------------
updateFavoritesUI()
console.log('box');
//!---------------------------------------------------------------------- binding -------------------------------------------------------
window.addToCartAndToggleButton = addToCartAndToggleButton;
window.updateArrowButtonColors = updateArrowButtonColors;
window.addToFavorites = addToFavorites;
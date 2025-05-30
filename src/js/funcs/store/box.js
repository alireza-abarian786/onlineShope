//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { updateArrowButtonColors, updateFavoritesUI } from "./ui.js";
import { addToCartAndToggleButton } from "../boxProduct/addCartBtn.js";
import { addToFavorites } from "../boxProduct/bookMarkBtn.js";

//!---------------------------------------------------------------------- functions -------------------------------------------------------
window.addEventListener("load" , () => {
  updateFavoritesUI()
  console.log('box');
})

//!---------------------------------------------------------------------- binding -------------------------------------------------------
window.addToCartAndToggleButton = addToCartAndToggleButton;
window.updateArrowButtonColors = updateArrowButtonColors;
window.addToFavorites = addToFavorites;
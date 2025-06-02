//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { clickOnPagination } from "./funcs/categoryPage/pagination.js";
import { hideLoader, showLoader } from "../js/funcs/utils.js";
import { category } from "./funcs/categoryPage/showBoxes.js";
//!---------------------------------------------------------------------- imports -------------------------------------------------------
showLoader()
await category()
hideLoader()
console.log('category');
//!---------------------------------------------------------------------- binding -------------------------------------------------------
window.clickOnPagination = clickOnPagination
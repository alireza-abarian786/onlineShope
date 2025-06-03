//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { clickOnPagination } from "./funcs/categoryPage/pagination.js";
import { hideLoader, showLoader } from "../js/funcs/utils.js";
import { category } from "./funcs/categoryPage/showBoxes.js";
//!---------------------------------------------------------------------- imports -------------------------------------------------------
// showLoader()
category()
console.log('category');
//!---------------------------------------------------------------------- binding -------------------------------------------------------
window.clickOnPagination = clickOnPagination
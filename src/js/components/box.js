// src/js/box.js

import { updateArrowButtonColors, updateFavoritesUI } from "../funcs/ui.js";
import { addToCartAndToggleButton } from "../funcs/boxProduct/addCartBtn.js";
import { addToFavorites } from "../funcs/boxProduct/bookMarkBtn.js";
import { updateCartButtons } from "../funcs/boxProduct/addCartBtn.js";

//!---------------------------------------------------------------------- functions -------------------------------------------------------
updateFavoritesUI();

//!---------------------------------------------------------------------- کلیک روی کارت محصول
document.addEventListener('click', (e) => {
    const productBox = e.target.closest('.product-box, .product-card');
    if (!productBox) return;
    
    // اگه روی دکمه‌ها کلیک شده، نادیده بگیر
    if (e.target.closest('.add-cart') || 
        e.target.closest('.mark-contain') || 
        e.target.closest('.glide__arrow') ||
        e.target.closest('a')) {
        return;
    }
    
    const productId = productBox.dataset.id;
    if (productId) {
        window.location.href = `./product.html?id=${productId}`;
    }
});

//!---------------------------------------------------------------------- binding -------------------------------------------------------
window.addToCartAndToggleButton = addToCartAndToggleButton;
window.updateArrowButtonColors = updateArrowButtonColors;
window.addToFavorites = addToFavorites;

console.log('✅ Box script loaded successfully');
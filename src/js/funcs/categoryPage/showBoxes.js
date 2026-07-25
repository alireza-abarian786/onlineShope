// src/js/funcs/categoryPage/showBoxes.js

import { searchParams } from "../utils.js";
import { handlingCategoryPageFunctions } from "./searchProduct.js";
import fakeProducts from "../../../data/ProductData.js";

//todo======================================================== تابعی برای دریافت دسته‌بندی و نمایش باکس محصولات مرتبط
const category = async () => { 
    const urlSearchParams = searchParams('cat');
    const productsData = fakeProducts;
    
    let filteredProducts = [];
    
    switch (urlSearchParams) {
        case 'bookmarks': {
            const favoritesData = JSON.parse(localStorage.getItem('favoritesData')) || { items: [] };
            const favoriteIds = favoritesData.items.map(f => f.productId);
            filteredProducts = productsData.filter(product => favoriteIds.includes(product._id));
            break;
        }
        case 'discounts': {
            filteredProducts = productsData.filter(item => item.discount > 0);
            break;
        }
        case 'allProducts': {
            filteredProducts = [...productsData];
            break;
        }
        default: {
            filteredProducts = productsData.filter(item => item.category === urlSearchParams);
            break;
        }
    }
    
    await handlingCategoryPageFunctions(filteredProducts);
};

//todo======================================================== تغییرات کانتینر
if (window.innerWidth < '992') {
    const container = document.querySelector(".container");
    container.classList.add('container-fluid');
    container.classList.remove('container');
}

if (window.innerWidth < '768') {
    const container = document.querySelector(".container-fluid");
    container.classList.add('container');
    container.classList.remove('container-fluid');
}

export { category };
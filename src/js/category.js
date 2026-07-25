// src/js/category.js

import { clickOnPagination } from "./funcs/categoryPage/pagination.js";
import { hideLoader, showLoader, searchParams } from "./funcs/utils.js";
import { handlingCategoryPageFunctions } from "./funcs/categoryPage/searchProduct.js";
import fakeProducts from "../data/ProductData.js";
import fakeCategories from "../data/CategoriesData.js";
import { updateCartButtons } from "./funcs/boxProduct/addCartBtn.js";

//!---------------------------------------------------------------------- Variables -------------------------------------------------------
// ذخیره دیتا در localStorage
if (!localStorage.getItem('productsData')) {
    localStorage.setItem('productsData', JSON.stringify(fakeProducts));
}
if (!localStorage.getItem('categoriesData')) {
    localStorage.setItem('categoriesData', JSON.stringify(fakeCategories));
}

//!---------------------------------------------------------------------- تابع تنظیم تایتل صفحه
const setCategoryTitle = (categoryName) => {
    const titleElement = document.getElementById('categoryTitle');
    if (!titleElement) return;
    
    const categoryLabels = {
        'digital': 'دیجیتال',
        'phone': 'موبایل',
        'kitchen': 'آشپزخانه',
        'jewellery': 'طلا و جواهرات',
        'sport': 'ورزش و سفر',
        'stationery': 'لوازم تحریر',
        'tools': 'ابزارآلات',
        'mode': 'مد و پوشاک',
        'beauty': 'زیبایی و بهداشت',
        'car': 'خودرو و موتور',
        'bookmarks': 'علاقه‌مندی‌ها',
        'discounts': 'تخفیفات ویژه',
        'allProducts': 'همه محصولات'
    };
    
    const label = categoryLabels[categoryName] || 'دسته‌بندی';
    titleElement.textContent = label;
    
    // بروزرسانی تایتل صفحه
    document.title = `دیجی استور | ${label}`;
};

//!---------------------------------------------------------------------- function -------------------------------------------------------
const category = async () => {
    showLoader();
    
    const urlSearchParams = searchParams('cat');
    const productsData = fakeProducts;
    
    // ✅ تنظیم تایتل
    setCategoryTitle(urlSearchParams);
    
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
    
    // صفحه‌بندی و نمایش
    await handlingCategoryPageFunctions(filteredProducts);
    hideLoader();
};

// ... بقیه کدها ...

// در تابع category بعد از دریافت urlSearchParams:
const urlSearchParams = searchParams('cat');
setCategoryTitle(urlSearchParams);

//!---------------------------------------------------------------------- تغییرات کانتینر
if (window.innerWidth < 992) {
    const container = document.querySelector(".container");
    container.classList.add('container-fluid');
    container.classList.remove('container');
}

if (window.innerWidth < 768) {
    const container = document.querySelector(".container-fluid");
    container.classList.add('container');
    container.classList.remove('container-fluid');
}


//!---------------------------------------------------------------------- اجرا
category();

// ✅ آپدیت دکمه‌های سبد خرید بعد از رندر کامل
setTimeout(() => {
    updateCartButtons();
}, 500);

// ✅ گوش دادن به تغییرات سبد خرید در سایر تب‌ها
window.addEventListener('storage', (e) => {
    if (e.key === 'cartData') {
        updateCartButtons();
    }
});


//!---------------------------------------------------------------------- کلیک روی کارت محصول برای رفتن به صفحه جزئیات
document.addEventListener('click', (e) => {
    // پیدا کردن کارت محصول
    const productCard = e.target.closest('.product-card, .product-box');
    if (!productCard) return;
    
    // اگر روی دکمه‌ها یا لینک‌ها کلیک شده، نادیده بگیر
    if (e.target.closest('.add-cart') || 
        e.target.closest('.mark-contain') || 
        e.target.closest('.glide__arrow') ||
        e.target.closest('a')) {
        return;
    }
    
    const productId = productCard.dataset.id;
    if (productId) {
        window.location.href = `./product.html?id=${productId}`;
    }
});

//!---------------------------------------------------------------------- اضافه کردن cursor: pointer به کارت‌های محصول
const style = document.createElement('style');
style.textContent = `
    .product-card, .product-box {
        cursor: pointer;
    }
    .product-card:hover, .product-box:hover {
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    .product-link {
        display: block;
        width: 100%;
        height: 100%;
    }
`;
document.head.appendChild(style);

//!---------------------------------------------------------------------- binding -------------------------------------------------------
window.clickOnPagination = clickOnPagination;

console.log('✅ Category page loaded successfully');
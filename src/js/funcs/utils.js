// src/js/funcs/utils.js

import { getLocalStorage, setLocalStorage } from "./storage.js";
import { showModal } from "./ui.js";

// src/js/funcs/utils.js

//!---------------------------------------------------------------------- Variables -------------------------------------------------------
const loaderElem = document.querySelector(".loader-container");
let loaderTimeout = null;
const LOADER_TIMEOUT_MS = 3000; // ✅ کاهش به 3 ثانیه

//!---------------------------------------------------------------------- functions -------------------------------------------------------

//todo===================================== تابع نمایش لودر
function showLoader() {
    if (!loaderElem) return;
    loaderElem.classList.remove("hidden");
    
    if (loaderTimeout) {
        clearTimeout(loaderTimeout);
    }
    
    loaderTimeout = setTimeout(() => {
        loaderElem.classList.add("hidden");
        console.warn("⚠️ لودر به دلیل طولانی شدن مخفی شد");
    }, LOADER_TIMEOUT_MS);
}

//todo===================================== تابع مخفی کردن لودر
function hideLoader() {
    if (!loaderElem) return;
    loaderElem.classList.add("hidden");
    
    if (loaderTimeout) {
        clearTimeout(loaderTimeout);
        loaderTimeout = null;
    }
}


//todo============================================ تابع گرفتن پارامترهای URL
let searchParams = (key) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(key);
};

//todo============================================ تابع جستجو در آرایه
let getSearchProduct = (arr, property, value) => {
    if (!arr || !Array.isArray(arr)) return [];
    if (!value || !value.trim()) return arr;
    
    const searchValue = value.trim().toLowerCase();
    
    return arr.filter((product) => {
        const propValue = product[property];
        if (!propValue) return false;
        return propValue.toString().toLowerCase().includes(searchValue);
    });
};

//todo============================================ تابع نمایش هشدار لاگین
let showAlertLogin = () => {
    const login = getLocalStorage("login");
    
    if (!login || !login.length) {
        hideLoader();
        Swal.fire({
            title: "شما در سایت ثبت نام نکرده‌اید",
            text: "⁉️ آیا مایل به ورود در سایت هستید؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله، مایلم!",
            cancelButtonText: "لغو",
            confirmButtonColor: "#3b82f6",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "./login.html";
            }
        });
        return false;
    }
    return true;
};

//todo============================================ بررسی صفحات محافظت شده
const pagesInLoginState = () => {
    const url = window.location.pathname.toLowerCase();
    const login = getLocalStorage("login");
    
    if (login && login.length) return true;
    
    const protectedPages = [
        '/cart.html',
        '/dashboard.html',
        '/doshboard.html',
        '/activitymanagement.html',
    ];
    
    const isProtected = protectedPages.some(page => url.includes(page));
    
    if (isProtected) {
        setLocalStorage("redirectAfterLogin", window.location.href);
        
        Swal.fire({
            title: "دسترسی محدود",
            text: "⛔ برای دسترسی به این صفحه باید وارد حساب کاربری خود شوید",
            icon: "warning",
            confirmButtonText: "ورود به حساب",
            confirmButtonColor: "#3b82f6",
            allowOutsideClick: false,
        }).then(() => {
            window.location.href = "./login.html";
        });
        return false;
    }
    
    return true;
};

//todo============================================ بررسی ریدایرکت بعد از لاگین
const checkLoginRedirect = () => {
    const redirectUrl = getLocalStorage("redirectAfterLogin");
    const login = getLocalStorage("login");
    
    if (redirectUrl && login && login.length) {
        localStorage.removeItem("redirectAfterLogin");
        window.location.href = redirectUrl;
    }
};


// src/js/funcs/utils.js - اضافه کردن تابع normalize

// ... بقیه کدها ...

//todo============================================ تابع نرمال‌سازی متن (برای جستجو)
function normalizeText(text) {
    if (!text) return '';
    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')  // حذف فاصله‌های اضافی
        .replace(/[ء-ی]/g, function(char) {
            // ✅ تبدیل حروف مشابه فارسی
            const map = {
                'آ': 'ا', 'أ': 'ا', 'إ': 'ا',
                'ة': 'ه', 'ۀ': 'ه',
                'ی': 'ي', 'ئ': 'ي',
                'ك': 'ک'
            };
            return map[char] || char;
        });
}

//todo============================================ تابع جستجوی پیشرفته (برای استفاده در کل پروژه)
function advancedSearch(products, searchValue, fields = ['name', 'brand', 'category', 'description']) {
    if (!searchValue || !searchValue.trim()) return products;
    
    const normalizedSearch = normalizeText(searchValue);
    
    return products.filter(product => {
        // جستجو در فیلدهای مشخص شده
        for (const field of fields) {
            const value = product[field];
            if (value && typeof value === 'string') {
                if (normalizeText(value).includes(normalizedSearch)) {
                    return true;
                }
            }
        }
        
        // جستجو در tags
        if (product.tags && Array.isArray(product.tags)) {
            for (const tag of product.tags) {
                if (normalizeText(tag).includes(normalizedSearch)) {
                    return true;
                }
            }
        }
        
        // جستجو در features
        if (product.features && Array.isArray(product.features)) {
            for (const feature of product.features) {
                if (normalizeText(feature).includes(normalizedSearch)) {
                    return true;
                }
            }
        }
        
        return false;
    });
}


//!---------------------------------------------------------------------- exports -------------------------------------------------------
// ... exports ...
export {
    searchParams,
    getSearchProduct,
    showAlertLogin,
    showLoader,
    hideLoader,
    pagesInLoginState,
    checkLoginRedirect,
    normalizeText,
    advancedSearch
};

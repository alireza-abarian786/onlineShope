// src/js/funcs/categoryPage/searchProduct.js

import { changeShowBoxes } from "./changingStateBoxes.js";
import { setDropdownItem } from "./filterProduct.js";
import { handlePagination } from "./pagination.js";
import { hideLoader, searchParams } from "../utils.js";

// ✅ فقط یه کار ساده: حذف همه فاصله‌ها از هر دو طرف!
function removeAllSpaces(text) {
    return text.replace(/\s/g, '').toLowerCase();
}

// ✅ تابع جستجوی ساده و کاربردی
function searchProduct(product, searchText) {
    // حذف فاصله از جستجو
    const cleanSearch = removeAllSpaces(searchText);
    
    // حذف فاصله از نام محصول
    const cleanName = removeAllSpaces(product.name);
    
    // حذف فاصله از برند
    const cleanBrand = product.brand ? removeAllSpaces(product.brand) : '';
    
    // حذف فاصله از دسته‌بندی
    const cleanCategory = product.category ? removeAllSpaces(product.category) : '';
    
    // چک کردن: آیا جستجو در نام یا برند یا دسته‌بندی وجود داره؟
    return cleanName.includes(cleanSearch) || 
           cleanBrand.includes(cleanSearch) || 
           cleanCategory.includes(cleanSearch);
}

// ✅ تابع اصلی جستجو
const showSearchProducts = async (data) => {
    const boxSearchInput = document.querySelector("#categorySearch");
    if (!boxSearchInput) return;
    
    let searchTimeout = null;
    let originalData = data;

    boxSearchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.trim();
        
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        searchTimeout = setTimeout(() => {
            if (Array.isArray(originalData)) {
                let filteredResults = originalData;
                
                if (searchValue.length > 0) {
                    // ✅ فقط محصولاتی که جستجو توی اونا هست
                    filteredResults = originalData.filter(product => 
                        searchProduct(product, searchValue)
                    );
                }
                
                changeShowBoxes(filteredResults);
                
                const container = document.querySelector(".container-category__footer");
                if (filteredResults.length === 0 && searchValue.length > 0) {
                    container.innerHTML = `
                        <div class='alert alert-warning w-100 text-center mt-5 p-5'>
                            <i class="bi bi-search fs-1 d-block mb-3"></i>
                            <h5>هیچ محصولی با عبارت "${searchValue}" یافت نشد</h5>
                        </div>
                    `;
                }
            }
        }, 300);
    });
    
    // پاک کردن با ESC
    boxSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            boxSearchInput.value = '';
            boxSearchInput.dispatchEvent(new Event('input'));
            boxSearchInput.blur();
        }
    });
    
    // دکمه پاک کردن
    const searchContainer = boxSearchInput.closest('.box-search');
    if (searchContainer) {
        const oldBtn = searchContainer.querySelector('.btn-clear-search');
        if (oldBtn) oldBtn.remove();
        
        const clearBtn = document.createElement('button');
        clearBtn.className = 'btn-clear-search border-0 bg-transparent d-none';
        clearBtn.innerHTML = '<i class="bi bi-x-circle-fill text-secondary"></i>';
        clearBtn.style.cssText = 'position: absolute; left: 60px; top: 50%; transform: translateY(-50%); z-index: 10; cursor: pointer;';
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(clearBtn);
        
        boxSearchInput.addEventListener('input', () => {
            if (boxSearchInput.value.length > 0) {
                clearBtn.classList.remove('d-none');
            } else {
                clearBtn.classList.add('d-none');
            }
        });
        
        clearBtn.addEventListener('click', () => {
            boxSearchInput.value = '';
            boxSearchInput.dispatchEvent(new Event('input'));
            clearBtn.classList.add('d-none');
            boxSearchInput.focus();
        });
    }
};

const handlingCategoryPageFunctions = async (arrayProducts) => {
    const pagination = document.querySelector(".pagination");
    const urlSearchParams = searchParams('page');
    const showProductsAnyPage = await handlePagination(arrayProducts, pagination, 9, urlSearchParams);
    showSearchProducts(showProductsAnyPage);
    changeShowBoxes(showProductsAnyPage);
    setDropdownItem(showProductsAnyPage);
    hideLoader();
};

export { handlingCategoryPageFunctions, showSearchProducts };
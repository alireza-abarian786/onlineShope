// src/js/funcs/header/menu.js

import fakeCategories from "../../../data/CategoriesData.js";
import { fixPathsArray } from "../pathHelper.js";

//todo============================================== تنظیمات منو در سایز 992
function settingsMenuDropDown() {
  const boxDropDown = document.querySelector(".category-menu + div");
  const iconCategoryMenu = document.querySelector(".icon-category-menu");
  const categoryMenu = document.querySelector(".category-menu");

  if (window.innerWidth < 992 && boxDropDown) {
    boxDropDown.classList.remove("open-slide");
    iconCategoryMenu.classList.replace("icon-xl-window", "icon-lg-window");

    categoryMenu.addEventListener("click", () => {
      iconCategoryMenu.classList.toggle("icon-xl-window");
      iconCategoryMenu.classList.toggle("icon-lg-window");
    });
  }
}

// todo============================================== نمایش دسته‌بندی‌ها در منو
const fetchCategoriesForShowToMenu = () => {
    // ✅ استفاده از دیتای فیک
    const categoriesData = fakeCategories.filter(cat => cat.isActive !== false);
    const fixedCategories = fixPathsArray(categoriesData, ['icon']);
    
    const categoryWrapperXl = document.querySelector(".category-wrapper-xl");
    const categoryWrapperLg = document.querySelector(".category-wrapper-lg");
    
    if (!categoryWrapperXl && !categoryWrapperLg) {
        console.warn("⚠️ دسته‌بندی‌ها: المان‌های منو پیدا نشدند");
        return;
    }
    
    // ========== منوی دسکتاپ (XL) ==========
    if (categoryWrapperXl) {
        categoryWrapperXl.innerHTML = "";
        
        fixedCategories.forEach((item) => {
            categoryWrapperXl.insertAdjacentHTML(
                "beforeend",
                `
                <a href="./category.html?cat=${item.name}&page=1" 
                   class="category-menu-item" 
                   title="${item.description || item.label}">
                    <img src="${item.icon}" 
                         alt="${item.label}" 
                         width="24" 
                         height="24"
                         loading="lazy"
                         onerror="this.style.display='none'" />
                    <h6 class="shadow-sm">${item.label}</h6>
                    ${item.productCount ? `<span class="category-count">${item.productCount}</span>` : ''}
                </a>
                `
            );
        });
    }
    
    // ========== منوی موبایل (LG) ==========
    if (categoryWrapperLg) {
        categoryWrapperLg.innerHTML = "";
        
        categoryWrapperLg.insertAdjacentHTML(
            "beforeend",
            `
            <div class="mobile-menu-header">
                <span>دسته‌بندی محصولات</span>
                <button class="close-menu-btn" onclick="toggleMobileMenu()">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            `
        );
        
        fixedCategories.forEach((item) => {
            categoryWrapperLg.insertAdjacentHTML(
                "beforeend",
                `
                <a href="./category.html?cat=${item.name}&page=1" 
                   class="category-menu-item-mobile"
                   onclick="toggleMobileMenu()">
                    <img src="${item.icon}" 
                         alt="${item.label}" 
                         width="28" 
                         height="28"
                         loading="lazy"
                         onerror="this.style.display='none'" />
                    <div class="mobile-category-info">
                        <h6>${item.label}</h6>
                        <span class="english-name">${item.englishLabel || ''}</span>
                    </div>
                    <i class="bi bi-chevron-left"></i>
                </a>
                `
            );
        });
    }
};

export { settingsMenuDropDown, fetchCategoriesForShowToMenu };
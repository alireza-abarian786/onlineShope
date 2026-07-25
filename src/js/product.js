// src/js/product.js

import { hideLoader, showLoader, searchParams } from "./funcs/utils.js";
import { addToCartAndToggleButton } from "./funcs/boxProduct/addCartBtn.js";
import { addToFavorites } from "./funcs/boxProduct/bookMarkBtn.js";
import { updateCartButtons } from "./funcs/boxProduct/addCartBtn.js";
import { updateCartNotification, toggleCart } from "./funcs/header/cartBtn.js";
import { isLogin } from "./funcs/header/loginBtn.js";
import { closeCart } from "./funcs/header/closeCart.js";
import { fetchCategoriesForShowToMenu } from "./funcs/header/menu.js";
import fakeProducts from "../data/ProductData.js";
import { getLocalStorage } from "./funcs/storage.js";

//!---------------------------------------------------------------------- Variables
const productId = searchParams('id');
let currentProduct = null;

//!---------------------------------------------------------------------- DOM Elements
const loader = document.getElementById('productLoader');
const content = document.getElementById('productContent');
const mainImage = document.getElementById('productMainImage');
const thumbnailContainer = document.getElementById('thumbnailImages');
const productName = document.getElementById('productName');
const productRating = document.getElementById('productRating');
const productReviews = document.getElementById('productReviews');
const productStock = document.getElementById('productStock');
const originalPrice = document.getElementById('productOriginalPrice');
const discountPrice = document.getElementById('productDiscountPrice');
const discountBadge = document.getElementById('productDiscountBadge');
const productDescription = document.getElementById('productDescription');
const featuresList = document.getElementById('featuresList');
const addToCartBtn = document.getElementById('addToCartBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const breadcrumbCategory = document.getElementById('breadcrumbCategory');
const relatedProductsContainer = document.getElementById('relatedProducts');

//!---------------------------------------------------------------------- توابع هدر

// ✅ راه‌اندازی هدر
function initHeader() {
    // آپدیت وضعیت لاگین
    isLogin();
    
    // آپدیت نوتیفیکیشن سبد خرید
    updateCartNotification();
    
    // راه‌اندازی سبد خرید
    toggleCart();
    
    // بستن سبد خرید با کلیک خارج
    closeCart();
    
    // لود کردن منو
    fetchCategoriesForShowToMenu();
    
    // آپدیت دکمه‌های سبد خرید
    setTimeout(updateCartButtons, 300);
}

//!---------------------------------------------------------------------- توابع محصول

// تابع ایجاد ستاره‌ها
function createStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="bi bi-star-fill text-warning"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="bi bi-star-half text-warning"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="bi bi-star text-warning"></i>';
    }
    return stars;
}

// بارگذاری محصول
function loadProduct() {
    if (!productId) {
        window.location.href = './index.html';
        return;
    }

    currentProduct = fakeProducts.find(p => p._id === productId);
    
    if (!currentProduct) {
        Swal.fire({
            title: 'محصول یافت نشد',
            text: 'محصول مورد نظر شما در فروشگاه موجود نیست',
            icon: 'error',
            confirmButtonText: 'بازگشت به فروشگاه'
        }).then(() => {
            window.location.href = './index.html';
        });
        return;
    }

    renderProduct(currentProduct);
    renderRelatedProducts(currentProduct);
    
    loader.classList.add('d-none');
    content.classList.remove('d-none');
    hideLoader();
}

// رندر محصول
function renderProduct(product) {
    document.title = `دیجی استور | ${product.name}`;
    
    mainImage.src = product.images?.[0] || product.image || '/src/assets/images/placeholder.webp';
    mainImage.alt = product.name;
    
    thumbnailContainer.innerHTML = '';
    const images = product.images || [product.image];
    images.forEach(img => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.alt = product.name;
        thumb.className = 'thumbnail-img rounded-2';
        thumb.loading = 'lazy';
        thumb.onclick = () => {
            mainImage.src = img;
        };
        thumbnailContainer.appendChild(thumb);
    });
    
    productName.textContent = product.name;
    
    const rating = product.rating || 0;
    productRating.innerHTML = createStars(rating);
    productReviews.textContent = `(${product.reviews || 0} نظر)`;
    
    if (product.stock > 0) {
        productStock.textContent = 'موجود';
        productStock.className = 'badge bg-success';
    } else {
        productStock.textContent = 'ناموجود';
        productStock.className = 'badge bg-danger';
    }
    
    if (product.discount > 0) {
        const finalPrice = Math.round(product.price - (product.price * product.discount / 100));
        originalPrice.textContent = `${product.price.toLocaleString()} تومان`;
        originalPrice.className = 'text-decoration-line-through text-muted';
        discountPrice.textContent = `${finalPrice.toLocaleString()} تومان`;
        discountBadge.innerHTML = `<span class="badge bg-danger">${product.discount}% تخفیف</span>`;
        discountBadge.className = 'mt-2';
    } else {
        originalPrice.textContent = '';
        discountPrice.textContent = `${product.price.toLocaleString()} تومان`;
        discountBadge.innerHTML = '';
    }
    
    productDescription.textContent = product.description || 'توضیحاتی برای این محصول موجود نیست';
    
    featuresList.innerHTML = '';
    if (product.features && product.features.length > 0) {
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.className = 'mb-2';
            li.innerHTML = `<i class="bi bi-check-circle-fill text-success me-2"></i> ${feature}`;
            featuresList.appendChild(li);
        });
    } else {
        featuresList.innerHTML = '<li class="text-muted">ویژگی خاصی برای این محصول ثبت نشده است</li>';
    }
    
    // بروزرسانی دکمه سبد خرید
    const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: [] };
    const isInCart = cartData.products.some(item => item.product._id === product._id);
    
    if (isInCart) {
        addToCartBtn.className = 'btn btn-warning btn-lg flex-grow-1';
        addToCartBtn.innerHTML = '<i class="bi bi-check-lg"></i> در سبد خرید';
    } else {
        addToCartBtn.className = 'btn btn-success btn-lg flex-grow-1';
        addToCartBtn.innerHTML = '<i class="bi bi-cart-plus"></i> اضافه به سبد خرید';
    }
    
    // دکمه علاقه‌مندی
    const favoritesData = JSON.parse(localStorage.getItem('favoritesData')) || { items: [] };
    const isFavorite = favoritesData.items.some(item => item.productId === product._id);
    
    if (isFavorite) {
        favoriteBtn.className = 'btn btn-danger btn-lg';
        favoriteBtn.innerHTML = '<i class="bi bi-heart-fill"></i>';
    } else {
        favoriteBtn.className = 'btn btn-outline-danger btn-lg';
        favoriteBtn.innerHTML = '<i class="bi bi-heart"></i>';
    }
    
    const categoryLabels = {
        'digital': 'دیجیتال',
        'phone': 'موبایل',
        'kitchen': 'آشپزخانه',
        'jewellery': 'طلا و جواهرات',
        'sport': 'ورزش و سفر',
        'stationery': 'لوازم تحریر',
        'tools': 'ابزارآلات',
        'mode': 'مد و پوشاک'
    };
    breadcrumbCategory.textContent = categoryLabels[product.category] || product.category;
    breadcrumbCategory.onclick = () => {
        window.location.href = `./category.html?cat=${product.category}&page=1`;
    };
}

// محصولات مرتبط
function renderRelatedProducts(product) {
    relatedProductsContainer.innerHTML = '';
    
    const related = fakeProducts
        .filter(p => p.category === product.category && p._id !== product._id)
        .slice(0, 4);
    
    if (related.length === 0) {
        relatedProductsContainer.innerHTML = `
            <div class="col-12 text-center text-muted py-4">
                <i class="bi bi-box-seam fs-1 d-block mb-3"></i>
                <p>هیچ محصول مرتبطی یافت نشد</p>
            </div>
        `;
        return;
    }
    
    related.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-4 col-sm-6';
        
        const finalPrice = p.discount > 0 ? Math.round(p.price - (p.price * p.discount / 100)) : p.price;
        
        col.innerHTML = `
            <div class="card h-100 product-card-sm">
                <a href="./product.html?id=${p._id}" class="text-decoration-none">
                    <img src="${p.images?.[0] || p.image}" class="card-img-top" alt="${p.name}" loading="lazy" />
                </a>
                <div class="card-body text-center">
                    <h6 class="card-title fw-bold">
                        <a href="./product.html?id=${p._id}" class="text-decoration-none text-dark">${p.name}</a>
                    </h6>
                    <div class="card-price">
                        ${p.discount > 0 ? `
                            <span class="text-decoration-line-through text-muted small">${p.price.toLocaleString()} تومان</span><br>
                            <span class="text-danger fw-bold">${finalPrice.toLocaleString()} تومان</span>
                        ` : `
                            <span class="fw-bold">${p.price.toLocaleString()} تومان</span>
                        `}
                    </div>
                    <a href="./product.html?id=${p._id}" class="btn btn-primary btn-sm mt-2 w-100">مشاهده</a>
                </div>
            </div>
        `;
        
        relatedProductsContainer.appendChild(col);
    });
}

//!---------------------------------------------------------------------- Event Listeners

// دکمه سبد خرید
addToCartBtn.addEventListener('click', async () => {
    await addToCartAndToggleButton(productId);
    const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: [] };
    const isInCart = cartData.products.some(item => item.product._id === productId);
    
    if (isInCart) {
        addToCartBtn.className = 'btn btn-warning btn-lg flex-grow-1';
        addToCartBtn.innerHTML = '<i class="bi bi-check-lg"></i> در سبد خرید';
    }
    updateCartButtons();
    updateCartNotification();
});

// دکمه علاقه‌مندی
favoriteBtn.addEventListener('click', async () => {
    await addToFavorites(productId);
    const favoritesData = JSON.parse(localStorage.getItem('favoritesData')) || { items: [] };
    const isFavorite = favoritesData.items.some(item => item.productId === productId);
    
    if (isFavorite) {
        favoriteBtn.className = 'btn btn-danger btn-lg';
        favoriteBtn.innerHTML = '<i class="bi bi-heart-fill"></i>';
    } else {
        favoriteBtn.className = 'btn btn-outline-danger btn-lg';
        favoriteBtn.innerHTML = '<i class="bi bi-heart"></i>';
    }
});

//!---------------------------------------------------------------------- Init
document.addEventListener('DOMContentLoaded', () => {
    showLoader();
    
    // ✅ اول هدر رو راه‌اندازی کن
    initHeader();
    
    // ✅ بعد محصول رو لود کن
    loadProduct();
    
    // ✅ آپدیت دکمه‌های سبد خرید
    setTimeout(updateCartButtons, 500);
});

console.log('✅ Product page loaded successfully');
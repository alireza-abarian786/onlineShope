//!---------------------------------------------------------------------- imports -------------------------------------------------------
import './header.js'
import './funcs/store/cart.js'
import './funcs/store/box.js'

import { searchParams , getSearchProduct ,showLoader , hideLoader, fetchDataFromApi} from "./funcs/utils.js";
import { settingSliderGlide, settingSliderSwiper } from "./funcs/sliders.js";
import { createProductsTemplateHtml, getFavorites, resultProductsFetchOperation, updateFavoritesUI } from './funcs/store/box.js';
import { getToken } from './funcs/store/storage.js';
//!---------------------------------------------------------------------- Variables -------------------------------------------------------
const boxSearchInput = document.querySelector(".box-search-category")
// const boxSearchInput = document.querySelector(".box-search")
const dropdownCategory = document.querySelector(".dropdown-category")
const dropdownItem = document.querySelectorAll(".dropdown-item")
const iconView = document.querySelectorAll(".btn-outline-secondary")
const pagination = document.querySelector(".pagination")
const containerCategoryFooter = document.querySelector(".container-category__footer")

hideLoader()
//!---------------------------------------------------------------------- functions -------------------------------------------------------
const categoriesFetchingOperations = await fetchDataFromApi(`https://onlineshope.onrender.com/api/categories`);                               

//todo======================================================== URL فیلتر کردن دسته بندی ها بر اساس
const getCategoryFunc = async () => {
  const urlSearchParams = searchParams('cat');                                                                      
  const findCategory = await categoriesFetchingOperations.find(item => item.urlSearch === urlSearchParams);                               
  const getProductCategory = resultProductsFetchOperation.filter(item => item.category_id == findCategory.id);          
  return getProductCategory;
}

//todo======================================================== تابعی برای دریافت دسته‌ بندی و نمایش باکس محصولات مرتبط
const category = async () => { 
  const urlSearchParams = searchParams('cat');                                                                        
  const favoritesFetchingOperations = await getFavorites()                               
  const getProductCategory = await getCategoryFunc()                                                 
  
  switch (urlSearchParams) {
    case 'bookmarks':{
      const bookmarkedProducts = resultProductsFetchOperation.filter(item =>                                        
        favoritesFetchingOperations.some(mark => mark.product_id == item.id)
      );
      handlingCategoryPageFunctions([...bookmarkedProducts])
      break;
    }
    case 'discounts':{
      const discountedProducts = resultProductsFetchOperation.filter(item => item.discount)
      handlingCategoryPageFunctions([...discountedProducts])      
      break;
    }
    case 'allProducts':{
      handlingCategoryPageFunctions([...resultProductsFetchOperation])  
      break;
    }
    default:
      handlingCategoryPageFunctions([...getProductCategory])
      break;
  }
};
category()

//todo======================================================== category تابعی برای جستجوی محصولات داخل 
const handlingCategoryPageFunctions = async (arrayProducts) => {
  const urlSearchParams = searchParams('page');                                                                         
  const showProductsAnyPage = await handlePagination(arrayProducts , pagination , 9 , urlSearchParams)
  showSearchProducts(showProductsAnyPage);                                                      
  changeShowBoxes(showProductsAnyPage)                                                          
  setDropdownItem(showProductsAnyPage)                                                      
  hideLoader()
}

//todo========================================================== ساخت ستاره ها بر اساس امتیاز محصول
let createStars = async (rating) => {
  return Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) {
      return `<i class="bi bi-star-fill"></i>`;
    } else if (i - 1 < rating && i >= Math.floor(rating)) {
      let percentage = (rating % 1) * 100;
      return `<i class='bi bi-star-fill' style="clip-path: inset(0 ${
        100 - percentage
      }% 0 0 );"></i>`;
    } else {
      return `<i class="bi bi-star"></i>`;
    }
  }).join("");
};

//todo========================================================== category ایجاد باکس‌ های محصولات به صورت ردیفی داخل صفحه
let createProductsRowTemplateHtml = (arrCategory) => {
  document.querySelector(".container-category__footer").innerHTML = "";  

  if (arrCategory.length) {
    arrCategory.forEach(async (product) => {
      containerCategoryFooter.insertAdjacentHTML("beforeend",
        `
          <div class="product-card swiper-slide glide h-100 product-box" data-id=${product._id}>
            ${product.discount ? `<div class='box-discount'>${Math.floor(product.discount / 10000)}%</div>` : ""}
            <div class="product-image-container">
              <div class="swiper-container mySwiper5 h-100">

                <div class="not-mark mark-contain" onclick="addToFavorites('${product._id}')">
                  <svg class="icon-bookmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17.6 21.945a1.483 1.483 0 0 1-1.01-.4l-4.251-3.9a.5.5 0 0 0-.68 0l-4.25 3.9a1.5 1.5 0 0 1-2.516-1.1V4.57a2.5 2.5 0 0 1 2.5-2.5h9.214a2.5 2.5 0 0 1 2.5 2.5v15.872a1.481 1.481 0 0 1-.9 1.374a1.507 1.507 0 0 1-.607.129M12 16.51a1.5 1.5 0 0 1 1.018.395l4.251 3.9a.5.5 0 0 0 .839-.368V4.57a1.5 1.5 0 0 0-1.5-1.5H7.393a1.5 1.5 0 0 0-1.5 1.5v15.872a.5.5 0 0 0 .839.368l4.251-3.91A1.5 1.5 0 0 1 12 16.51"></path>
                  </svg>
                </div>

                <div class=' h-100'>
                  <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides h-100">
                      <li class="glide__slide"><img src="${product.images[0]}" alt="Slide 1" /></li>
                      <li class="glide__slide"><img src="${product.images[1]}" alt="Slide 2" /></li>
                      <li class="glide__slide"><img src="${product.images[2]}" alt="Slide 3" /></li>
                    </ul>
                    <div class="not-mark mark-contain">
                      <svg class="icon-bookmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17.6 21.945a1.483 1.483 0 0 1-1.01-.4l-4.251-3.9a.5.5 0 0 0-.68 0l-4.25 3.9a1.5 1.5 0 0 1-2.516-1.1V4.57a2.5 2.5 0 0 1 2.5-2.5h9.214a2.5 2.5 0 0 1 2.5 2.5v15.872a1.481 1.481 0 0 1-.9 1.374a1.507 1.507 0 0 1-.607.129M12 16.51a1.5 1.5 0 0 1 1.018.395l4.251 3.9a.5.5 0 0 0 .839-.368V4.57a1.5 1.5 0 0 0-1.5-1.5H7.393a1.5 1.5 0 0 0-1.5 1.5v15.872a.5.5 0 0 0 .839.368l4.251-3.91A1.5 1.5 0 0 1 12 16.51"/></svg>
                    </div>
                  </div>

                  <div class="next-img-box glide__arrows box-row-arrow" data-glide-el="controls">
                    <div class="glide__arrow--left" data-glide-dir="<" onclick="updateArrowButtonColors(event, '#2563eb', '#75757533')">
                      <svg class="pretive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24"><path fill="currentColor" d="M497.333 239.999H80.092l95.995-95.995l-22.627-22.627L18.837 256L153.46 390.623l22.627-22.627l-95.997-95.997h417.243z"/></svg>
                    </div>

                    <div class="glide__arrow--right" data-glide-dir=">" onclick="updateArrowButtonColors(event, '#2563eb', '#75757533')">
                      <svg class="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24"><path fill="currentColor" d="m359.873 121.377l-22.627 22.627l95.997 95.997H16v32.001h417.24l-95.994 95.994l22.627 22.627L494.498 256z" /></svg>
                    </div>
                  </div>
                </div>


              </div>    
            </div>

            <div class="product-info">
                <div class="product-title product-title-category">${
                  product.name
                }</div>
                <div class="product-rating">
                  ${await createStars(product.ratings)}
                  <span class='text-body'>(${product.ratings})</span>
                </div>
                <div class="product-description">${
                  product.description
                }</div>
                <div class="price-container">

                ${
                  !product.discount
                    ? `<span class="price text-bg-primary rounded fw-bold px-2 position-relative d-flex align-items-center">
                      تومان
                      <span class="ms-1 lead p-2 fs-6">${product.price.toLocaleString()}</span>
                      &nbsp&nbsp:قیمت محصول
                    </span>`
                    : `<span class="price price-before position-relative d-flex align-items-center">
                      تومان
                      <span class="ms-1 lead fs-6">${product.price.toLocaleString()}</span>
                      </span>
                      <span class="discount d-flex text-white p-2 fs-6">
                      تومان
                      <span class="ms-1">${(product.price - (product.price * (Math.floor(product.discount / 10000) / 100))).toLocaleString()}</span>
                      &nbsp&nbsp:قیمت با تخفیف
                    </span>`
                }

                </div>
                <div class="btn-cart-box buy-button" onclick="addToCartAndToggleButton('${product._id}')">اضافه به سبد خرید</div>
                <div class="product-features">
                    <div class="feature-item"><i class="fa fa-battery-full"></i> باتری 4000 میلی‌آمپر</div>
                    <div class="feature-item"><i class="fa fa-camera"></i> دوربین 64 مگاپیکسل</div>
                    <div class="feature-item"><i class="fa fa-mobile"></i> صفحه نمایش 6.2 اینچ</div>
                </div>
            </div>
          </div>
        `
      );

    });
    settingSliderSwiper()
    settingSliderGlide()
    updateFavoritesUI()

  } else {
    containerCategoryFooter.insertAdjacentHTML("beforeend",
        `<div class='alert alert-danger w-100 text-center'>:( کالای مورد نظر شما یافت نشد ):</div>`
      );
  }
};

//todo======================================================== category تابعی برای جستجوی محصولات داخل 
const showSearchProducts = async (data) => {
  boxSearchInput.addEventListener('input', (e) => {
    if (Array.isArray(data)) {
      const showProduct = getSearchProduct(data , 'name' , e.target.value.trim())
      showProduct.then(res => changeShowBoxes(res))  
    }
  })
}

//todo======================================================= و مرتب سازی باکس ها dropdown منو های active تغییر وضعیت
const setDropdownItem = async (getProductCategory) => {  
  dropdownItem.forEach((item) => {
    item.addEventListener('click', async (e) => {
      dropdownItem.forEach((item) => item.classList.remove('active'));
      e.target.classList.add('active')  
      dropdownCategory.textContent = e.target.textContent  
       
      const sorting = await filteringProducts(e.target.dataset.sorting , getProductCategory)
      changeShowBoxes(sorting) 
    })
  })
}

//todo======================================================= تابع مرتب سازی باکس ها بر اساس فیلتر های مشخص شده
let filteringProducts = async (sortingName , sortingProducts) => {
  let arrSorting = []  

  switch (sortingName) {
    case 'default': {
      arrSorting = sortingProducts
      break;
    }
    case 'cheapest': {
      arrSorting = sortingProducts.slice().sort((a , b) => a.price - b.price)
      break;
    }
    case 'expensive': {
      arrSorting = sortingProducts.slice().sort((a, b) => b.price - a.price)
      break;
    }
    case 'discount': {
      arrSorting = sortingProducts.slice().sort((a , b) => b.discount - a.discount)      
      break;
    }
    case 'score': {
      arrSorting = sortingProducts.slice().sort((a, b) => b.ratings - a.ratings)
      break;
    }
    default: {
      arrSorting = sortingProducts
      break;
    }
  }

  return arrSorting; 
}

//todo======================================================= تغییر حالت باکس ها
const changeShowBoxes = async (getProductCategory) => { 
  iconView.forEach((item) => {    
    if (item.classList.contains('btn-col') && item.classList.contains('active-view')) {
      createProductsTemplateHtml(containerCategoryFooter , getProductCategory)
    } else if (item.classList.contains('btn-row') && item.classList.contains('active-view')) {
      createProductsRowTemplateHtml(getProductCategory)
    }

    item.removeEventListener('click', handleItemClick);
    item.addEventListener('click', async (e) => {
      await handleItemClick(e , getProductCategory)
    })
  })
}

//todo======================================================= حذف کلاس اکتیو از ایکون های ویوی باکس ها
const removeActive = () => {document.querySelectorAll('.active-view').forEach((item) => item.classList.remove('active-view'));}

//todo======================================================= هندل کردن تغییرات لازم بعد از کلیک روی ایکون های ویو
const handleItemClick = async (e , getProductCategory ) => {
  removeActive()  

  if (e.target.classList.contains('btn-outline-secondary')) {
    e.target.classList.add('active-view')
    
  } else if (e.target.classList.contains('bi')) {
    e.target.classList.add('active-view')
    e.target.parentElement.classList.add('active-view')

  }
  
  if (e.target.classList.contains('btn-row') || e.target.parentElement.classList.contains('btn-row')) {
    createProductsRowTemplateHtml(getProductCategory)
  } else {
      createProductsTemplateHtml(containerCategoryFooter , getProductCategory)

  }

  settingSliderGlide();                                                                 
}

//todo======================================================= تابع تنظیم استایل کلید های جابجایی بین صفحات
const handlePagination = (array , element , showItemCountToPage , currentPage) => {    
  element.textContent = ''
  const endIndex = showItemCountToPage * currentPage
  const startIndex = endIndex - showItemCountToPage
  const itemsCount = Math.ceil(array.length / showItemCountToPage)
  const itemsShow = array.slice(startIndex, endIndex)

  for (let i = 1; i < itemsCount + 1; i++) {
    element.insertAdjacentHTML('beforeend', `
      <li class="page-item" style="cursor: pointer;">
      ${i === Number(currentPage) ? 
        `<a onclick="clickOnPagination('page' , ${i})" class="page-link rounded text-center active">${i}</a>`
        : 
        `<a onclick="clickOnPagination('page' , ${i})" class="page-link rounded text-center">${i}</a>`
      }
      </li>  
    `)
  }
  
  return itemsShow;
}

//todo======================================================= تابع جابجایی بین صفحات
const clickOnPagination = (param , value) => {  
  // showLoader()
  const urlSearchParams = new URL (location.href)
  urlSearchParams.searchParams.set(param , value)
  window.history.replaceState(null , "" , urlSearchParams.toString())
  category() 
}

window.clickOnPagination = clickOnPagination

//!---------------------------------------------------------------------- addEventListener -------------------------------------------------------
//todo======================================================== رویداد بارگذاری صفحه
window.addEventListener("DOMContentLoaded" , () => {
  category()

  console.log('window.innerWidth');
  
})
if (window.innerWidth < '992') {
  const container = document.querySelector(".container")
  container.classList.add('container-fluid')
  container.classList.remove('container')  
}
if (window.innerWidth < '768') {
  const container = document.querySelector(".container-fluid")
  container.classList.add('container')
  container.classList.remove('container-fluid')  
}
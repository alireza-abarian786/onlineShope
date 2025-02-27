import { searchParams , getSearchProduct , fetchDataFromApi} from "./funcs/utils.js";
import { settingSliderGlide } from "./funcs/sliders.js";
import {attachProductEventListeners} from "./funcs/store/box.js";
import { clickAddBookMark } from "./funcs/store/bookMarks.js";
import { initializeStatusMarks , initializeStatusCarts} from "./funcs/store/ui.js";
import { createBox , createBoxRow} from "./funcs/store/ui.js";
// -------------------------------------------------------------------------------------------

let boxSearchInput = document.querySelector(".box-search-category")
let dropdownCategory = document.querySelector(".dropdown-category")
let dropdownItem  = document.querySelectorAll(".dropdown-item")
let iconView  = document.querySelectorAll(".btn-outline-secondary")
// -------------------------------------------------------------------------------------------

//! رویداد بارگذاری صفحه
window.addEventListener("DOMContentLoaded" , () => {
  category()
})

//! URL فیلتر کردن دسته بندی ها بر اساس
let getCategoryFunc = async () => {
  let url = searchParams('cat');                                                                      //* URL دریافت مقدار دسته‌بندی از  
  let data = await fetchDataFromApi(`http://localhost:4000/categories`);                                                                 //* دریافت لیست دسنه بندی ها از سرور
  let findCategory = await data.find(item => item.urlSearch === url);                               //* URL یافتن دسته مرتبط با مقدار
  let Products = await fetchDataFromApi('http://localhost:4000/products');                         //* دریافت اطلاعات تمام محصولات
  let getProductCategory = Products.filter(item => item.category_id == findCategory.id);          //* فیلتر کردن محصولات مرتبط با دسته بندی
  return getProductCategory;
}


//! تابعی برای دریافت دسته‌ بندی و نمایش محصولات مرتبط
let category = async () => { 
  let url = searchParams('cat');                                                                      //* دریافت مقدار دسته‌بندی از URL    
  let Marks = await fetchDataFromApi('http://localhost:4000/bookmarks');                             //* دریافت لیست بوکمارک‌ها
  let Products = await fetchDataFromApi('http://localhost:4000/products');                          //* دریافت اطلاعات تمام محصولات
  let getProductCategory = await getCategoryFunc()                                                 //* محصولات فیلتر شده 

  if (url !== 'bookmarks') {                                                                      //* اگر دسته‌بندی بوکمارک نبود، محصولات دسته موردنظر را نمایش بده
    showSearchProducts(getProductCategory);                                                      //* category تابع سرچ محصولات صفحه
    changeShowBoxes(getProductCategory)                                                          //* category تابع نمایش محصولات صفحه
    setDropdownItem(getProductCategory)                                                        //* category صفحه Dropdown تابع تنظیمات 

  } else {                                                                                    //* اگر دسته‌بندی بوکمارک بود، فقط محصولات بوکمارک‌شده را نمایش بده      
    let bookmarkedProducts = Products.filter(item =>                                         //* فیلتر کردن بوکمارک ها
      Marks.some(mark => mark.product_id == item.id)
    );
    showSearchProducts(bookmarkedProducts);                                                 //* category تابع سرچ محصولات صفحه
    changeShowBoxes(bookmarkedProducts)                                                     //* category تابع نمایش محصولات صفحه
    setDropdownItem(bookmarkedProducts)                                                   //* category صفحه Dropdown تابع تنظیمات 
  }     

  initializeStatusMarks();                                                              //* 🔖 فراخوانی تابع بررسی وضعیت بوکمارک محصول
  initializeStatusCarts();                                                             //* 🔖 فراخوانی تابع بررسی وضعیت خرید محصول  
};

//! category تابعی برای جستجوی محصولات داخل 
let showSearchProducts = async (data) => {
  boxSearchInput.addEventListener('input', (e) => {
    if (Array.isArray(data)) {
      let showProduct = getSearchProduct(data , 'name' , e.target.value.trim())
      showProduct.then(res => changeShowBoxes(res))  
    }
  })
}

// ! و مرتب سازی باکس ها dropdown منو های active تغییر وضعیت
let setDropdownItem = async (getProductCategory) => {  
  dropdownItem.forEach((item) => {
    item.addEventListener('click', async (e) => {
      dropdownItem.forEach((item) => item.classList.remove('active'));
      e.target.classList.add('active')  
      dropdownCategory.textContent = e.target.textContent  
       
      let sorting = await filteringProducts(e.target.dataset.sorting , getProductCategory)
      changeShowBoxes(sorting) 
    })
  })
}

// ! تابع مرتب سازی باکس ها بر اساس فیلتر های مشخص شده
let filteringProducts = async (sortingName , sortingProducts) => {
  let arrSorting = []  

  switch (sortingName) {
    case 'defult': {
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
      arrSorting = sortingProducts.slice().sort((a , b) => a.discount - b.discount)      
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

// ! تغییر حالت باکس ها
let changeShowBoxes = async (getProductCategory) => { 
  iconView.forEach((item) => {    
    if (item.classList.contains('btn-col') && item.classList.contains('active-view')) {
      createBox(getProductCategory)
    } else if (item.classList.contains('btn-row') && item.classList.contains('active-view')) {
      createBoxRow(getProductCategory)
    }

    item.removeEventListener('click', handleItemClick);
    item.addEventListener('click', async (e) => {
      await handleItemClick(e , getProductCategory)
    })
  })
}

let removeActive = () => {document.querySelectorAll('.active-view').forEach((item) => item.classList.remove('active-view'));}

let handleItemClick = async (e , getProductCategory ) => {
  removeActive()  

  if (e.target.classList.contains('btn-outline-secondary')) {
    e.target.classList.add('active-view')
    
  } else if (e.target.classList.contains('bi')) {
    e.target.classList.add('active-view')
    e.target.parentElement.classList.add('active-view')

  }
  
  if (e.target.classList.contains('btn-row') || e.target.parentElement.classList.contains('btn-row')) {
    createBoxRow(getProductCategory)
  } else {
    createBox(getProductCategory)
  }

  attachProductEventListeners();                                                            //* دکمه سبد خرید محصول
  clickAddBookMark();                                                                      //* دکمه بوکمارک محصول
  settingSliderGlide();                                                                   //* اسلایدر عکس های محصول
  initializeStatusMarks();                                                               //* 🔖 فراخوانی تابع بررسی وضعیت بوکمارک محصول
  initializeStatusCarts();                                                              //* 🔖 فراخوانی تابع بررسی وضعیت خرید محصول
}
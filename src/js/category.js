import { searchParams , getSearchProduct , fetchDataFromApi} from "./funcs/utils.js";
import { settingSliderGlide } from "./funcs/sliders.js";
import {attachProductEventListeners} from "./funcs/store/box.js";
import { clickAddBookMark } from "./funcs/store/bookMarks.js";
import { initializeStatusMarks , initializeStatusCarts} from "./funcs/store/ui.js";
import { createBox , createBoxRow} from "./funcs/store/ui.js";
// -------------------------------------------------------------------------------------------

let boxSearchInput = document.querySelector(".box-search-category")
let dropdownCategory = document.querySelector(".dropdown-category")
let dropdownItem = document.querySelectorAll(".dropdown-item")
let iconView = document.querySelectorAll(".btn-outline-secondary")
let pagination = document.querySelector(".pagination")

// -------------------------------------------------------------------------------------------

//! رویداد بارگذاری صفحه
window.addEventListener("DOMContentLoaded" , () => {
  category()
})

//! URL فیلتر کردن دسته بندی ها بر اساس
let getCategoryFunc = async () => {
  let url = searchParams('cat');                                                                      //* URL دریافت مقدار دسته‌بندی از  
  let data = await fetchDataFromApi(`https://onlineshope.onrender.com/api/categories`);                                                                 //* دریافت لیست دسنه بندی ها از سرور
  let findCategory = await data.find(item => item.urlSearch === url);                               //* URL یافتن دسته مرتبط با مقدار
  let Products = await fetchDataFromApi('https://onlineshope.onrender.com/api/products');                         //* دریافت اطلاعات تمام محصولات
  let getProductCategory = Products.filter(item => item.category_id == findCategory.id);          //* فیلتر کردن محصولات مرتبط با دسته بندی
  return getProductCategory;
}

//! تابعی برای دریافت دسته‌ بندی و نمایش محصولات مرتبط
let category = async () => { 
  let url = searchParams('cat');                                                                      //* دریافت مقدار دسته‌بندی از URL    
  let urlPage = searchParams('page');                                                                      //* دریافت مقدار دسته‌بندی از URL    
  let Marks = await fetchDataFromApi('https://onlineshope.onrender.com/api/bookmarks');                             //* دریافت لیست بوکمارک‌ها
  let Products = await fetchDataFromApi('https://onlineshope.onrender.com/api/products');                          //* دریافت اطلاعات تمام محصولات
  let getProductCategory = await getCategoryFunc()                                                 //* محصولات فیلتر شده 
 
  // if (url !== 'bookmarks') {                                                                      //* اگر دسته‌بندی بوکمارک نبود، محصولات دسته موردنظر را نمایش بده    
  //   let showProductsAnyPage = await handlePagination([...getProductCategory] , pagination , 9 , urlPage)
  //   showSearchProducts(showProductsAnyPage);                                                      //* category تابع سرچ محصولات صفحه
  //   changeShowBoxes(showProductsAnyPage)                                                          //* category تابع نمایش محصولات صفحه
  //   setDropdownItem(showProductsAnyPage)                                                        //* category صفحه Dropdown تابع تنظیمات 
  // } else {                                                                                    //* اگر دسته‌بندی بوکمارک بود، فقط محصولات بوکمارک‌شده را نمایش بده      
  //   let bookmarkedProducts = Products.filter(item =>                                         //* فیلتر کردن بوکمارک ها
  //     Marks.some(mark => mark.product_id == item.id)
  //   );
  //   let showProductsAnyPage = await handlePagination([...bookmarkedProducts] , pagination , 9 , urlPage)
  //   showSearchProducts(showProductsAnyPage);                                                 //* category تابع سرچ محصولات صفحه
  //   changeShowBoxes(showProductsAnyPage)                                                     //* category تابع نمایش محصولات صفحه
  //   setDropdownItem(showProductsAnyPage)                                                   //* category صفحه Dropdown تابع تنظیمات 
  // }     

  switch (url) {
    case 'bookmarks':{
      let bookmarkedProducts = Products.filter(item =>                                         //* فیلتر کردن بوکمارک ها
        Marks.some(mark => mark.product_id == item.id)
      );
      let showProductsAnyPage = await handlePagination([...bookmarkedProducts] , pagination , 9 , urlPage)
      showSearchProducts(showProductsAnyPage);                                                 //* category تابع سرچ محصولات صفحه
      changeShowBoxes(showProductsAnyPage)                                                     //* category تابع نمایش محصولات صفحه
      setDropdownItem(showProductsAnyPage)                                                   //* category صفحه Dropdown تابع تنظیمات 
      break;
    }
    default:
      let showProductsAnyPage = await handlePagination([...getProductCategory] , pagination , 9 , urlPage)
      showSearchProducts(showProductsAnyPage);                                                      //* category تابع سرچ محصولات صفحه
      changeShowBoxes(showProductsAnyPage)                                                          //* category تابع نمایش محصولات صفحه
      setDropdownItem(showProductsAnyPage)                                                        //* category صفحه Dropdown تابع تنظیمات 
      break;
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

// ! حذف کلاس اکتیو از ایکون های ویوی باکس ها
let removeActive = () => {document.querySelectorAll('.active-view').forEach((item) => item.classList.remove('active-view'));}

// ! هندل کردن تغییرات لازم بعد از کلیک روی ایکون های ویو
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

// ! تابع تنظیم استایل کلید های جابجایی بین صفحات
const handlePagination = (array , element , showItemCountToPage , currentPage) => {    
  element.textContent = ''
  let endIndex = showItemCountToPage * currentPage
  let startIndex = endIndex - showItemCountToPage
  let itemsCount = Math.ceil(array.length / showItemCountToPage)
  let itemsShow = array.slice(startIndex, endIndex)

  for (let i = 1; i < itemsCount + 1; i++) {
    element.insertAdjacentHTML('beforeend', `
      <li class="page-item" style="cursor: pointer;">
      ${i === Number(currentPage) ? 
        `<a onclick="clickOnPaginatoin('page' , ${i})" class="page-link rounded text-center active">${i}</a>`
        : 
        `<a onclick="clickOnPaginatoin('page' , ${i})" class="page-link rounded text-center">${i}</a>`
      }
      </li>  
    `)
  }
  
  return itemsShow;
}

// ! تابع جابجایی بین صفحات
const clickOnPaginatoin = (param , value) => {  
  let urlPage = new URL (location.href)
  urlPage.searchParams.set(param , value)
  window.history.replaceState(null , "" , urlPage.toString())
  category() 
}

window.clickOnPaginatoin = clickOnPaginatoin

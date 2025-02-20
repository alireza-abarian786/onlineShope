import { searchParams , getSearchProduct} from "./funcs/utils.js";
import { settingSliderGlide } from "./funcs/sliders.js";
import { allBookmarks } from "./funcs/store/bookMarks.js";
import {clickButtonsProduct , allProduct} from "./funcs/store/box.js";
import { clickAddBookMark } from "./funcs/store/bookMarks.js";
import { initializeStatusMarks , initializeStatusCarts} from "./funcs/store/ui.js";
import { allCart } from "./funcs/store/cart.js";
import { createBox , createBoxRow} from "./funcs/store/ui.js";


let boxSerchInput = document.querySelector(".box-search-category")
let dropdownItem  = document.querySelectorAll(".dropdown-item")
let iconView  = document.querySelectorAll(".icon-view")

//! رویداد بارگذاری صفحه
window.addEventListener("DOMContentLoaded" , () => {
  category()
  showSearchProducts()
  setDropdownItem()
  changeShowBoxs()
})

let getAllCategory = async () => {
  let res = await fetch(`http://localhost:4000/categories`);
  let data = await res.json();

  return data;
}

let getCatgoryFunc = async () => {
  let url = searchParams('cat');                                              // دریافت مقدار دسته‌بندی از URL  
  let data = await getAllCategory()  
  let findCategory = data.find(item => item.urlSearch === url);            // یافتن دسته مرتبط با مقدار URL
  let Products = await allProduct()                                       // دریافت اطلاعات تمام محصولات
  let getProductCategory = Products.filter(item => item.category_id == findCategory.id); 

  return getProductCategory;
}


//! تابعی برای دریافت دسته‌ بندی و نمایش محصولات مرتبط
let category = async () => { 
  let url = searchParams('cat');                          // دریافت مقدار دسته‌بندی از URL    
  let Marks = await allBookmarks();                      // دریافت لیست بوکمارک‌ها
  let Carts = await allCart()                           // دریافت سبد خرید
  let getProductCategory = await getCatgoryFunc()

  if (url !== 'bookmarks') {  // اگر دسته‌بندی بوکمارک نبود، محصولات دسته موردنظر را نمایش بده
    showSearchProducts(getProductCategory);  
    createBox(getProductCategory);
    // filteringProducts(getProductCategory)

  } else {    // اگر دسته‌بندی بوکمارک بود، فقط محصولات بوکمارک‌شده را نمایش بده      
    let bookmarkedProducts = Products.filter(item => 
      Marks.some(mark => mark.product_id == item.id)
    );

    showSearchProducts(bookmarkedProducts);  
    createBox(bookmarkedProducts);
    // filteringProducts(bookmarkedProducts)
  }     

  // افزودن رویداد کلیک به دکمه‌ها و مدیریت بوکمارک‌ها
  clickButtonsProduct();
  clickAddBookMark();
  settingSliderGlide();
  initializeStatusMarks(Marks , '.icon-bookmark' , 'is-mark' , 'not-mark'); 
  initializeStatusCarts(Carts , '.add-cart > p' , 'text-bg-primary');       // 🔖 فراخوانی تابع بررسی وضعیت خرید محصول
};

//! category تابعی برای جستجوی محصولات داخل 
let showSearchProducts = async (data) => {
  boxSerchInput.addEventListener('input', (e) => {
    if (Array.isArray(data)) {
      let showProduct = getSearchProduct(data , 'name' , e.target.value.trim())
      showProduct.then(res => createBox(res))  
    }
  })
}

let setDropdownItem = async () => {

  dropdownItem.forEach((item) => {
    item.addEventListener('click', async (e) => {
      dropdownItem.forEach((item) => item.classList.remove('active'));
      let getProductCategory = await getCatgoryFunc()
      let sorting = await filteringProducts(e.target.dataset.sorting , getProductCategory)
      e.target.classList.add('active')      
      createBox(sorting)
    })
  })
}

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

let changeShowBoxs = async () => {
  let getProductCategory = await getCatgoryFunc()

  iconView.forEach((item) => {
    item.addEventListener('click', (e) => {
      iconView.forEach((item) => item.classList.remove('active-view'));      
      e.target.classList.add('active-view')
      createBoxRow(getProductCategory)
    })
  })
}


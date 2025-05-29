import './funcs/store/cart.js'
//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { getLocalStorage } from "./funcs/store/storage.js";
import { fetchDataFromApi } from "./funcs/utils.js";
//!---------------------------------------------------------------------- Variable -------------------------------------------------------
const boxDropDown = document.querySelector(".category-menu + div");
const categoryMenu = document.querySelector(".category-menu");
const iconCategoryMenu = document.querySelector(".icon-category-menu");
const loginBtnIcon = document.querySelector("#login svg");
const loginBtn = document.querySelector("#login");
const searchGlobalInputElem = document.querySelector("#search-global");
const loginBtnText = document.querySelector("#login span");

//!---------------------------------------------------------------------- function -------------------------------------------------------

window.addEventListener("DOMContentLoaded" , () => {
  settingsMenuDropDown()
  fetchCategoriesForShowToMenu()
  isLogin()
  
  

  //todo======================================== رویداد وارد کردن مقدار در سرچ
  if (searchGlobalInputElem) {
    searchGlobalInputElem.addEventListener("keyup" , (event) => searchGlobalHandler(event))
  }
})

//todo============================================== تنظیمات منو در سایز 992
function settingsMenuDropDown() {
  if (window.innerWidth < 992) {
    boxDropDown.classList.remove("open-slide");
    iconCategoryMenu.classList.replace("icon-xl-window", "icon-lg-window");
    
    categoryMenu.addEventListener("click", () => {
      iconCategoryMenu.classList.toggle("icon-xl-window");
      iconCategoryMenu.classList.toggle("icon-lg-window");
    });
  }
}


// todo============================================== سرچ سراسری محصولات
const searchGlobalHandler = async (event) => {
  const ulElemListSearch = document.querySelector(".box-search__ul-list");
  const searchValue = event.target.value.trim();

  if (searchValue) {
    ulElemListSearch.classList.add('show');
    
    ulElemListSearch.innerHTML = `
      <li class="w-100 p-3 text-center">
        <div class="mini-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </li>`;


    try {
      const getAllProduct = await fetchDataFromApi('https://onlineshope.onrender.com/api/products');
      const filterProducts = getAllProduct.filter(product =>
        product.name.toLowerCase().startsWith(searchValue.toLowerCase())
      );

      ulElemListSearch.innerHTML = '';

      if (filterProducts.length > 0) {
        filterProducts.forEach(item => {
          ulElemListSearch.insertAdjacentHTML('beforeend',
            `<li class="w-100 p-3 border-bottom">${item.name}</li>`
          );
        });
      } else {
        ulElemListSearch.innerHTML = '<li class="w-100 p-3 text-center text-danger bg-secondary bg-opacity-25">محصولی یافت نشد</li>';
      }

    } catch (err) {
      ulElemListSearch.innerHTML = '<li class="w-100 p-3 text-danger">خطا در دریافت محصولات</li>';
      console.error(err);
    }

  } else {
    ulElemListSearch.classList.remove('show');
    ulElemListSearch.innerHTML = '';
  }
}



// todo============================================== و نمایش در قسمت منو category دریافت
const fetchCategoriesForShowToMenu = async () => {  
  const categories = await fetchDataFromApi(
    "https://onlineshope.onrender.com/api/categories"
  );
  const categoryWrapperXl = document.querySelector(".category-wrapper-xl");
  const categoryWrapperLg = document.querySelector(".category-wrapper-lg");

  categories.forEach((item) => {
    categoryWrapperXl.insertAdjacentHTML(
      "beforeend",
      `
            <a href="./category.html?cat=${item.urlSearch}&page=1">
                <h6 class="shadow-sm">${item.name}</h6>
            </a>
        `
    );
  });

  categories.forEach((item) => {
    categoryWrapperLg.insertAdjacentHTML(
      "beforeend",
      `
            <a href="./category.html?cat=${item.urlSearch}&page=1">
                <h6 class="shadow-sm">${item.name}</h6>
            </a>
        `
    );
  });
};

// todo============================================== وضعیت کاربر و تغییر لینک ها و ظاهر آیکون لاگین
async function isLogin() {
  if (getLocalStorage("login").length !== 0) {
    loginBtnText.innerHTML = getLocalStorage("login");    
    if (!getLocalStorage('isAuthorized')) {
      loginBtnIcon.classList.add("text-bg-danger")
      loginBtnIcon.classList.remove("bg-white")
      loginBtn.setAttribute("href", "./login.html");
      
    } else {
      loginBtnIcon.classList.add("text-bg-success")
      loginBtnIcon.classList.remove("bg-white")
      loginBtn.setAttribute("href", "./doshboard.html");
      
    }    
    
  } else {
    loginBtnText.innerHTML = "ورود / عضویت";
    loginBtnIcon.classList.add("bg-white")
    loginBtn.setAttribute("href", "./login.html");
  }
}

//!---------------------------------------------------------------------- exports -------------------------------------------------------
export {isLogin}






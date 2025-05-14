//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { getLocalStorage } from "./funcs/store/storage.js";
import { fetchDataFromApi , showAlertLogin} from "./funcs/utils.js";
//!---------------------------------------------------------------------- Variable -------------------------------------------------------
const boxDropDown = document.querySelector(".category-menu + div");
const categoryMenu = document.querySelector(".category-menu");
const iconCategoryMenu = document.querySelector(".icon-category-menu");
const loginBtnIcon = document.querySelector("#login svg");
const loginBtn = document.querySelector("#login");
let loginBtnText = document.querySelector("#login span");
//!---------------------------------------------------------------------- function -------------------------------------------------------

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
  const ulElemListSearch = document.querySelector(".box-serch__ul-list")
  if (event.target.value.trim()) {
    const getAllProduct = await fetchDataFromApi('https://onlineshope.onrender.com/api/products')
    const filterProducts = getAllProduct.filter(product => product.name.startsWith(event.target.value))

    ulElemListSearch.classList.add('show')
    ulElemListSearch.innerHTML = ''
    filterProducts.forEach(item => { ulElemListSearch.insertAdjacentHTML('beforeend' , `<li class="w-100 p-3 border-bottom">${item.name}</li>`) })
    return true;
  }
  
  ulElemListSearch.classList.remove('show') 
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

// todo============================================== وضعیت لاگین و تغییر لینک ها
async function isLogin() {    
  //* به‌روزرسانی UI
  if (getLocalStorage("login").length !== 0) {
    loginBtnText.innerHTML = getLocalStorage("login"); //* نمایش نام کاربر
    loginBtnIcon.classList.add("text-bg-success")
    loginBtnIcon.classList.remove("bg-white")
    loginBtn.setAttribute("href", "./doshboard.html"); //* لینک به داشبورد
    
  } else {
    loginBtnText.innerHTML = "ورود / عضویت";
    loginBtnIcon.classList.add("bg-white")
    loginBtn.setAttribute("href", "./login.html");
    if (!(await showAlertLogin())) return false;

  }
}

//!---------------------------------------------------------------------- exports -------------------------------------------------------
export {settingsMenuDropDown , searchGlobalHandler , fetchCategoriesForShowToMenu , isLogin}






//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { getCartData } from "./fetchData/fetchCart.js";
import { updateCartNotification } from "./header/cartBtn.js";
import { getLocalStorage, getToken, setLocalStorage } from "./storage.js";
import { showModal } from "./ui.js";

//!---------------------------------------------------------------------- Variables -------------------------------------------------------
const loaderElem = document.querySelector(".loader-container");
let activeRequests = 0;
let loaderTimeout = null;
//!---------------------------------------------------------------------- functions -------------------------------------------------------

//todo===================================== دریافت قسمت سرچ لینک
let searchParams = (key) => {
  let urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(key);
};

//todo===================================== سرچ محصولات قسمت دسته بندی
let getSearchProduct = async (arr, property, value) => {
  // value = value.replace(/\s/g, '').replace('', ' ')  // حذف اسپیس
  let getProduct = await arr.filter((product) =>
    product[property].includes(value.trim())
  );
  return getProduct;
};

//todo===================================== فعال‌سازی تمام تولتیپ‌ها
function initTooltips() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  tooltipTriggerList.forEach((tooltipEl) => {
    new bootstrap.Tooltip(tooltipEl);
  });
}

//todo===================================== نمایش الرت وضعیت لاگین کاربر
let showAlertLogin = async () => {
  const login = await getLocalStorage("login");
  if (!login || !login.length) {
    hideLoader()
    Swal.fire({
      title: "شما در سایت ثبت نام نکرده اید",
      text: "⁉️ آیا مایل به ورود در سایت هستید",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، مایلم!",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "./login.html";
      }
    });
    return false;
  } else {
    return true;
  }
};

//todo============================================ تابع نمایش لودر
function showLoader() {
  console.log("Show Loader - activeRequests:", activeRequests);
  if (activeRequests === 0) { 
    loaderElem.classList.remove("hidden");
    loaderTimeout = setTimeout(() => {
      if (activeRequests > 0) { 
        loaderElem.classList.add("hidden");
        activeRequests = 0;
        console.warn("⚠️ لودر به دلیل طولانی شدن درخواست‌ها (بیش از 10 ثانیه) مخفی شد.");
        showModal("⚠️ درخواست‌ها طولانی شد، لطفاً کمی صبر کنید یا صفحه را رفرش کنید.");
      }
    }, 10000);
  }
  activeRequests++;
}

//todo============================================ تابع مخفی کردن لودر
function hideLoader() {
  console.log("Hide Loader - activeRequests:", activeRequests);
  activeRequests--;
  if (activeRequests <= 0) { 
    loaderElem.classList.add("hidden");
    activeRequests = 0;
    if (loaderTimeout) {
      clearTimeout(loaderTimeout);
      loaderTimeout = null;
    }
  }
}

//todo============================================ بررسی وضعیت توکن کاربر
const modalAuthorized = () => {
  Swal.fire({
    title: "نشست شما منقضی شده",
    text: "💫 لطفاً دوباره لاگین کنید",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "باشه",
    cancelButtonText: "لغو",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "./login.html";
    }
  });
};

//todo============================================ رفرش صفحه بعد از بازگشت با کلید بک مرورگر
const refreshedPage = () => {  
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    window.addEventListener("pageshow" , async () => {
      await getCartData()
      updateCartNotification()
    })
  }
}

//todo============================================ رفرش صفحه بعد از بازگشت با کلید بک مرورگر
const pagesInLoginState = () => {
  const url = window.location.pathname  
  console.log(!getLocalStorage('isAuthorized') || !getLocalStorage('login').length);
  
  if (!!getLocalStorage('isAuthorized') && !!getLocalStorage('login').length) return false;
  
  if (url === '/cart.html' || '/doshboard.html') {
    console.log(url);
    window.location.href = "./login.html";
    
  }
}


//!---------------------------------------------------------------------- exports -------------------------------------------------------
export {
  searchParams,
  getSearchProduct,
  initTooltips,
  showAlertLogin,
  showLoader,
  hideLoader,
  modalAuthorized,
  refreshedPage,
  pagesInLoginState,
};

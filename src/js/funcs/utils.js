//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { getLocalStorage } from "./store/storage.js";
//!---------------------------------------------------------------------- Variables -------------------------------------------------------
const loaderElem = document.querySelector(".loader-container");
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
  let userName = await getLocalStorage("login");       //* کاربری که لاگین کرده username
  if (!userName || !userName.length) {                //* اگر کاربر لاگین نکرده بود
    Swal.fire({
      //* نمایش پیغام مناسب
      title: "شما در سایت ثبت نام نکرده اید",
      text: "⁉️ آیا مایل به ثبت نام در سایت هستید",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، مایلم!",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "./login.html"; //* آدرس صفحه مقصد
      }
    });
    return false;
  } else {
    return true;
  }
};

//todo======================================== api دریافت اطلاعات از
const fetchDataFromApi = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from ${url}. Status: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

//todo============================================ تابع نمایش لودر
function showLoader() {
  loaderElem.classList.remove("hidden");
}

//todo============================================ تابع مخفی کردن لودر
function hideLoader() {
  loaderElem.classList.add("hidden");
}

// سیستم مدیریت خطای مرکزی
const ErrorHandler = {
  errors: [],
  
  logError(error, context = '') {
    const errorInfo = {
      message: error.message || 'خطای ناشناخته',
      context,
      timestamp: new Date().toISOString(),
      stack: error.stack
    };
    
    this.errors.push(errorInfo);
    
    // در محیط توسعه، خطا را در کنسول نمایش می‌دهیم
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${context}]`, error);
    }
    
    return errorInfo;
  },
  
  showErrorToUser(error, customMessage = '') {
    const message = customMessage || error.message || 'خطایی رخ داده است';
    showModal(`❌ ${message}`);
  },
  
  clearErrors() {
    this.errors = [];
  },
  
  getErrors() {
    return this.errors;
  }
};

// تابع کمکی برای مدیریت خطاهای API
const handleApiError = async (response, context = '') => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.error || `خطای HTTP: ${response.status}`);
    ErrorHandler.logError(error, context);
    throw error;
  }
  return response;
};

//!---------------------------------------------------------------------- exports -------------------------------------------------------
export {
  searchParams,
  getSearchProduct,
  initTooltips,
  showAlertLogin,
  fetchDataFromApi,
  showLoader,
  hideLoader,
  ErrorHandler,
  handleApiError,
};

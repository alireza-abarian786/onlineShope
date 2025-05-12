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
  const token = await getLocalStorage("token");       //* کاربری که لاگین کرده username
  if (!token || !token.length) {                //* اگر کاربر لاگین نکرده بود
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

// const fetchDataFromApi = async (url, options = {}) => {
//   try {
//     console.log('Fetching data from:', url);
    
//     const response = await fetch(url, {
//       method: options.method || 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers
//       },
//       body: options.body ? JSON.stringify(options.body) : undefined,
//       ...options
//     });
    
//     console.log('Response status:', response.status);
    
//     // برای خطاهای 4xx و 5xx
//     if (!response.ok) {
//       if (response.status === 404) {
//         console.error(`URL یافت نشد: ${url}`);
//         // سعی کنید یک مسیر دیگر را امتحان کنید
//         if (url.includes('/api/carts/')) {
//           const testUrl = url.replace(/\/api\/carts\/.*$/, '/api/carts/test');
//           console.log(`آزمایش مسیر جایگزین: ${testUrl}`);
//           const testResponse = await fetch(testUrl);
//           console.log('پاسخ مسیر تست:', testResponse.status);
//         }
//       }
//       throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

//todo============================================ تابع نمایش لودر
function showLoader() {
  loaderElem.classList.remove("hidden");
}

//todo============================================ تابع مخفی کردن لودر
function hideLoader() {
  loaderElem.classList.add("hidden");
}

//todo============================================ تابع مخفی کردن لودر







//!---------------------------------------------------------------------- exports -------------------------------------------------------
export {
  searchParams,
  getSearchProduct,
  initTooltips,
  showAlertLogin,
  fetchDataFromApi,
  showLoader,
  hideLoader,
};

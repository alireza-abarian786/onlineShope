//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { getCartData, updateCartNotification } from "./store/cart.js";
import { getLocalStorage, getToken, setLocalStorage } from "./store/storage.js";

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
  const token = await getLocalStorage("login");
  if (!token || !token.length) {
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

//todo============================================ دریافت اطلاعات و بررسی وضعیت لاگین کاربر
async function UserInformationGetFunction() {
  const fetchLoggedInUserInformation = await fetch(
    "https://onlineshope.onrender.com/api/user/me",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const resultFetchLoggedInUserInformation =
    await fetchLoggedInUserInformation.json();

  if (fetchLoggedInUserInformation.ok) {
    setLocalStorage("login", resultFetchLoggedInUserInformation.name);
  } else if (resultFetchLoggedInUserInformation.message === "Not authorized") {
    Swal.fire({
      title: "نشست شما منقضی شده",
      text: "💫 لطفاً دوباره وارد شوید",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "باشه",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "./login.html";
      }
    });
  } else {
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
  }
}

//todo============================================ بررسی وضعیت توکن کاربر
const modalAuthorized = () => {
  hideLoader();
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

//!---------------------------------------------------------------------- exports -------------------------------------------------------
export {
  searchParams,
  getSearchProduct,
  initTooltips,
  showAlertLogin,
  fetchDataFromApi,
  showLoader,
  hideLoader,
  UserInformationGetFunction,
  modalAuthorized,
  refreshedPage
};

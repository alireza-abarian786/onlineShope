import { getLocalStorage } from "./store/storage.js";
// ----------------------------------------------------------------

let loginBtnText = document.querySelector("#login span");
let loginBtnIcon = document.querySelector("#login svg");
let loginBtn = document.querySelector("#login");
const loaderElem = document.querySelector(".loader-container");
// ----------------------------------------------------------------

// ! دریافت قسمت سرچ لینک
let searchParams = (key) => {
  let urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(key);
};

// ! وضعیت لاگین و تغییر لینک ها
async function isLogin() {
  //* به‌روزرسانی UI
  if (getLocalStorage("login").length !== 0) {
    loginBtnText.innerHTML = getLocalStorage("login"); //* نمایش نام کاربر
    loginBtnIcon.classList.add("text-bg-success")
    loginBtn.setAttribute("href", "./doshboard.html"); //* لینک به داشبورد
    
  } else {
    loginBtnText.innerHTML = "ورود / عضویت";
    loginBtnIcon.classList.add("text-bg-white")
    loginBtn.setAttribute("href", "./login.html");
  }
}

// ! سرچ محصولات قسمت دسته بندی
let getSearchProduct = async (arr, property, value) => {
  // value = value.replace(/\s/g, '').replace('', ' ')  // حذف اسپیس

  let getProduct = await arr.filter((product) =>
    product[property].includes(value.trim())
  );
  return getProduct;
};

//! فعال‌سازی تمام تولتیپ‌ها
function initTooltips() {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  tooltipTriggerList.forEach((tooltipEl) => {
    new bootstrap.Tooltip(tooltipEl);
  });
}

// ! نمایش الرت وضعیت لاگین کاربر
let showAlertLogin = async () => {
  let userName = await getLocalStorage("login"); //* کاربری که لاگین کرده username
  if (!userName || !userName.length) {
    //* اگر کاربر لاگین نکرده بود
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

// ! api دریافت اطلاعات از
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

// ! و نمایش در قسمت منو category دریافت
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

const showSwal = async (title , text , icon, showButtons , buttons1, buttons2 , callback) => {
      Swal.fire({
        title,
        text,
        icon,
        showCancelButton: showButtons, // نمایش دکمه لغو
        confirmButtonText: buttons1, // متن دکمه تأیید
        cancelButtonText: buttons2,   // متن دکمه لغو
    }).then((result) => {
      if (result.isConfirmed) {
          callback(true); // اگر کاربر روی «بله» کلیک کرد
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          callback(false); // اگر کاربر روی «خیر» کلیک کرد
      }
  });
}

//! تابع نمایش لودر
function showLoader() {
  loaderElem.classList.remove("hidden");
}

//! تابع مخفی کردن لودر
function hideLoader() {
  loaderElem.classList.add("hidden");
}

export {
  searchParams,
  isLogin,
  getSearchProduct,
  initTooltips,
  showAlertLogin,
  fetchDataFromApi,
  fetchCategoriesForShowToMenu,
  showSwal,
  showLoader,
  hideLoader
};

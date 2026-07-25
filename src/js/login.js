// src/js/login.js

import {
  setLocalStorage,
  getLocalStorage,
} from "./funcs/storage.js";
import {
  showLoader,
  hideLoader,
} from "./funcs/utils.js";
import fakeUsers from "../data/UsersData.js";

//! ------------------------------------------------------------------------------------------- variables
const emailLogin = document.querySelector("#login-email");
const passwordLogin = document.querySelector("#login-password");
const btnLogin = document.querySelector(".login-btn");

const btnSignUp = document.querySelector(".register-btn");
const usernameSignUp = document.querySelector("#register-name");
const passwordSignUp = document.querySelector("#register-password");
const emailSignUp = document.querySelector("#register-email");
const phoneInput = document.querySelector("#register-phone");

let usernameText = document.querySelector(".username-text");
let passwordText = document.querySelector(".password-text");
let phoneText = document.querySelector(".phone-text");
let emailText = document.querySelector(".email-text");

let usernameValid = false;
let passwordValid = false;
let phoneValid = false;
let emailValid = false;

// ✅ ایجاد دیتای کاربران در localStorage اگر وجود نداشت
if (!localStorage.getItem('usersData')) {
    const defaultUsers = [
        {
            _id: "user_001",
            name: "مدیر سایت",
            email: "admin@example.com",
            password: "admin123",
            phone: "09123456789",
            favorites: [],
            balance: 2500000,
            isAdmin: true,
            createdAt: "۱۴۰۵/۰۱/۰۱",
        },
        {
            _id: "user_002",
            name: "کاربر تست",
            email: "test@example.com",
            password: "test123",
            phone: "09123456788",
            favorites: [],
            balance: 500000,
            isAdmin: false,
            createdAt: "۱۴۰۵/۰۲/۱۵",
        }
    ];
    localStorage.setItem('usersData', JSON.stringify(defaultUsers));
}

//! ------------------------------------------------------------------------------------------- addEventListener
window.addEventListener("DOMContentLoaded", () => {
  hideLoader();

  document.querySelectorAll(".form-control").forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.remove("invalid");
    });
    input.addEventListener("blur", function () {
      if (!this.checkValidity()) {
        this.parentElement.classList.add("invalid");
      }
    });
  });
});

//! ------------------------------------------------------------------------------------------- login
//todo================================================================ اطمینان از وارد خالی نبودن
btnLogin.addEventListener("click", async (e) => {
  e.preventDefault();  
  if (!!emailLogin.value && !!passwordLogin.value) {
    await loginOperationManagementFunction();
    clearInput();
  } else {
    hideLoader();
    Swal.fire({
      title: "ورود ناموفق",
      text: "لطفا نام کاربری و رمز عبور را وارد کنید",
      icon: "error",
      confirmButtonText: "تایید",
    });
  }
});

//todo================================================================ خالی کرد اینپوت های لاگین
function clearInput() {
  emailLogin.value = "";
  passwordLogin.value = "";
}

//todo================================================================ عملیات لاگین (بدون سرور)
const loginOperationManagementFunction = async () => {
  const email = emailLogin.value.trim();
  const password = passwordLogin.value.trim();

  showLoader();

  // ✅ دریافت کاربران از localStorage
  const users = JSON.parse(localStorage.getItem('usersData')) || [];
  
  // ✅ جستجوی کاربر
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    hideLoader();
    
    // ✅ ذخیره اطلاعات کاربر در localStorage
    setLocalStorage("login", user.name);
    setLocalStorage("userId", user._id);
    setLocalStorage("isAuthorized", true);
    setLocalStorage("userData", user);
    
    // ✅ ذخیره علاقه‌مندی‌ها
    const favoritesData = {
      items: user.favorites.map(productId => ({
        _id: "fav_" + Date.now() + Math.random(),
        productId: productId,
        addedAt: new Date().toLocaleDateString('fa-IR'),
      }))
    };
    localStorage.setItem('favoritesData', JSON.stringify(favoritesData));
    
    Swal.fire({
      title: "خوش آمدید",
      text: `✅ ${user.name} عزیز، به دیجی استور خوش آمدید`,
      icon: "success",
      confirmButtonText: "ورود به پنل کاربری",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "./doshboard.html";
      }
    });

  } else {
    hideLoader();
    Swal.fire({
      title: "ورود ناموفق",
      text: "ایمیل یا رمز عبور اشتباه است",
      icon: "error",
      confirmButtonText: "تایید",
    });
  }
};

//! ------------------------------------------------------------------------------------------- sign up
//todo================================================================ عملیات ثبت نام (بدون سرور)
btnSignUp.addEventListener("click", async (event) => {
  event.preventDefault();  
  
  if (usernameValid && passwordValid && phoneValid && emailValid) {
    showLoader();
    
    // ✅ دریافت کاربران موجود
    const users = JSON.parse(localStorage.getItem('usersData')) || [];
    
    // ✅ چک کردن تکراری نبودن ایمیل
    if (users.some(u => u.email === emailSignUp.value.trim())) {
      hideLoader();
      Swal.fire({
        title: "خطا در ثبت نام",
        text: "این ایمیل قبلاً ثبت نام کرده است",
        icon: "error",
        confirmButtonText: "تایید",
      });
      return;
    }
    
    // ✅ ایجاد کاربر جدید
    const newUser = {
      _id: "user_" + Date.now(),
      name: usernameSignUp.value.trim(),
      email: emailSignUp.value.trim(),
      password: passwordSignUp.value.trim(),
      phone: phoneInput.value.trim(),
      favorites: [],
      balance: 0,
      isAdmin: false,
      createdAt: new Date().toLocaleDateString('fa-IR'),
    };
    
    // ✅ ذخیره کاربر
    users.push(newUser);
    localStorage.setItem('usersData', JSON.stringify(users));
    
    // ✅ لاگین خودکار
    setLocalStorage("login", newUser.name);
    setLocalStorage("userId", newUser._id);
    setLocalStorage("isAuthorized", true);
    setLocalStorage("userData", newUser);
    
    // ✅ خالی کردن اینپوت‌ها
    clearInputSignUp();
    hideLoader();
    
    Swal.fire({
      title: "ثبت نام با موفقیت انجام شد",
      text: `✅ ${newUser.name} عزیز، به دیجی استور خوش آمدید`,
      icon: "success",
      confirmButtonText: "ورود به پنل کاربری",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "./doshboard.html";
      }
    });
    
  } else {
    hideLoader();
    Swal.fire({
      title: "خطا در اعتبارسنجی",
      text: "لطفاً تمام فیلدها را به درستی پر کنید",
      icon: "error",
      confirmButtonText: "تایید",
    });
  }
});

//todo================================================================ خالی کردن اینپوت ها
const clearInputSignUp = () => {
  usernameSignUp.value = "";
  passwordSignUp.value = "";
  phoneInput.value = "";
  emailSignUp.value = '';
}

//todo================================================================ نمایش پیام صحیح نبودن مقدار ورودی
const inValidText = (element, text) => {
  element.innerHTML = text;
};

//todo================================================================ نمایش پیام صحیح بودن مقدار ورودی
const validText = (element, text) => {
  element.innerHTML = text;
};

//todo================================================================ اعتبارسنجی نام کاربری
usernameSignUp.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  usernameValid = value.length >= 5;
  if (!usernameValid) {
    inValidText(usernameText, "نام کاربری باید حداقل 5 کاراکتر باشد");
  } else {
    validText(usernameText, "✅ نام کاربری معتبر است");
  }
});

//todo================================================================ اعتبارسنجی رمز عبور
passwordSignUp.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  passwordValid = value.length >= 6;
  if (!passwordValid) {
    inValidText(passwordText, "رمز عبور باید حداقل 6 کاراکتر باشد");
  } else {
    validText(passwordText, "✅ رمز عبور معتبر است");
  }
});

//todo================================================================ اعتبارسنجی شماره تلفن
phoneInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  const phoneRegex = /^09[0-9]{9}$/;
  phoneValid = phoneRegex.test(value);
  if (!phoneValid) {
    inValidText(phoneText, "شماره تلفن باید با 09 شروع شود و 11 رقم باشد");
  } else {
    validText(phoneText, "✅ شماره تلفن معتبر است");
  }
});

//todo================================================================ اعتبارسنجی ایمیل
emailSignUp.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailValid = emailRegex.test(value);
  if (!emailValid) {
    if (emailText) {
      inValidText(emailText, "لطفاً یک ایمیل معتبر وارد کنید");
    }
  } else {
    if (emailText) {
      validText(emailText, "✅ ایمیل معتبر است");
    }
  }
});
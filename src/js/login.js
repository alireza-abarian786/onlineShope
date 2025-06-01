import {
  setLocalStorage,
} from "./funcs/store/storage.js";
import {
  showLoader,
  hideLoader,
} from "./funcs/utils.js";

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
  showLoader();
  
  if (!!emailLogin.value && !!passwordLogin.value) {
    await loginOperationManagementFunction();
    clearInput();
    hideLoader();
  } else {
    hideLoader();
    Swal.fire({
      title: "ورود ناموفق",
      text: "لطفا نام کاربری و رمز عبور را وارد کنید",
      icon: "error",
      button: "تایید",
    });
  }
});

//todo================================================================ خالی کرد اینپوت های لاگین
function clearInput() {
  emailLogin.value = "";
  passwordLogin.value = "";
}

//todo================================================================ عملیات لاگین
const loginOperationManagementFunction = async () => {
  const userLoginInformation = {
    email: emailLogin.value.trim(),
    password: passwordLogin.value.trim(),
  };

  const loginOperation = await fetch("https://onlineshope.onrender.com/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(userLoginInformation),
    }
  );

  if (loginOperation.ok) {
    hideLoader();
    Swal.fire({
      title: "خوش آمدید",
      text: "⁉️میخواهید به پنل کاربری خود بروید",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "بله، برو!",
      cancelButtonText: "لغو",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "./doshboard.html";
      }
    });

    const resultLoginOperation = await loginOperation.json();  
    console.log(resultLoginOperation);
      
    // setLocalStorage("token", resultLoginOperation.token);
    setLocalStorage("isAuthorized", true);
    setLocalStorage("login", resultLoginOperation.username);

  } else if (loginOperation.status === 400) {
    hideLoader();
    Swal.fire({
      title: "ورود ناموفق",
      text: "نام کاربری یا رمز عبور اشتباه است",
      icon: "error",
      button: "تایید",
    });
  }
};

//! ------------------------------------------------------------------------------------------- sign up
//todo================================================================ عملیات ثبت نام
btnSignUp.addEventListener("click", async (event) => {
  event.preventDefault();  
  if (usernameValid && passwordValid && phoneValid && emailValid) {
    const newUser = {
      name: usernameSignUp.value.trim(),
      email: emailSignUp.value.trim(),
      password: passwordSignUp.value.trim(),
      phone: phoneInput.value.trim(),
    };
  
    try {
      const res = await fetch(
        "https://onlineshope.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(newUser),
        }
      );      
  
      const data = await res.json();      
      if (!res.ok) { throw new Error(data.message) }
  
      setLocalStorage("login", data.username);
      // setLocalStorage("token", data.token);
      setLocalStorage("isAuthorized", true);
      clearInputSignUp();
  
      hideLoader();
      Swal.fire({
        title: "ثبت نام شما با موفقیت انجام شد",
        text: "⁉️میخواهید به پنل کاربری خود بروید",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "بله، برو!",
        cancelButtonText: "لغو",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "./doshboard.html";
        }
      });
    } catch (error) {
      hideLoader();
      console.error("خطا در ارسال درخواست به سرور:", error);
      Swal.fire({
        title: "خطا در ثبت نام",
        text: error.message || "مشکلی در ثبت نام رخ داده است",
        icon: "error",
        button: "تایید",
      });
    }
  } else {
    hideLoader();
    Swal.fire({
      title: "خطا در اعتبارسنجی",
      text: "لطفاً تمام فیلدها را به درستی پر کنید",
      icon: "error",
      button: "تایید",
    });
  }
});

//todo================================================================ خالی کردن اینپوت ها
const clearInputSignUp = () => {
  usernameSignUp.value = "";
  passwordSignUp.value = "";
  phoneInput.value = "";
  emailSignUp.value ='';
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
    validText(usernameText, "نام کاربری معتبر است");
  }
});

//todo================================================================ اعتبارسنجی رمز عبور
passwordSignUp.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  passwordValid = value.length >= 6;
  if (!passwordValid) {
    inValidText(passwordText, "رمز عبور باید حداقل 6 کاراکتر باشد");
  } else {
    validText(passwordText, "رمز عبور معتبر است");
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
    validText(phoneText, "شماره تلفن معتبر است");
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
      validText(emailText, "ایمیل معتبر است");
    }
  }
});

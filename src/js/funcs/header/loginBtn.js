// src/js/funcs/header/loginBtn.js

import { getLocalStorage } from "../storage.js";

// todo============================================== وضعیت کاربر و تغییر لینک ها و ظاهر آیکون لاگین
async function isLogin() {
    const loginBtnIcon = document.querySelector("#login svg");
    const loginBtn = document.querySelector("#login");
    const loginBtnText = document.querySelector("#login span");
    
    if (loginBtnText && loginBtnIcon && loginBtn) {
        const userData = getLocalStorage("userData");
        const isAuthorized = getLocalStorage("isAuthorized");
        const login = getLocalStorage("login");
        
        if (login && login.length > 0 && userData) {
            // ✅ کاربر لاگین است
            loginBtnText.innerHTML = login;
            loginBtnIcon.classList.add("text-bg-success");
            loginBtnIcon.classList.remove("bg-white");
            
            // ✅ تغییر لینک به داشبورد
            loginBtn.setAttribute("href", "./doshboard.html");
            
            // ✅ اضافه کردن event listener برای جلوگیری از رفتن به لاگین
            loginBtn.addEventListener('click', (e) => {
                // اگر کاربر لاگین است، به داشبورد بره
                if (getLocalStorage("isAuthorized")) {
                    // لینک از قبل به داشبورد هست
                    return;
                }
                e.preventDefault();
                window.location.href = "./login.html";
            });
            
        } else {
            // ❌ کاربر لاگین نیست
            loginBtnText.innerHTML = "ورود / عضویت";
            loginBtnIcon.classList.add("bg-white");
            loginBtnIcon.classList.remove("text-bg-success", "text-bg-danger");
            loginBtn.setAttribute("href", "./login.html");
            
            // ✅ حذف event listener اضافی
            loginBtn.removeEventListener('click', null);
        }
    }
}

export { isLogin };
import { getLocalStorage } from "../storage.js";
import { showLoader } from "../utils.js";

// todo============================================== وضعیت کاربر و تغییر لینک ها و ظاهر آیکون لاگین
async function isLogin() {
    const loginBtnIcon = document.querySelector("#login svg");
    const loginBtn = document.querySelector("#login");
    const loginBtnText = document.querySelector("#login span");
    
    if (loginBtnText && loginBtnIcon && loginBtn) {
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
}

export { isLogin }
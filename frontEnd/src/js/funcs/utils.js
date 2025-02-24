import { getLocalStorage } from "./store/storage.js"
// ----------------------------------------------------------------

let loginBtnText = document.querySelector('#login span')
let loginBtn = document.querySelector('#login')
// ----------------------------------------------------------------



let searchParams = (key) => {
    let urlSearchParams = new URLSearchParams(window.location.search)
    return urlSearchParams.get(key)
}

function isLogin(username) {    
    if (username.length !== 0) {
        loginBtnText.innerHTML = username
        if (window.location.href === './index.html') {
            
            loginBtn.setAttribute('href' , './doshboard.html') 
        } else {
            loginBtn.setAttribute('href' , './doshboard.html') 
        }       
    } else {
        loginBtnText.innerHTML = "ورود / عضویت"
        loginBtn.setAttribute('href' , "./login.html")
    }
}

let getSearchProduct = async (arr , property , value) => {
    // value = value.replace(/\s/g, '').replace('', ' ')  // حذف اسپیس  

    let getProduct = await arr.filter(product => product[property].includes(value));    
    return getProduct
}

// فعال‌سازی تمام تولتیپ‌ها
function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipEl) => {
        new bootstrap.Tooltip(tooltipEl);
    });
}

let showAlertLogin = async () => {
    let userName = await getLocalStorage("login");                                                            //* کاربری که لاگین کرده username        
    if (!userName || !userName.length) {                                                              //* اگر کاربر لاگین نکرده بود
        Swal.fire({                                                                                  //* نمایش پیغام مناسب
            title: "شما در سایت ثبت نام نکرده اید",
            text: "⁉️ آیا مایل به ثبت نام در سایت هستید",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'بله، مایلم!',
            cancelButtonText: 'لغو'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = './login.html';                                              //* آدرس صفحه مقصد
            }
        }) 
        return false;

    } else {
        return true;
    }
}

const fetchDataFromApi = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};


export {searchParams , isLogin , getSearchProduct , initTooltips , showAlertLogin , fetchDataFromApi}
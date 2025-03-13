import { getLocalStorage } from "./store/storage.js"
import { fetchUserFromDatabase } from "./store/box.js"
// ----------------------------------------------------------------

let loginBtnText = document.querySelector('#login span')
let loginBtn = document.querySelector('#login')
// ----------------------------------------------------------------

// ! دریافت قسمت سرچ لینک
let searchParams = (key) => {
    let urlSearchParams = new URLSearchParams(window.location.search)
    return urlSearchParams.get(key)
}

// ! وضعیت لاگین و تغییر لینک ها
async function isLogin(username) {     
    if (username.length !== 0) {
        loginBtnText.innerHTML = username
        loginBtn.setAttribute('href' , './doshboard.html') 

        let user = await fetchUserFromDatabase();                                                //* دریافت اطلاعات کاربر انجام دهنده    
        if (!user) {                                                                            //* صحت سنجی دریافت درست اطلاعات
            console.error("اطلاعات کاربر یا محصول نامعتبر است.");
            return;
        }

        let a = await fetchDataFromApi("https://onlineshope.onrender.com/api/login")
        console.log(a);
        
    
    } else {
        loginBtnText.innerHTML = "ورود / عضویت"
        loginBtn.setAttribute('href' , "./login.html")
    }
}

// ! سرچ محصولات قسمت دسته بندی
let getSearchProduct = async (arr , property , value) => {
    // value = value.replace(/\s/g, '').replace('', ' ')  // حذف اسپیس  

    let getProduct = await arr.filter(product => product[property].includes(value.trim()));    
    return getProduct
}

//! فعال‌سازی تمام تولتیپ‌ها
function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipEl) => {
        new bootstrap.Tooltip(tooltipEl);
    });
}

// ! نمایش الرت وضعیت لاگین کاربر
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

// ! api دریافت اطلاعات از
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

// ! و نمایش در قسمت منو category دریافت 
const fetchCategoriesForShowToMenu = async () => {
    const categories = await fetchDataFromApi('https://onlineshope.onrender.com/api/categories')
    const categoryWrapper = document.querySelector("#category-wrapper")

    categories.forEach(item => {        
        categoryWrapper.insertAdjacentHTML("beforeend" , `
            <a href="./category.html?cat=${item.urlSearch}&page=1">
                <h6 class="shadow-sm">${item.name}</h6>
            </a>
        `)
    })
}

export {searchParams , isLogin , getSearchProduct , initTooltips , showAlertLogin , fetchDataFromApi , fetchCategoriesForShowToMenu}
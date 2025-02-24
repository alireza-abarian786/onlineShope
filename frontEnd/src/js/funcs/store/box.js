import { getLocalStorage} from "./storage.js";
import { addToCart, allCart } from "./cart.js";
import { changeBtnAfterAdd } from "./ui.js";
import { showAlertLogin } from "../utils.js";

// ! دریافت تمام محصولات از سرور
let allProduct = async () => {
    let res = await fetch(`http://localhost:4000/products`)
    let Products = await res.json()
    return Products;
}

// ! دریافت عنوان محصول
let titleProduct = async (element) => {
    let title;        
    let card = await element.closest('.swiper-slide')                                                       //* پیدا کردن کارت محصول از روی رویداد کلیک    
    if (card.querySelector("h6")) {                                                       //* اگر ساختار ستونی بود 
      title = await card.querySelector("h6").textContent;                                //* عنوان محصول
    } else {                                                                                             //* اگر ساختار ستونی بود 
      title = await card.querySelector(".product-title").textContent;                                   //* عنوان محصول
    }
    return title;
}

//! گرفتن اطلاعات مورد نظر از محصول
let getProductData = async (event) => {    
    let card = event.target.closest(".swiper-slide");                                                           //* پیدا کردن کارت محصول
    let product = await getProductDataDB(event)                                                                //* دریافت اطلاعات محصول از دیتابیس 
    let user = await getUserDataDB();                                                                         //* دریافت اطلاعات کاربر از دیتابیس 
    return {
        id: Date.now().toString(36),
        image: card.querySelector(".box-img img").src,
        name: card.querySelector(".box-discription h6").textContent,
        description: card.querySelector(".box-discription p").textContent,
        price: parseInt(card.querySelector(".box-price .price span").textContent),
        discount: card.querySelector(".box-price .discount span")
            ? parseInt(card.querySelector(".box-price .discount span").textContent)
            : 0,
        ratings: parseInt(card.querySelector(".box-discription span").textContent),
        user_id: user[0].id,
        product_id: product.id,
    };
};

//! تابع دریافت اطلاعات کاربر از دیتابیس
let getUserDataDB = async () => {
    try {
        let alertLogin = await showAlertLogin()
        if (!alertLogin) {
            return false;
        }
        let userName = await getLocalStorage("login");                                                            //* کاربری که لاگین کرده username        
        let res = await fetch(`http://localhost:4000/users`);                                        //* دریافت لیست یوزر ها از سرور
        if (!res.ok) {                                                                              //* اگر دریافت موفقیت امیز نبود
            throw new Error("Failed to fetch users data.");
        }
        let data = await res.json();
        let getUser = data.find((user) => user.name === userName);                               //* پیدا کردن مشخصات یوزر مورد نظر
        return getUser;                                                                         //* برگشت اطلاعات کاربری که نامش با نام کاربری مطابقت دارد

    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return null;
    }
};

// ! پیدا کردن و گرفتن اطلاعات محصول مورد نظر از سرور
let getProductDataDB = async (event) => {    
    let Products = await allProduct()                                                                   //* دریافت اطلاعات تمام محصولات
    let productNameTarget = await titleProduct(event.target)                                           //* دریافت عنوان محصول
    let findProductToDB = Products.find(product => product.name === productNameTarget)                //* پیدا کردن اطلاعات محصول مورد نظر 
    return findProductToDB;                                                                          //* برگرداندن محصول انتخاب شده
}

//! 🛒 تابع تغییر دکمه "افزودن به سبد خرید" با کلیک روی ان
async function toggleAddCart(event) {
    let alertLogin = await showAlertLogin()
    if (!alertLogin) {
        return false;
    }        
    let product = await getProductDataDB(event)                                                    //* دریافت اطلاعات محصول از سرور
    let data = await allCart()                                                                    //* دریافت اطلاعات سبد خرید
    let index = data.findIndex(item => item.id == product.id);                                   //* 🛒 بررسی وجود یا عدم وجود محصول در سبد خرید
    if (index === -1) {                                                                         //* 🛒 اگر محصول در سبد خریدد نبود، افزودن محصول به سبد خرید
        changeBtnAfterAdd(event.target)                                                            //* فراخوانی تابع تغییرات کلید سبد خرید محصول
    } 
}

//! تابع افزودن محصول به سبد خرید
async function handleAddToCart(event) { 
    let alertLogin = await showAlertLogin()
    if (!alertLogin) {
        return false;
    }          
    addToCart(event);                                                                          //* فراخوانی تابع ساخت و افزودن به سبد خرید
    toggleAddCart(event)                                                                      //* "فراخوانی تغییر دکمه "افزودن به سبد خرید
}

// ! ذخیره اطلاعات محصول بوکمارک شده
let getIDProductMarkedToJson = async (event) => {
    let productNameTarget = await titleProduct(event.target)                                      //* دریافت عنوان محصول
    let product = await getProductDataDB(event)                                                  //* دریافت اطلاعات محصول از سرور
    let user = await getUserDataDB();                                                           //* دریافت اطلاعات یوزر
    return {                                                                                   //* برگرداندن اطلاعات محصول بوکمارک شده
        id: Date.now().toString(36),
        product_name: productNameTarget,
        user_id: user.id,
        product_id: product.id,
    };
}

//! تابع مریوط به دکمه های باکس محصول
let clickButtonsProduct = async () => {                                                                                         
    document.querySelectorAll('.btn-cart-box').forEach(button => {                               //*🧺 دکمه افزودن به سبد خرید  
        button.addEventListener('click', handleAddToCart);
    });                                                                                    
    document.querySelectorAll('.glide__arrow--right').forEach(btn => {                           //*➡️ دکمه حرکت سمت راست تصویر محصول
        btn.addEventListener('click', () => {
            btn.children[0].style.color = '#2563eb';
            btn.previousElementSibling.children[0].style.color = '#75757533';
        });
    });                                                                                
    document.querySelectorAll('.glide__arrow--left').forEach(btn => {                           //*⬅️ دکمه حرکت سمت چپ تصویر محصول
        btn.addEventListener('click', () => {
            btn.children[0].style.color = '#2563eb';
            btn.nextElementSibling.children[0].style.color = '#75757533';
        });
    });
}

export {getProductData , handleAddToCart , titleProduct, toggleAddCart , getIDProductMarkedToJson , clickButtonsProduct , allProduct , getProductDataDB , getUserDataDB }
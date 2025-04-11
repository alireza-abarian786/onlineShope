import { getLocalStorage} from "./storage.js";
import { addToCart , fetchUserLogged} from "./cart.js";
import { changeBtnAfterAdd , updateArrowButtonColors} from "./ui.js";
import { showAlertLogin , fetchDataFromApi , showLoader , hideLoader} from "../utils.js";
// ----------------------------------------------------------------------------------

// ! دریافت عنوان محصول
let extractProductTitle = (element) => {    
    let card = element.closest('.swiper-slide');                                                              //* پیدا کردن کارت محصول از روی رویداد کلیک
    try {
        const columnTitle = card.querySelector("h6");
        const rowTitle = card.querySelector(".product-title");
        
        if (!card) {
            throw new Error("کارت محصول پیدا نشد");
        }        
        
        if (columnTitle) {
            return columnTitle.textContent;                                                                    //* ارسال عنوان محصول در صورتی که ساختار ستونی بود
        } else if (rowTitle) {
            return rowTitle.textContent;                                                                      //* ارسال عنوان محصول در صورتی که ساختار ردیفی بود
        } else {
            throw new Error("عنوان محصول پیدا نشد"); 
        }
        
    } catch (error) {
        console.error("خطا در استخراج عنوان محصول:", error.message);
        return null;
    }
}

//! گرفتن اطلاعات مورد نظر از محصول
let createProductObject = async (event) => {    
    let card = event.target.closest(".swiper-slide");                                                           //* پیدا کردن کارت محصول
    let product = await fetchProductFromDatabase(event)                                                        //* دریافت اطلاعات محصول از دیتابیس 
    let user = await fetchUserFromDatabase();                                                                 //* دریافت اطلاعات کاربر از دیتابیس 
    return {                                                                                                 //* ارسال اطلاعات مورد نظر از محصول
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
let fetchUserFromDatabase = async () => {
    try {
        // if (! await showAlertLogin()) return false;                                                                     //* بررسی لاگین کاربر
        let userName = await getLocalStorage("login");                                                                 //* کاربری که لاگین کرده username                
        let users = await fetchDataFromApi('https://onlineshope.onrender.com/api/users');                                            //* دریافت لیست یوزر ها از سرور                
        return users.find((user) => user.name === userName);                                                         //* پیدا کردن و ارسال مشخصات یوزر مورد نظر

    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return null;
    }
};

// ! پیدا کردن و گرفتن اطلاعات محصول مورد نظر از سرور
let fetchProductFromDatabase = async (event) => {    
    let Products = await fetchDataFromApi('https://onlineshope.onrender.com/api/products');                                        //* دریافت اطلاعات کل محصولات
    let productName = await extractProductTitle(event.target)                                                      //* دریافت عنوان محصول
    return Products.find(product => product.name === productName)                                                 //* پیدا کردن و ارسال اطلاعات محصول مورد نظر 
}

//! بررسی وجود محصول در سبد خرید
const isProductInCart = (product, cartItems) => cartItems.some(item => item.id === product.id);

//! 🛒 تغییر استایل دکمه سبد خرید محصول 
async function updateCartButtonState(event) {
    let product = await fetchProductFromDatabase(event)                                                           //* دریافت اطلاعات محصول از سرور
    let userLogged = await fetchUserLogged()
    if (userLogged) {
        let cartItems = await fetchDataFromApi(`https://onlineshope.onrender.com/api/carts/${userLogged._id}`);               //* دریافت لیست کل سبد خرید  
        if (!isProductInCart(product, cartItems.items)) {                                                                 //*🛒 اگر محصول در سبد خرید نبود، افزودن محصول
            await changeBtnAfterAdd(event.target)                                                                        //* تغییر استایل کلید سبد خرید محصول
        } 
    }
}

//! تابع افزودن محصول به سبد خرید
async function addToCartAndToggleButton(event) {  
    await addToCart(event);                                                                                   //* تابع افزودن به سبد خرید
    await updateCartButtonState(event)                                                                       //* تغییر استایل دکمه سبد خرید محصول 
}

//! تابع مریوط به دکمه های باکس محصول
let attachProductEventListeners = async () => {                                                                                         
    document.querySelectorAll('.btn-cart-box').forEach(button => {                                           //*🧺 کلید سبد خرید محصول 
        button.addEventListener('click', addToCartAndToggleButton);
    });                                                                                    
    document.querySelectorAll('.glide__arrow--right').forEach(btn => {                                       //*➡️ کلید حرکت سمت راست تصویر محصول
        btn.addEventListener('click', () => {
            updateArrowButtonColors(btn, '#2563eb', '#75757533');                                            //* تغییر استایل کلید جهت
        });
    });                                                                                
    document.querySelectorAll('.glide__arrow--left').forEach(btn => {                                        //*⬅️ کلید حرکت سمت چپ تصویر محصول
        btn.addEventListener('click', () => {
            updateArrowButtonColors(btn, '#2563eb', '#75757533');                                            //* تغییر استایل کلید جهت
        });
    });
}

export {createProductObject , addToCartAndToggleButton , extractProductTitle, updateCartButtonState , attachProductEventListeners , fetchProductFromDatabase , fetchUserFromDatabase }
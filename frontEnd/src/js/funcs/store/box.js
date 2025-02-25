import { getLocalStorage} from "./storage.js";
import { addToCart } from "./cart.js";
import { changeBtnAfterAdd , updateArrowButtonColors} from "./ui.js";
import { showAlertLogin , fetchDataFromApi} from "../utils.js";

// ! دریافت تمام محصولات از سرور
let fetchAllProducts = async () => {
    try {
        let res = await fetch(`http://localhost:4000/products`)
        if (!res.ok) throw new Error(`Server responded with status: ${res.status}`);
        return await res.json()
        
    } catch (error) {
        console.error("Error fetching products:" , error.message);
        return [];
    }
}

// ! دریافت عنوان محصول
let extractProductTitle = (element) => {
    let card = element.closest('.swiper-slide')                                                       //* پیدا کردن کارت محصول از روی رویداد کلیک    
    if (card.querySelector("h6")) {                                                       //* اگر ساختار ستونی بود 
      return card.querySelector("h6").textContent;                                //* عنوان محصول
    } else {                                                                                             //* اگر ساختار ستونی بود 
      return card.querySelector(".product-title").textContent;                                   //* عنوان محصول
    }
}

//! گرفتن اطلاعات مورد نظر از محصول
let createProductObject = async (event) => {    
    let card = event.target.closest(".swiper-slide");                                                           //* پیدا کردن کارت محصول
    let product = await fetchProductFromDatabase(event)                                                                //* دریافت اطلاعات محصول از دیتابیس 
    let user = await fetchUserFromDatabase();                                                                         //* دریافت اطلاعات کاربر از دیتابیس 
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
let fetchUserFromDatabase = async () => {
    try {
        if (! await showAlertLogin()) return false;     
        let userName = await getLocalStorage("login");                                                            //* کاربری که لاگین کرده username        
        // let res = await fetch(`http://localhost:4000/users`);                                        //* دریافت لیست یوزر ها از سرور
        // if (!res.ok) {                                                                              //* اگر دریافت موفقیت امیز نبود
        //     throw new Error(`Failed to fetch user data. Server responded with status: ${res.status}`);
        // }
        let users = await fetchDataFromApi('http://localhost:4000/users');
        return users.find((user) => user.name === userName);                               //* پیدا کردن مشخصات یوزر مورد نظر

    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return null;
    }
};

// ! پیدا کردن و گرفتن اطلاعات محصول مورد نظر از سرور
let fetchProductFromDatabase = async (event) => {    
    let Products = await fetchDataFromApi('http://localhost:4000/products');                                                                   //* دریافت اطلاعات تمام محصولات
    let productName = await extractProductTitle(event.target)                                           //* دریافت عنوان محصول
    return Products.find(product => product.name === productName)                //* پیدا کردن اطلاعات محصول مورد نظر 
}

const isProductInCart = (product, cartItems) => cartItems.some(item => item.id === product.id);

//! 🛒 تابع تغییر دکمه "افزودن به سبد خرید" با کلیک روی ان
async function updateCartButtonState(event) {
    if (! await showAlertLogin()) return false;     
    let product = await fetchProductFromDatabase(event)                                                    //* دریافت اطلاعات محصول از سرور
    let cartItems = await fetchAllCartItems()                                                                    //* دریافت اطلاعات سبد خرید
    if (!isProductInCart(product, cartItems)) {                                                                         //* 🛒 اگر محصول در سبد خریدد نبود، افزودن محصول به سبد خرید
        changeBtnAfterAdd(event.target)                                                            //* فراخوانی تابع تغییرات کلید سبد خرید محصول
    } 
}

//! تابع افزودن محصول به سبد خرید
async function addToCartAndToggleButton(event) {     
    if (! await showAlertLogin()) return false;     
    await addToCart(event);                                                                          //* فراخوانی تابع ساخت و افزودن به سبد خرید
    await updateCartButtonState(event)                                                                      //* "فراخوانی تغییر دکمه "افزودن به سبد خرید
}

// ! ذخیره اطلاعات محصول بوکمارک شده
let createBookmarkProductObject = async (event) => {
    let productName = await extractProductTitle(event.target)                                      //* دریافت عنوان محصول
    let product = await fetchProductFromDatabase(event)                                                  //* دریافت اطلاعات محصول از سرور
    let user = await fetchUserFromDatabase();                                                           //* دریافت اطلاعات یوزر
    return {                                                                                   //* برگرداندن اطلاعات محصول بوکمارک شده
        id: Date.now().toString(36),
        product_name: productName,
        user_id: user.id,
        product_id: product.id,
    };
}

//! تابع مریوط به دکمه های باکس محصول
let attachProductEventListeners = async () => {                                                                                         
    document.querySelectorAll('.btn-cart-box').forEach(button => {                               //*🧺 دکمه افزودن به سبد خرید  
        button.addEventListener('click', addToCartAndToggleButton);
    });                                                                                    
    document.querySelectorAll('.glide__arrow--right').forEach(btn => {                           //*➡️ دکمه حرکت سمت راست تصویر محصول
        btn.addEventListener('click', () => {
            updateArrowButtonColors(btn, '#2563eb', '#75757533');
        });
    });                                                                                
    document.querySelectorAll('.glide__arrow--left').forEach(btn => {                           //*⬅️ دکمه حرکت سمت چپ تصویر محصول
        btn.addEventListener('click', () => {
            updateArrowButtonColors(btn, '#2563eb', '#75757533');
        });
    });
}

export {createProductObject , addToCartAndToggleButton , extractProductTitle, updateCartButtonState , createBookmarkProductObject , attachProductEventListeners , fetchAllProducts , fetchProductFromDatabase , fetchUserFromDatabase }
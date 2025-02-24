import {  updateCartNotification , renderCartItems , changeBtnAfterDelete , showModal , createBoxToPageCart} from "./ui.js";
import { getProductDataDB , getUserDataDB, titleProduct} from "./box.js";
import { showAlertLogin } from "../utils.js";
// -------------------------------------------------------------------------------------

//! دریافت لیست سبد خرید از سرور
let allCart = async () => {
    let res = await fetch('http://localhost:4000/carts')
    let data = await res.json()
    return data
}

//!🛒 تابع بررسی وجود یا عدم وجود محصول در سبد خرید
async function addToCart(event) {
    let product = await getProductDataDB(event)                   //* دریافت اصلاعات محصول مورد نظر
    let user = await getUserDataDB();                            //* دریافت اطلاعات کاربر انجام دهنده
    let data = await allCart()                                   //* دریافت لیست سبد خرید    
    let newCart = {                                              //* ذخیره اطلاعات محصول جدید سبد خرید
        id: Date.now().toString(36),
        user_id: +user.id,
        product_id: +product.id,
        product_name: product.name,
        product_images: product.images,
        product_description: product.description,
        product_ratings: product.ratings,
        discount: +product.discount,
        price: +product.price,
        quantity: 1,
        totalPrice: product.discount ? +product.discount : +product.price,
    }
    let exists = data.some(item => item.product_id == product.id);    //*🛒 بررسی وضعیت محصول در سبد خرید
    const notifCart = document.querySelector('.notif-cart');
    if (!exists) {   //* افزودن محصول به سبد خرید
        addCartToDB(newCart)
        updateCartNotification(data);
        showModal(`✅🛒 ${product.name} به سبد خرید شما اضافه شد`);
        notifCart.classList.add('is-notif');                                           //*🛒 حذف نوتیف سبد خرید

    } else {  //*💭 نمایش پیغام وجود محصول در سبد خرید
        showModal(`✅🛒 ${product.name} از قبل در سبد خرید شما موجود است`);
    }
}

let addCartToDB = async (newCart) => {
    let res = await fetch('http://localhost:4000/carts' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCart)
    })
    await res.json()    
}

//!🛒 تابع کلیک روی ایکون سبد خرید و باز کردن سبد خرید
async function toggleCart() {    
    const shoppingCart = document.querySelector('.shoping-cart');
    const openCart = document.querySelector('.open-cart');
    const containerOpenCart = document.querySelector('.cantainer-open-cart');
    const notifCart = document.querySelector('.notif-cart');
    const alertCart = document.querySelector('.alert-cart');

    shoppingCart.addEventListener('click', async () => {                                      //* رویداد کلیک روی ایکون سبد خرید
        let productDataCart = await allCart()                                               //* دریافت اطلاعات تمام سبد خرید
        renderCartItems(productDataCart)                                                   //*🛒 فراخوانی تابع ایجاد کردن و نمایش اطلاعات محصول در سبد خرید
        
        openCart.classList.add('is-content');                                                //*🛒 نمایش دادن سبد خرید
        containerOpenCart.style.visibility = 'visible';                                     //* تاریک کردن پس زمینه
        containerOpenCart.style.height = document.body.offsetHeight + 'px'                 //* مشخص کردن ارتفاع پس زمینه طبق ارتفاع صفحه        
        notifCart.classList.remove('is-notif');                                           //*🛒 حذف نوتیف سبد خرید
        
        if (productDataCart.length > 0) {                                               //*💭 بررسی وجود یا عدم وجود محصول در سبد خرید و نمایش محتوای داخل ان طبق بررسی انجام شده
            alertCart.classList.add('d-none');
            alertCart.classList.remove('d-block');

        } else {                                                                     //*💭 نمایش پیغام مناسب با عدم وجود محصول در سبد خرید
            alertCart.classList.remove('d-none');
            alertCart.classList.add('d-block');
        }
    });
}

//!🛒 فراخوان کننده ی توابع سبد خرید
async function initializeCart() {    
    let Carts = await allCart()                                                     //* دریافت اطلاعات سبد خرید
    renderCartItems(Carts);                                                       //*🛒 فراخوانی تابع ایجاد کردن و نمایش اطلاعات محصول در سبد خرید
    updateCartNotification(Carts);                                               //*🛒 فراخوانی تابع نمایش دادن نوتیف سبد خرید
}

//! ❌ تابع حذف محصول از سبد خرید
async function removeFromCart(event) {
    let alertLogin = await showAlertLogin()
    if (!alertLogin) {
        return false;
    }
    let titleCart = await titleProduct(event.target)
    let cantainerOpenCart = document.querySelector('.cantainer-open-cart');
    let openCart = document.querySelector('.open-cart');
    let notifCart = document.querySelector('.notif-cart');
    let Carts = await allCart()                                                                          //* دریافت اطلاعات سبد خرید
    let productTarget = await Carts.find(cart => cart.product_name === titleCart)                       //* پیدا کردن محصول مورد نظر
    await fetch(`http://localhost:4000/carts/${productTarget.id}`, {method: 'DELETE',})                //* ارسال درخواست حذف به سرور

    //* 🛒 بررسی وضعیت سبد خرید
    if (Carts.length <= 0) {                                                                         //* در صورت خالی شدن سبد خرید، سبد را ببند
        cantainerOpenCart.style.visibility = 'hidden';
        openCart.classList.remove('is-content');
        notifCart.classList.remove('is-notif');        
    }
    // notifCart.classList.remove('is-notif');                                                                                                    
    document.querySelectorAll('.product-box').forEach(async box => {                                  //*❌ "حذف تغییرات اعمال شده در دکمه "افزودن به سبد خرید
        let titleBox = await titleProduct(box)                                                        //* دریافت عنوان محصول
        if (titleCart === titleBox) {
            changeBtnAfterDelete(box)                                                                          //* ✅ تغییر محتوای دکمه افزودن به سبد خرید
        }
    })
    showModal(`❌🧺 ${titleCart} از سبد خرید شما حذف شد`)
    finalBuyCartFunc() 
    let updateCart = await allCart()
    const alertCart = document.querySelector('.alert-cart');    
    if (updateCart.length <= 0) {        
        alertCart.classList.add('d-block');
        alertCart.classList.remove('d-none');
    }      
    renderCartItems(updateCart) 
}

let price;
//!🛒 تابع زیاد کردن تعداد محصول در سبد خرید
async function increaseQuantity(event) { 
    let alertLogin = await showAlertLogin()
    if (!alertLogin) {
        return false;
    }   
    let boxProduct = event.target.closest('.swiper-slide')
    let title = await titleProduct(event.target)
    let priceElem = boxProduct.querySelector(".total-price");  
    let numberElement = boxProduct.querySelector('.number')
    numberElement.innerHTML = Number(numberElement.innerHTML) + 1;                                          //* مشخص کردن تعداد محصول
    let getProductsDB = await allCart()                                                                    //* دریافت اطلاعات سبد خرید
    let objProduct = getProductsDB.find(item => item.product_name === title)           //* پیدا کردن محصول مورد نظر
    
    if (!objProduct.discount) {                                                      //* اگر محصول مورد نظر تخفیف نداشت قیمت اصلی را مبنای محاسبات قرار بده    
        price = objProduct.price * numberElement.innerHTML
    } else {
        price = objProduct.discount * numberElement.innerHTML        
    }
    
    editeDataProductToDB(numberElement , objProduct , price)                                          //* اعمال تغییرات جدید در دیتابیس
    numberElement.innerHTML = numberElement.innerHTML                                                 //* quantity دادن مقدار جدید به 
    priceElem.textContent = price.toLocaleString()                                                   //* اعمال قیمت جدید
}

// ! تابع گرفتن دیتای جدید و انجام عملیات ویرایش اطلاعات
let editeDataProductToDB = async (numberElement , objProduct , price) => {    
    let user = await getUserDataDB();
    let editeCart = {
        id: objProduct.id,
        user_id: +user.id,
        product_id: +objProduct.product_id,
        product_name: objProduct.product_name,
        product_images: objProduct.product_images,
        product_description: objProduct.product_description,
        product_ratings: objProduct.ratings,
        discount: +objProduct.discount,
        price: +objProduct.price,
        quantity: +numberElement.innerHTML,
        totalPrice: +price,
    }
    await fetch(`http://localhost:4000/carts/${objProduct.id}` , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editeCart)
    })
}

//!🛒 تابع کم کردن تعداد محصول در سبد خرید
async function decreaseQuantity(event) {
    let alertLogin = await showAlertLogin()
    if (!alertLogin) {
        return false;
    }
    let boxProduct = event.target.closest(".swiper-slide")
    let title = await titleProduct(event.target)
    let priceElem = boxProduct.querySelector(".total-price");  
    let numberElement = boxProduct.querySelector('.number');
    let getProductsDB = await allCart()                                                                   //* دریافت اطلاعات سبد خرید
    let objProduct = getProductsDB.find(item => item.product_name === title)          //* پیدا کردن محصول مورد نظر
    let currentValue = Number(numberElement.innerHTML);                                                  //* به نامبر quantity تبدیل
    
    if (currentValue > 1) {                                                                           //* بزرگ تر از یک بود یک عدد از ان کم کن quantity اگر
        numberElement.innerHTML = currentValue - 1;
        if (!objProduct.discount) {                                                   //* اگر محصول مورد نظر تخفیف نداشت قیمت اصلی را مبنای محاسبات قرار بده 
            price = objProduct.totalPrice - objProduct.price
        } else {
            price = objProduct.totalPrice - objProduct.discount
        }
    }    

    editeDataProductToDB(numberElement , objProduct , price)                                 //* اعمال تغییرات جدید در دیتابیس
    numberElement.innerHTML = numberElement.innerHTML                                       //* quantity دادن مقدار جدید به 
    priceElem.textContent = price.toLocaleString()                                         //* اعمال قیمت جدید
}

//!🛒 تابع حذف همه موارد موجود از سبد خرید
async function removeAllFromCart(event) {
    let alertLogin = await showAlertLogin()
    if (!alertLogin) {
        return false;
    }
    const cantainerOpenCart = document.querySelector('.cantainer-open-cart');
    const openCart = document.querySelector('.open-cart');
    const notifCart = document.querySelector('.notif-cart');
    cantainerOpenCart.style.visibility = 'hidden';
    openCart.classList.remove('is-content');
    notifCart.classList.remove('is-notif');

    clearCart();                                                                        //* حذف تک تک ایتم های سبد خرید
    document.querySelectorAll('.product-box').forEach(box => {                           //* انتخاب همه ی محصولات
        changeBtnAfterDelete(box)                                                              //* ✅ تغییر محتوای دکمه
    })
    showModal('❌🧺 همه ی ایتم های سبد خرید شما حذف شدند')
}

//! تابع حذف تمام محصولات سبد خرید
async function clearCart() {
    try {
        const cartItems = await allCart()                                             //* دریافت تمام آیتم‌های سبد خرید
        if (cartItems.length === 0) {                                                //* اگر سبد خرید خالی است، نیازی به حذف نیست
            showModal("🛒 سبد خرید از قبل خالی است!")
            return;
        }

        
        await Promise.all(                                                          //* حذف تک‌تک آیتم‌ها
            cartItems.map(async (item) => 
                await fetch(`http://localhost:4000/carts/${item.id}`, { method: "DELETE" })
            )
        );

        showModal("✅ سبد خرید با موفقیت خالی شد!")
    } catch (error) {
        console.error("❌ خطا در پاک کردن سبد خرید:", error);
    }
}

let finalBuyCartFunc = async () => {
    let shopingCartProduct = await allCart()    
    createBoxToPageCart(shopingCartProduct)
}

//!🛒 تابع ست کردن رویداد کلیک روی دکمه های موجود در سبد خرید
function attachCartEventListeners() {
    document.querySelectorAll('.remove-btn').forEach(btn => {                                                //* دکمه حذف محصول از سبد خرید
        btn.addEventListener('click', removeFromCart);                  
    });                 
    document.querySelectorAll('.plus-btn').forEach(btn => {                                                //* دکمه زیاد کردن تعداد محصول
        btn.addEventListener('click', increaseQuantity);                    
    });                 
    document.querySelectorAll('.minus-btn').forEach(btn => {                                              //* دکمه کم کردن تعداد محصول
        btn.addEventListener('click', decreaseQuantity);                    
    });                 
    document.querySelectorAll('.clear-cart-all').forEach(btn => {                                        //* دکمه حذف کلی سبد خرید
        btn.addEventListener('click', removeAllFromCart);
    });
    document.querySelector('.final-buy-cart').addEventListener('click' , finalBuyCartFunc)             //* دکمه رفتن به صفحه سبد خرید
}


//!❌ تابع بستن سبد خرید
function closeCart() {
    const cantainerOpenCart = document.querySelector('.cantainer-open-cart');
    const openCart = document.querySelector('.open-cart');
    const notifCart = document.querySelector('.notif-cart');

    cantainerOpenCart.addEventListener('click', async (e) => {                              //*🛒 کلیک روی پس زمینه و بسته شدن سبد خرید
        if (e.target.classList.contains('cantainer-open-cart')) {                           //*🛒 بررسی وضعیت کانتینر سبد خرید
            cantainerOpenCart.style.visibility = 'hidden';
            openCart.classList.remove('is-content');
            let cartItems = await allCart()
            if (cartItems.length > 0) {                                                    //* اگر سبد خرید خالی نبود نوتیف ان را ظاهر کن
                notifCart.classList.add('is-notif');
            }
            finalBuyCartFunc()
        }
    });
}

export {attachCartEventListeners , increaseQuantity, decreaseQuantity, finalBuyCartFunc ,addToCart ,toggleCart ,initializeCart ,closeCart , removeAllFromCart  , removeFromCart , allCart}
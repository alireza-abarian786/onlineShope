import {  updateCartNotification , renderCartItems , changeBtnAfterDelete , showModal , createBoxToPageCart} from "./ui.js";
import { fetchProductFromDatabase , fetchUserFromDatabase, extractProductTitle} from "./box.js";
import { showAlertLogin , fetchDataFromApi} from "../utils.js";
import { totalPaymentFunc } from "../../shoppingCart.js";
// -------------------------------------------------------------------------------------

let price;
// -------------------------------------------------------------------------------------

//!🛒 تابع بررسی وجود یا عدم وجود محصول در سبد خرید
async function addToCart(event) {
    let product = await fetchProductFromDatabase(event)                                                              //* دریافت اصلاعات محصول مورد نظر
    let data = await fetchDataFromApi('http://localhost:4000/carts');                                               //* دریافت لیست کل سبد خرید  
    let newCart = await newProductData(product)                                                                    //* اطلاعات محصول جدید سبد خرید
    let exists = data.some(item => item.product_id == product.id);                                                //*🛒 بررسی وجود محصول در سبد خرید

    if (!exists) {                                                                                                //* اگر محصول در سبد نبود، افزودن محصول
        await addCartToDB(newCart)                                                                               //* افزودن کارت جدید به دیتابیس
        updateCartNotification();                                                                               //* اپدیت نوتیف سبد خرید    
        showModal(`✅🛒 ${product.name} به سبد خرید شما اضافه شد`);                                         //* پیغام موفقیت
        
    } else {                                                                                                 //* اگر محصول در سبد بود، نمایش پیغام مناسب
        showModal(`✅🛒 ${product.name} از قبل در سبد خرید شما موجود است`);                                 
    }    
}

//! تنظیم اطلاعات محصول جدید سبد خرید
let newProductData = async (product) => {
    let user = await fetchUserFromDatabase();                                                              //* دریافت اطلاعات کاربر انجام دهنده    
    if (!user || !user.id || !product || !product.id) {                                                  //* صحت سنجی دریافت درست اطلاعات
        console.error("اطلاعات کاربر یا محصول نامعتبر است.");
        return;
    }
    return {                                                                                            //* ارسال اطلاعات محصول جدید سبد خرید
        id: Date.now().toString(36),
        user_id: +user.id,
        product_id: +product.id,
        product_name: product.name,
        product_images: product.images,
        product_description: product.description,
        product_ratings: +product.ratings,
        discount: +product.discount,
        price: +product.price,
        quantity: 1,
        totalPrice: product.discount ? +product.discount : +product.price,
    }
}

// ! انجام عملیات افزودن کارت محصول جدید به دیتابیس
let addCartToDB = async (newCart) => {
    await fetch('http://localhost:4000/carts' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCart)
    })
}

//!🛒 تابع کلیک روی ایکون سبد خرید و باز کردن سبد خرید
async function toggleCart() {    
    const shoppingCart = document.querySelector('.shoping-cart');
    const openCart = document.querySelector('.open-cart');
    const containerOpenCart = document.querySelector('.cantainer-open-cart');
    const notifCart = document.querySelector('.notif-cart');

    shoppingCart.addEventListener('click', async () => {                                                            //* رویداد کلیک روی ایکون سبد خرید        
        openCart.classList.add('is-content');                                                                      //*🛒 نمایش مودال دادن سبد خرید
        containerOpenCart.style.visibility = 'visible';                                                           //* نمایش پس زمینه مودال
        containerOpenCart.style.height = document.body.offsetHeight + 'px'                                       //* مشخص کردن ارتفاع پس زمینه طبق ارتفاع صفحه        
        notifCart.classList.remove('is-notif');                                                                 //*🛒 حذف نوتیف سبد خرید
        showAlertEmptyCart()                                                                                   //* نمایش پیغام خالی بودن سبد خرید
    });
}

//!🛒 فراخوانی توابع سبد خرید
async function initializeCart() {    
    let Carts = await fetchDataFromApi('http://localhost:4000/carts');                                             //* دریافت اطلاعات سبد خرید
    renderCartItems(Carts);                                                                                       //* نمایش اطلاعات محصول در سبد خرید
    updateCartNotification(Carts);                                                                               //* اپدیت نوتیف سبد خرید
}

//! ❌ تابع حذف محصول از سبد خرید
async function removeFromCart(event) {
    if (! await showAlertLogin()) return false;                                                                   //* بررسی لاگین کاربر
    let titleCart = await extractProductTitle(event.target)                                                      //* دریافت عنوان محصول
    let Carts = await fetchDataFromApi('http://localhost:4000/carts');                                          //* دریافت اطلاعات سبد خرید
    let productTarget = await Carts.find(cart => cart.product_name === titleCart)                              //* پیدا کردن محصول مورد نظر
    await fetch(`http://localhost:4000/carts/${productTarget.id}`, {method: 'DELETE',})                       //* ارسال درخواست حذف به سرور

    changeBtnAfterDelete(event.target)                                                                         //* ✅ تغییر استایل کلید سبد خرید محصول)
    showAlertEmptyCart()                                                                                      //* نمایش پیغام خالی بودن سبد خرید
    totalPaymentFunc()                                                                                       //* اپدیت قیمت کل
    finalBuyCartFunc()                                                                                      //* اپدیت صفحه سبد خرید
    showModal(`❌🧺 ${titleCart} از سبد خرید شما حذف شد`)
}

// ! نمایش پیغام خالی بودن سبد خرید
let showAlertEmptyCart = async () => {
    let updateCart = await fetchDataFromApi('http://localhost:4000/carts');                             //* دریافت کل ایتم های سبد خرید
    let alertCart = document.querySelector('.alert-cart');                                             //* تعریف پیام خالی بودن سبد
    let notifCart = document.querySelector('.notif-cart');                                            //* تعریف نوتیف سبد
    if (updateCart.length <= 0) {                                                                    //*💭 اگر محصولی در سبد بود، حذف پیغام خطا
        alertCart.classList.remove('d-none');
        alertCart.classList.add('d-block');
        notifCart.classList.remove('is-notif')

    } else {                                                                                         //*💭 اگر محصولی در سبد بود، نمایش پیغام خطا
        alertCart.classList.add('d-none');
        alertCart.classList.remove('d-block');
    }
    renderCartItems(updateCart)                                                                      //* اپدیت مودال سبد خرید
}

//!🛒 عملیات افزایش یا کاهش تعداد محصول در سبد خرید
let updateQuantity = async (event , operation) => {
    if (! await showAlertLogin()) return false;                                                                  //* بررسی لاگین کاربر
    let boxProduct = event.target.closest('.swiper-slide')                                                      //* دریافت کارت محصول
    let title = await extractProductTitle(event.target)                                                        //* دریافت عنوان محصول
    let priceElem = boxProduct.querySelector(".total-price");                                                 //* المنت قیمت محصول
    let quantityElem = boxProduct.querySelector('.number')                                                   //* المنت شمارنده محصول
    let getProductsDB = await fetchDataFromApi('http://localhost:4000/carts');                              //* دریافت اطلاعات سبد خرید
    let objProduct = getProductsDB.find(item => item.product_name === title)                               //* پیدا کردن محصول مورد نظر
    let quantity = Number(quantityElem.innerHTML);                                                        //* تبدیل شمارنده به نامبر
    if (!objProduct) {                                                                                   //* اگر محصول مورد نظر پیدا نشد متوقف شو
        showModal("❌ محصول مورد نظر یافت نشد!");
        return;
    }

    if (operation === 'increase') {                                                                     //* اگر عملیات مورد نظر افزایش تعداد محصول بود
        quantity += 1;
        price = objProduct.totalPrice + (objProduct.discount || objProduct.price)
    } else if (operation === 'decrease' && quantity > 1){                                               //* اگر عملیات مورد نظر کاهش تعداد محصول بود
        quantity -= 1;
        price = objProduct.totalPrice - (objProduct.discount || objProduct.price)
    } else {
        showModal("⚠️ حداقل تعداد محصول 1 می‌باشد.");
        return;
    }
    
    await editeDataProductToDB(quantity , objProduct , price)                                                  //* اعمال تغییرات جدید در دیتابیس
    await totalPaymentFunc()                                                                                  //* اپدیت قیمت کل صفحه سبد خرید
    await finalBuyCartFunc()                                                                                 //* اپدیت صفحه سبد خرید
    quantityElem.textContent = quantity                                                                     //* quantity دادن مقدار جدید به 
    priceElem.textContent = price.toLocaleString()                                                         //* اعمال قیمت جدید
}

// ! تابع گرفتن دیتای جدید و انجام عملیات ویرایش اطلاعات
let editeDataProductToDB = async (quantity , objProduct , price) => {    
    let user = await fetchUserFromDatabase();
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
        quantity: quantity,
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

//!🛒 تابع حذف همه موارد موجود از سبد خرید
async function removeAllFromCart(event) {
    if (! await showAlertLogin()) return false;     
    const cantainerOpenCart = document.querySelector('.cantainer-open-cart');
    const openCart = document.querySelector('.open-cart');
    const notifCart = document.querySelector('.notif-cart');
    cantainerOpenCart.style.visibility = 'hidden';
    openCart.classList.remove('is-content');
    notifCart.classList.remove('is-notif');

    await clearCart();                                                                            //* حذف تک تک ایتم های سبد خرید
    await totalPaymentFunc()                                                                     //* اپدیت صفحه سبد خرید
    document.querySelectorAll('.product-box').forEach(box => {                                  //* انتخاب همه ی کارت ها
        changeBtnAfterDelete(box)                                                              //* ✅ تغییر محتوای دکمه
    })
    showModal('❌🧺 همه ی ایتم های سبد خرید شما حذف شدند')
}

//! تابع حذف تمام محصولات سبد خرید
async function clearCart() {
    try {
        const cartItems = await fetchDataFromApi('http://localhost:4000/carts');                                             //* دریافت تمام آیتم‌های سبد خرید
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
    let shopingCartProduct = await fetchDataFromApi('http://localhost:4000/carts');    
    await createBoxToPageCart(shopingCartProduct)
    await updateCartNotification()

}

//!🛒 تابع ست کردن رویداد کلیک روی دکمه های موجود در سبد خرید
function attachCartEventListeners() {
    document.querySelectorAll('.remove-btn').forEach(btn => {                                                //* دکمه حذف محصول از سبد خرید
        btn.addEventListener('click', removeFromCart);                  
    });                 
    document.querySelectorAll('.plus-btn').forEach(btn => {                                                //* دکمه زیاد کردن تعداد محصول
        btn.addEventListener('click' , (event) => updateQuantity(event , 'increase'));                    
    });                 
    document.querySelectorAll('.minus-btn').forEach(btn => {                                              //* دکمه کم کردن تعداد محصول
        btn.addEventListener('click' , (event) => updateQuantity(event , 'decrease'));                    
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

    cantainerOpenCart.addEventListener('click', async (e) => {                                               //*🛒 کلیک روی پس زمینه و بسته شدن سبد خرید
        if (e.target.classList.contains('cantainer-open-cart')) {                                           //*🛒 بررسی وضعیت کانتینر سبد خرید
            cantainerOpenCart.style.visibility = 'hidden';
            openCart.classList.remove('is-content');
            let cartItems = await fetchDataFromApi('http://localhost:4000/carts');
            if (cartItems.length > 0) {                                                                  //* اگر سبد خرید خالی نبود نوتیف ان را ظاهر کن
                notifCart.classList.add('is-notif');
            }
        }
    });
}

export {attachCartEventListeners , updateQuantity, finalBuyCartFunc ,addToCart ,toggleCart ,initializeCart ,closeCart , removeAllFromCart  , removeFromCart}
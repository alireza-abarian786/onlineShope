import { getLocalStorage, setLocalStorage, removeItemFromStorage } from "./storage.js";
import {  updateCartNotification , renderCartItems} from "./ui.js";
import { showModal } from "./ui.js";

//🛒 تابع بررسی وجود یا عدم وجود محصول در سبد خرید
function addToCart(product) {
    let cartItems = getLocalStorage('cart');

    //🛒 بررسی آیا این محصول از قبل در سبد خرید هست یا نه
    let exists = cartItems.some(item => item.title === product.title);
    if (!exists) { 
        cartItems.push(product);
        setLocalStorage('cart', cartItems);
        updateCartNotification(cartItems);
        showModal(`✅🛒 ${product.title} به سبد خرید شما اضافه شد`);
    } else {
        //💭 نمایش پیغام وجود محصول در سبد خرید
        showModal(`✅🛒 ${product.title} از قبل در سبد خرید شما موجود است`);
    }
}

//🛒 تابع کلیک روی ایکون سبد خرید و باز کردن سبد خرید
function toggleCart() {    
    const shopingCart = document.querySelector('.shoping-cart');
    const openCart = document.querySelector('.open-cart');
    const cantainerOpenCart = document.querySelector('.cantainer-open-cart');
    const notifCart = document.querySelector('.notif-cart');
    const alertCart = document.querySelector('.alert-cart');

    shopingCart.addEventListener('click', () => {
        let cartItems = getLocalStorage('cart');
        renderCartItems(cartItems)

        //🛒 نمایش دادن سبد خرید
        openCart.classList.add('is-content');
        cantainerOpenCart.style.visibility = 'visible';
        cantainerOpenCart.style.height = document.body.offsetHeight + 'px'

        //🛒 حذف نوتیف سبد خرید
        notifCart.classList.remove('is-notif');
        
        //💭 بررسی وجود یا عدم وجود محصول در سبد خرید و نمایش محتوای داخل ان طبق بررسی انجام شده
        if (cartItems.length > 0) {
            alertCart.classList.add('d-none');
            alertCart.classList.remove('d-block');
        } else {

            //💭 نمایش پیغام مناسب با عدم وجود محصول در سبد خرید
            alertCart.classList.remove('d-none');
            alertCart.classList.add('d-block');
        }
    });
}

//🛒 فراخوان کننده ی توابع سبد خرید
function initializeCart() {
    let cartItems = getLocalStorage('cart');

    //🛒 فراخوانی تابع ایجاد کردن و نمایش اطلاعات محصول در سبد خرید
    renderCartItems(cartItems);

    //🛒 فراخوانی تابع نمایش دادن نوتیف سبد خرید
    updateCartNotification(cartItems);
}

// ❌ تابع حذف محصول از سبد خرید
function removeFromCart(event) {
    let itemElement = event.target.closest(".box-goods");
    let itemId = itemElement.dataset.id;
    const cantainerOpenCart = document.querySelector('.cantainer-open-cart');
    const openCart = document.querySelector('.open-cart');
    const notifCart = document.querySelector('.notif-cart');

    //❌ حذف ایتم مورد نظر از لوکال استوریج
    removeItemFromStorage('cart', Number(itemId));
    initializeCart(); // بروز کردن دوباره لیست

    // 🛒 بررسی وضعیت سبد خرید
    let cartItems = getLocalStorage('cart');
    if (cartItems.length <= 0) { // در صورت خالی شدن سبد خرید، سبد را ببند
        cantainerOpenCart.style.visibility = 'hidden';
        openCart.classList.remove('is-content');
        notifCart.classList.remove('is-notif');
    }
    
    notifCart.classList.remove('is-notif');
    
    //❌ "حذف تغییرات اعمال شده در دکمه "افزودن به سبد خرید
    let titleCart = itemElement.querySelector("h6").textContent    
    document.querySelectorAll('.glide').forEach(box => {
        let titleBox = box.querySelector(".box-discription h6").textContent        
        if (titleCart === titleBox) {
            // ✅ تغییر محتوای دکمه
            box.querySelector('.add-cart').classList.remove("text-bg-primary");
            box.querySelector('.add-cart p').textContent = "اضافه به سبد خرید"
        }
    })
    showModal(`❌🧺 ${titleCart} از سبد خرید شما حذف شد`)    
}

let price;
//🛒 تابع زیاد کردن تعداد محصول در سبد خرید
function increaseQuantity(event) {    
    let boxProduct = event.target.closest('.box-goods')
    
    let titleProduct = boxProduct.querySelector('h6');
    let priceElem = boxProduct.querySelector(".price");    
    let getPriceLocal = getLocalStorage("cart")
    let objProduct = getPriceLocal.find(item => item.title === titleProduct.textContent)
    let numberElement = boxProduct.querySelector('.number')
    numberElement.innerHTML = Number(numberElement.innerHTML) + 1;
    
    if (objProduct.discount === 0) {
        price = objProduct.price * numberElement.innerHTML
    } else {
        price = objProduct.discount * numberElement.innerHTML        
    }
    
    priceElem.textContent = price.toLocaleString()

    objProduct.quantity = numberElement.innerHTML;
    objProduct.totalPrice = price;

    setLocalStorage('cart' , getPriceLocal)
}

//🛒 تابع کم کردن تعداد محصول در سبد خرید
function decreaseQuantity(event) {
    let boxProduct = event.target.closest(".box-goods")

    let titleProduct = boxProduct.querySelector('h6');
    let priceElem = boxProduct.querySelector(".price");    
    let getPriceLocal = getLocalStorage("cart")
    let objProduct = getPriceLocal.find(item => item.title === titleProduct.textContent)
    let numberElement = boxProduct.querySelector('.number');
    let currentValue = Number(numberElement.innerHTML);    
    
    if (currentValue > 1) {
        numberElement.innerHTML = currentValue - 1;
        if (objProduct.discount === 0) {
            price = objProduct.totalPrice - objProduct.price
        } else {
            price = objProduct.totalPrice - objProduct.discount
        }
    }    

    priceElem.textContent = price.toLocaleString()

    objProduct.quantity = numberElement.innerHTML;
    objProduct.totalPrice = price;

    setLocalStorage('cart' , getPriceLocal)
}

//🛒 تابع حذف همه موارد موجود از سبد خرید
function removeAllFromCart(event) {
    
    const cantainerOpenCart = document.querySelector('.cantainer-open-cart');
    const openCart = document.querySelector('.open-cart');
    const notifCart = document.querySelector('.notif-cart');

    cantainerOpenCart.style.visibility = 'hidden';
    openCart.classList.remove('is-content');
    notifCart.classList.remove('is-notif');
    
    localStorage.removeItem("cart")
    console.log(10);
    document.querySelectorAll('.glide').forEach(box => {    
        // ✅ تغییر محتوای دکمه
        box.querySelector('.add-cart').classList.remove("text-bg-primary");
        box.querySelector('.add-cart p').textContent = "اضافه به سبد خرید"
    })
    showModal('❌🧺 همه ی ایتم های سبد خرید شما حذف شدند')
}

// 🛒 تابع ست کردن رویداد کلیک روی دکمه های موجود در سبد خرید
function attachCartEventListeners() {
    // دکمه حذف محصول
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', removeFromCart);
    });

    // دکمه زیاد کردن تعداد محصول
    document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });

    // دکمه کم کردن تعداد محصول
    document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });

    // دکمه حذف کلی سبد خرید
    document.querySelectorAll('.clear-cart-all').forEach(btn => {
        btn.addEventListener('click', removeAllFromCart);
    });
}


//❌ تابع بستن سبد خرید
function closeCart() {
    const cantainerOpenCart = document.querySelector('.cantainer-open-cart');
    const openCart = document.querySelector('.open-cart');
    const notifCart = document.querySelector('.notif-cart');

    //🛒 کلیک روی کانتینر سبد خرید
    cantainerOpenCart.addEventListener('click', (e) => {

        //🛒 بررسی وضعیت کانتینر سبد خرید
        if (e.target.classList.contains('cantainer-open-cart')) {
            cantainerOpenCart.style.visibility = 'hidden';
            openCart.classList.remove('is-content');

            let cartItems = getLocalStorage('cart');
            if (cartItems.length > 0) {
                notifCart.classList.add('is-notif');
            }
        }
    });
}

export {attachCartEventListeners ,addToCart ,toggleCart ,initializeCart ,closeCart , removeAllFromCart  , removeFromCart}
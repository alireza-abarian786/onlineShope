import { getLocalStorage, setLocalStorage, removeItemFromStorage } from "./storage.js";
import {  updateCartNotification , renderCartItems} from "./ui.js";
import { showModal } from "./ui.js";
import { getProductDataDB , getUserDataDB , allProduct} from "./box.js";

let allCart = async () => {
    let res = await fetch('http://localhost:4000/carts')
    let data = await res.json()

    return data
}

//🛒 تابع بررسی وجود یا عدم وجود محصول در سبد خرید
async function addToCart(event) {
    let card = await event.target.closest('.swiper-slide')    
    let product = await getProductDataDB(card) 
    
    let user = await getUserDataDB();    

    let res = await fetch('http://localhost:4000/carts')
    let data = await res.json()

    let newCart = {
        id: Date.now().toString(36),
        user_id: +user.id,
        product_id: +product.id,
        product_name: product.name,
        product_image: product.images[0],
        product_description: product.description,
        discount: +product.discount,
        price: +product.price,
        quantity: 1,
        totalPrice: product.discount ? +product.discount : +product.price,
    }

    //🛒 بررسی آیا این محصول از قبل در سبد خرید هست یا نه
    let exists = data.some(item => item.product_id == product.id);
    
    if (!exists) {         
        addCartToDB(newCart)
        updateCartNotification(data);
        showModal(`✅🛒 ${product.name} به سبد خرید شما اضافه شد`);
    } else {
        //💭 نمایش پیغام وجود محصول در سبد خرید
        showModal(`✅🛒 ${product.name} از قبل در سبد خرید شما موجود است`);
    }
}

let productToCart = async () => {
    // دریافت اطلاعات تمام محصولات
    let Products = await allProduct()

    // دریافت اطلاعات تمام سبد خرید
    let Carts = await allCart()

    let shopingCartProduct = await Products.filter(product => 
        Carts.some(cart => cart.product_id == product.id)
    )

    return shopingCartProduct;    
}

let addCartToDB = async (newCart) => {
    let res = await fetch('http://localhost:4000/carts' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCart)
    })
    let data = await res.json()
    console.log(data);
    
}

//🛒 تابع کلیک روی ایکون سبد خرید و باز کردن سبد خرید
async function toggleCart() {    
    const shopingCart = document.querySelector('.shoping-cart');
    const openCart = document.querySelector('.open-cart');
    const cantainerOpenCart = document.querySelector('.cantainer-open-cart');
    const notifCart = document.querySelector('.notif-cart');
    const alertCart = document.querySelector('.alert-cart');

    shopingCart.addEventListener('click', async () => {
        let productDataCart = await allCart()
        renderCartItems(productDataCart)
        console.log(productDataCart);
        
        
        //🛒 نمایش دادن سبد خرید
        openCart.classList.add('is-content');
        cantainerOpenCart.style.visibility = 'visible';
        cantainerOpenCart.style.height = document.body.offsetHeight + 'px'

        //🛒 حذف نوتیف سبد خرید
        notifCart.classList.remove('is-notif');
        
        //💭 بررسی وجود یا عدم وجود محصول در سبد خرید و نمایش محتوای داخل ان طبق بررسی انجام شده
        if (productDataCart.length > 0) {
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
async function initializeCart() {    
    // دریافت اطلاعات تمام سبد خرید
    let Carts = await allCart()

    //🛒 فراخوانی تابع ایجاد کردن و نمایش اطلاعات محصول در سبد خرید
    renderCartItems(Carts);

    //🛒 فراخوانی تابع نمایش دادن نوتیف سبد خرید
    updateCartNotification(Carts);
}

// ❌ تابع حذف محصول از سبد خرید
async function removeFromCart(event) {
    let itemElement = event.target.closest(".box-goods");
    let titleCart = itemElement.querySelector('h6').textContent;
    let itemId = itemElement.dataset.id;
    const cantainerOpenCart = document.querySelector('.cantainer-open-cart');
    const openCart = document.querySelector('.open-cart');
    const notifCart = document.querySelector('.notif-cart');

    // دریافت سبد خرید
    let Carts = await allCart()

    let productTarget = await Carts.find(cart => cart.product_name === titleCart)
    console.log(productTarget);
        

    let res = await fetch(`http://localhost:4000/carts/${productTarget.id}`, {method: 'DELETE',})  // ارسال درخواست حذف به سرور

    // 🛒 بررسی وضعیت سبد خرید
    if (Carts.length <= 0) { // در صورت خالی شدن سبد خرید، سبد را ببند
        cantainerOpenCart.style.visibility = 'hidden';
        openCart.classList.remove('is-content');
        notifCart.classList.remove('is-notif');
    }
    
    notifCart.classList.remove('is-notif');
    
    //❌ "حذف تغییرات اعمال شده در دکمه "افزودن به سبد خرید
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
async function increaseQuantity(event) {    
    let boxProduct = event.target.closest('.box-goods')
    let titleProduct = boxProduct.querySelector('h6');
    let priceElem = boxProduct.querySelector(".price");  
    let numberElement = boxProduct.querySelector('.number')
    numberElement.innerHTML = Number(numberElement.innerHTML) + 1;
    
    // دریافت سبد خرید
    let getProductsDB = await allCart()
    let objProduct = getProductsDB.find(item => item.product_name === titleProduct.textContent)
    
    if (!objProduct.discount) {        
        price = objProduct.price * numberElement.innerHTML
    } else {
        price = objProduct.discount * numberElement.innerHTML        
    }
    
    editeDataProductToDB(numberElement , objProduct , price)
    
    numberElement.innerHTML = numberElement.innerHTML
    priceElem.textContent = price.toLocaleString()
}

 let editeDataProductToDB = async (numberElement , objProduct , price) => {    
    let user = await getUserDataDB();

    let editeCart = {
        id: objProduct.id,
        user_id: +user.id,
        product_id: +objProduct.product_id,
        product_name: objProduct.product_name,
        product_image: objProduct.product_image,
        product_description: objProduct.product_description,
        discount: +objProduct.discount,
        price: +objProduct.price,
        quantity: +numberElement.innerHTML,
        totalPrice: +price,
    }

    let res = await fetch(`http://localhost:4000/carts/${objProduct.id}` , {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editeCart)
    })
}

//🛒 تابع کم کردن تعداد محصول در سبد خرید
async function decreaseQuantity(event) {
    let boxProduct = event.target.closest(".box-goods")

    let titleProduct = boxProduct.querySelector('h6');
    let priceElem = boxProduct.querySelector(".price");  
    let numberElement = boxProduct.querySelector('.number');

    // دریافت سبد خرید
    let getProductsDB = await allCart()
    let objProduct = getProductsDB.find(item => item.product_name === titleProduct.textContent)
    let currentValue = Number(numberElement.innerHTML);    
    
    if (currentValue > 1) {
        numberElement.innerHTML = currentValue - 1;
        if (objProduct.discount === 0) {
            price = objProduct.totalPrice - objProduct.price
        } else {
            price = objProduct.totalPrice - objProduct.discount
        }
    }    

    editeDataProductToDB(numberElement , objProduct , price)

    numberElement.innerHTML = numberElement.innerHTML
    priceElem.textContent = price.toLocaleString() 
}

//🛒 تابع حذف همه موارد موجود از سبد خرید
async function removeAllFromCart(event) {
    const cantainerOpenCart = document.querySelector('.cantainer-open-cart');
    const openCart = document.querySelector('.open-cart');
    const notifCart = document.querySelector('.notif-cart');

    cantainerOpenCart.style.visibility = 'hidden';
    openCart.classList.remove('is-content');
    notifCart.classList.remove('is-notif');

    clearCart();

    document.querySelectorAll('.glide').forEach(box => {    
        // ✅ تغییر محتوای دکمه
        box.querySelector('.add-cart').classList.remove("text-bg-primary");
        box.querySelector('.add-cart p').textContent = "اضافه به سبد خرید"
    })
    showModal('❌🧺 همه ی ایتم های سبد خرید شما حذف شدند')
}

async function clearCart() {
    try {
        // دریافت تمام آیتم‌های سبد خرید
        const response = await fetch("http://localhost:4000/carts");
        const cartItems = await response.json();

        // اگر سبد خرید خالی است، نیازی به حذف نیست
        if (cartItems.length === 0) {
            console.log("🛒 سبد خرید از قبل خالی است!");
            return;
        }

        // حذف تک‌تک آیتم‌ها
        await Promise.all(
            cartItems.map(async (item) => 
                await fetch(`http://localhost:4000/carts/${item.id}`, { method: "DELETE" })
            )
        );

        console.log("✅ سبد خرید با موفقیت خالی شد!");
    } catch (error) {
        console.error("❌ خطا در پاک کردن سبد خرید:", error);
    }
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
    cantainerOpenCart.addEventListener('click', async (e) => {

        //🛒 بررسی وضعیت کانتینر سبد خرید
        if (e.target.classList.contains('cantainer-open-cart')) {
            cantainerOpenCart.style.visibility = 'hidden';
            openCart.classList.remove('is-content');

            let cartItems = await allCart()
            if (cartItems.length > 0) {
                notifCart.classList.add('is-notif');
            }
        }
    });
}

export {attachCartEventListeners , increaseQuantity ,addToCart ,toggleCart ,initializeCart ,closeCart , removeAllFromCart  , removeFromCart , allCart , productToCart}
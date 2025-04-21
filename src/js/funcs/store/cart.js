import { updateCartNotification , renderCartItems , changeBtnAfterDelete , showModal , createBoxToPageCart, initializeStatusCarts} from "./ui.js";
import { fetchProductFromDatabase , fetchUserFromDatabase, extractProductTitle} from "./box.js";
import { fetchDataFromApi , hideLoader, showAlertLogin, showLoader} from "../utils.js";
import { totalPaymentFunc } from "../../shoppingCart.js";
import { getLocalStorage } from "./storage.js";
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
let fetchUserLogged = async () => {
    let userName = await getLocalStorage("login");                                                             //* کاربری که لاگین کرده username        
    let getUsers = await fetchDataFromApi('https://onlineshope.onrender.com/api/users');                    //* دریافت لیست کل یوزر ها  
    let user = getUsers.find(user => user.name === userName)
    fetchUserCart(user)
}

const fetchUserCart = async (userLogged) => {
    if (userLogged) {
        let userCart = await fetchDataFromApi(`https://onlineshope.onrender.com/api/carts/${userLogged._id}`);               //* دریافت لیست کل سبد خرید                      
        if (!userCart) {
            throw new Error("Error fetching data to from carts in the initializeCart function");
        }
        initializeCart(userCart)
        showAlertEmptyCart(userCart)
        finalBuyCartFunc(userCart)
        closeCart(userCart , userLogged)
        updateCartNotification(userCart)
        totalPaymentFunc(userCart)
        initializeStatusCarts(userCart)
        totalPaymentFunc(userCart)
    }
    
}

//!🛒 تابع بررسی وجود یا عدم وجود محصول در سبد خرید
async function addToCart(event) {
    try {
        if (! await showAlertLogin()) return false;                                                                     //* بررسی لاگین کاربر
        showLoader()           
        let product = await fetchProductFromDatabase(event)                                                             //* دریافت اصلاعات محصول مورد نظر
        let user = await fetchUserFromDatabase();                                                                      //* دریافت اطلاعات کاربر انجام دهنده            
        if (!user || !product) {                                                                                      //* صحت سنجی دریافت درست اطلاعات
            console.error("اطلاعات کاربر یا محصول نامعتبر است.");
            return;
        }
        
        let newCart = await newProductData(product , user)                                                                    //* اطلاعات محصول جدید سبد خرید
        let exists = data.items.some(item => item.product_id == product.id);                                                //*🛒 بررسی وجود محصول در سبد خرید
    
        if (!exists) {                                                                                                //* اگر محصول در سبد نبود، افزودن محصول
            await addCartToDB(newCart)                                                                               //* افزودن کارت جدید به دیتابیس
            // await updateCartNotification();                                                                               //* اپدیت نوتیف سبد خرید    
            showModal(`✅🛒 ${product.name} به سبد خرید شما اضافه شد`);                                         //* پیغام موفقیت
            
        } else {                                                                                                 //* اگر محصول در سبد بود، نمایش پیغام مناسب
            hideLoader()
            showModal(`✅🛒 ${product.name} از قبل در سبد خرید شما موجود است`);                                 
        }    
        
    } catch (error) {
        console.error('Error in Function addToCart =>' , error);  

    }
}

//! تنظیم اطلاعات محصول جدید سبد خرید
let newProductData = async (product , user) => {    
    const priceAfterDiscount = product.discount ? 
        +(product.price - (product.price * (Math.floor(product.discount / 10000) / 100))) : 
        +product.price;        

    return {                                                                                            //* ارسال اطلاعات محصول جدید سبد خرید
        _id: user.id,
        items: [{
            _id: Date.now().toString(36),
            product_id: product.id,
            product_name: product.name,
            product_images: product.images,
            product_description: product.description,
            product_ratings: +product.ratings,
            discount: +product.discount,
            price: +product.price,
            quantity: 1,
            totalPriceProductCart: priceAfterDiscount,
        }],
        totalPrice: priceAfterDiscount
    }
}

// ! انجام عملیات افزودن کارت محصول جدید به دیتابیس
let addCartToDB = async (newCart) => { 
    console.log(newCart);
        
    let userLogged = await fetchUserLogged()
    await fetch(`https://onlineshope.onrender.com/api/carts/${userLogged._id}/items` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCart.items[0])
    })    
}

//!🛒 تابع کلیک روی ایکون سبد خرید و باز کردن سبد خرید
async function toggleCart() {    
    const shoppingCart = document.querySelector('.shoping-cart');
    const openCart = document.querySelector('.open-cart');
    const containerOpenCart = document.querySelector('.cantainer-open-cart');
    const notifCart = document.querySelector('.notif-cart');

    shoppingCart.addEventListener('click', async () => {                                                            //* رویداد کلیک روی ایکون سبد خرید        
        try {
            if (! await showAlertLogin()) return false;                                                                     //* بررسی لاگین کاربر
            showLoader()
            openCart.classList.add('is-content');                                                                      //*🛒 نمایش مودال دادن سبد خرید
            containerOpenCart.style.visibility = 'visible';                                                           //* نمایش پس زمینه مودال
            containerOpenCart.style.height = document.body.offsetHeight + 'px'                                       //* مشخص کردن ارتفاع پس زمینه طبق ارتفاع صفحه        
            notifCart.classList.remove('is-notif');                                                                 //*🛒 حذف نوتیف سبد خرید            
            hideLoader()
            // showAlertEmptyCart()                                                                                   //* نمایش پیغام خالی بودن سبد خرید
        } catch (error) {
            console.error('Error in Function toggleCart =>' , error);  
        }
    });

}

//!🛒 فراخوانی توابع سبد خرید
async function initializeCart(userCart) {   
    try {
        await renderCartItems(userCart.items);                                                                                       //* نمایش اطلاعات محصول در سبد خرید
        
        // await updateCartNotification();                                                                               //* اپدیت نوتیف سبد خرید
    } catch (error) {
        console.error('Error in Function initializeCart =>' , error);  

    } 
}

//! ❌ تابع حذف محصول از سبد خرید
async function removeFromCart(event) {
    try {
        showLoader()
        if (! await showAlertLogin()) return false;                                                                     //* بررسی لاگین کاربر
        let titleCart = await extractProductTitle(event.target)                                                      //* دریافت عنوان محصول
        let userLogged = await fetchUserLogged()
        let Carts = await fetchDataFromApi(`https://onlineshope.onrender.com/api/carts/${userLogged._id}`);               //* دریافت لیست کل سبد خرید 
        if (!Carts) {
            throw new Error("Error fetching data to from carts in the removeFromCart function");
        }        
        
        let productTarget = await Carts.items.find(cart => cart.product_name === titleCart)                              //* پیدا کردن محصول مورد نظر        
        if (!productTarget) {
            throw new Error("Product not found in cart");
        }

        let res = await fetch(`https://onlineshope.onrender.com/api/carts/${userLogged._id}/items/${productTarget._id}`, {                //* ارسال درخواست حذف به سرور
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })                       
    
        if (!res.ok) {
            throw new Error("Failed to delete item from cart");
        }

        changeBtnAfterDelete(event.target)                                                                         //* ✅ تغییر استایل کلید سبد خرید محصول)
        await showAlertEmptyCart()                                                                                      //* نمایش پیغام خالی بودن سبد خرید
        await totalPaymentFunc()                                                                                       //* اپدیت قیمت کل
        await finalBuyCartFunc()                                                                                      //* اپدیت صفحه سبد خرید
        hideLoader()
        showModal(`❌🧺 ${titleCart} از سبد خرید شما حذف شد`)
        
    } catch (error) {
        console.error('Error in Function removeFromCart =>' , error);
        hideLoader()
        showModal('خطا در حذف محصول از سبد خرید')  
    }
}

// ! نمایش پیغام خالی بودن سبد خرید
let showAlertEmptyCart = async (updateCart) => {
    try {
        let alertCart = document.querySelector('.alert-cart');                                             //* تعریف پیام خالی بودن سبد
        let notifCart = document.querySelector('.notif-cart');                                            //* تعریف نوتیف سبد
        
        if (updateCart.items.length <= 0) {                                                                    //*💭 اگر محصولی در سبد بود، حذف پیغام خطا
            alertCart.classList.remove('d-none');
            alertCart.classList.add('d-block');
            notifCart.classList.remove('is-notif')
    
        } else {                                                                                         //*💭 اگر محصولی در سبد بود، نمایش پیغام خطا
            alertCart.classList.add('d-none');
            alertCart.classList.remove('d-block');
        }
        renderCartItems(updateCart.items)                                                                      //* اپدیت مودال سبد خرید
        hideLoader()
    
    } catch (error) {
        console.error('Error in Function showAlertEmptyCart =>' , error);  
    }
}

//!🛒 عملیات افزایش یا کاهش تعداد محصول در سبد خرید
let updateQuantity = async (event , operation) => {    
    try {
        if (! await showAlertLogin()) return false;                                                                     //* بررسی لاگین کاربر
        showLoader()
        let boxProduct = event.target.closest('.swiper-slide')                                                      //* دریافت کارت محصول
        let title = await extractProductTitle(event.target)                                                        //* دریافت عنوان محصول
        let priceElem = boxProduct.querySelector(".total-price");                                                 //* المنت قیمت محصول
        let quantityElem = boxProduct.querySelector('.number')                                                   //* المنت شمارنده محصول
        let userLogged = await fetchUserLogged()
        let getProductsDB = await fetchDataFromApi(`https://onlineshope.onrender.com/api/carts/${userLogged._id}`);               //* دریافت لیست کل سبد خرید 
        if (!getProductsDB) {
            throw new Error(`Error fetching data to from carts`)
        }
                
        let objProduct = getProductsDB.items.find(item => item.product_name === title)                               //* پیدا کردن محصول مورد نظر
        let quantity = Number(quantityElem.innerHTML);                                                        //* تبدیل شمارنده به نامبر
        let updatePrice;
        
        if (!objProduct) {                                                                                   //* اگر محصول مورد نظر پیدا نشد متوقف شو
            hideLoader()
            showModal("❌ محصول مورد نظر یافت نشد!");
            return;
        }

        let discount = +(objProduct.price - (objProduct.price * (Math.floor(objProduct.discount / 10000) / 100)))
    
        if (operation === 'increase') {                                                                     //* اگر عملیات مورد نظر افزایش تعداد محصول بود
            quantity += 1;
            updatePrice = objProduct.totalPriceProductCart + (discount || objProduct.price)
        } else if (operation === 'decrease' && quantity > 1){                                               //* اگر عملیات مورد نظر کاهش تعداد محصول بود
            quantity -= 1;            
            updatePrice = objProduct.totalPriceProductCart - (discount || objProduct.price)
        } else {
            hideLoader()
            showModal("⚠️ حداقل تعداد محصول 1 می‌باشد.");
            return;
        }
                
        quantityElem.textContent = quantity                                                                          //* quantity دادن مقدار جدید به 
        priceElem.textContent = updatePrice.toLocaleString()                                                        //* اعمال قیمت جدید
        await editeDataProductToDB(quantity , objProduct._id , updatePrice)                                        //* اعمال تغییرات جدید در دیتابیس
        await totalPaymentFunc()                                                                                  //* اپدیت قیمت کل صفحه سبد خرید
        await finalBuyCartFunc()                                                                                 //* اپدیت صفحه سبد خرید
        hideLoader()
    
    } catch (error) {
        console.error('Error in Function updateQuantity =>' , error);  
    }
}

// ! تابع گرفتن دیتای جدید و انجام عملیات ویرایش اطلاعات
let editeDataProductToDB = async (quantity , cartID , totalPriceProductCart) => {   
    if (! await showAlertLogin()) return false;                                                                     //* بررسی لاگین کاربر
    let userLogged = await fetchUserLogged()
    let product = await fetchDataFromApi(`https://onlineshope.onrender.com/api/carts/${userLogged._id}`);             //* دریافت لیست کل سبد خرید 
    if (!product) {                                                                                                                 //* اعتبار سنجی
        console.error("اطلاعات محصول نامعتبر است.");
        return;
    }

    let productCart = product.items.find(item => item._id === cartID)    
    let updateCart = {...productCart , quantity , totalPriceProductCart}                                                                  //* اطلاعات جدید    
    await fetch(`https://onlineshope.onrender.com/api/carts/${userLogged._id}/items/${cartID}` , {                         //* انجام عملیات ویرایش کردن
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateCart)
    })
}

//!🛒 تابع حذف همه موارد موجود از سبد خرید
async function removeAllFromCart(event) {   
    try {
        showLoader()
        let userLogged = await fetchUserLogged();
        const response = await fetch(`https://onlineshope.onrender.com/api/carts/${userLogged._id}/items`, {method: "DELETE"});
    
        if (!response.ok) {
            throw new Error("مشکل در حذف سبد خرید");
        }
        
        await totalPaymentFunc()                                                                     //* اپدیت صفحه سبد خرید
        document.querySelectorAll('.product-box').forEach(box => {                                  //* انتخاب همه ی کارت ها
            changeBtnAfterDelete(box)                                                              //* ✅ تغییر محتوای دکمه
        })
        showAlertEmptyCart()                                                                                      //* نمایش پیغام خالی بودن سبد خرید
        hideLoader()
        showModal("✅ سبد خرید با موفقیت خالی شد!")
        
    } catch (error) {
        console.error('Error in Function removeAllFromCart =>' , error);  
    }
}

let finalBuyCartFunc = async (shopingCartProduct) => {
    try {          
        createBoxToPageCart(await shopingCartProduct.items)
        // updateCartNotification()
        
    } catch (error) {
        console.error('Error in Function finalBuyCartFunc =>' , error);  
    }

}

//!🛒 تابع ست کردن رویداد کلیک روی دکمه های موجود در سبد خرید
function attachCartEventListeners() {
    document.querySelectorAll('.remove-btn').forEach(btn => {                                                   //* دکمه حذف محصول از سبد خرید
        btn.addEventListener('click', removeFromCart);                  
    });                 
    document.querySelectorAll('.plus-btn').forEach(btn => {                                                    //* دکمه زیاد کردن تعداد محصول
        btn.addEventListener('click' , (event) => updateQuantity(event , 'increase'));                    
    });                 
    document.querySelectorAll('.minus-btn').forEach(btn => {                                                   //* دکمه کم کردن تعداد محصول
        btn.addEventListener('click' , (event) => updateQuantity(event , 'decrease'));                    
    });                 
    document.querySelectorAll('.clear-cart-all').forEach(btn => {                                              //* دکمه حذف کلی سبد خرید
        btn.addEventListener('click', removeAllFromCart); 
    });
    document.querySelector('.final-buy-cart').addEventListener('click' , finalBuyCartFunc)                    //* دکمه رفتن به صفحه سبد خرید
}

//!❌ تابع بستن سبد خرید
function closeCart(userCart , userLogged) {
    const cantainerOpenCart = document.querySelector('.cantainer-open-cart');
    const openCart = document.querySelector('.open-cart');
    const notifCart = document.querySelector('.notif-cart');

    cantainerOpenCart.addEventListener('click', async (e) => {                                                      //*🛒 کلیک روی پس زمینه و بسته شدن سبد خرید
        try {
            if (e.target.classList.contains('cantainer-open-cart')) {                                              //*🛒 بررسی وضعیت کانتینر سبد خرید
                cantainerOpenCart.style.visibility = 'hidden';
                openCart.classList.remove('is-content');

                if (! await userLogged) return false;
                if (!userCart) {                                                                                 //* اگر دریافت دیتا به درستی انجام نشد
                    throw new Error('Error fetching data to from carts in the closeCart function')
                }

                if (userCart.length > 0) {                                                                      //* اگر سبد خرید خالی نبود نوتیف ان را ظاهر کن
                    notifCart.classList.add('is-notif');
                }
            }
            updateCartNotification(userCart)
            
        } catch (error) {
            console.error('Error in Function closeCart =>' , error);  
        }
    });
}

export {attachCartEventListeners ,fetchUserCart , fetchUserLogged, updateQuantity, finalBuyCartFunc ,addToCart ,toggleCart ,initializeCart ,closeCart , removeAllFromCart  , removeFromCart}
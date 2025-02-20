import { addToCart } from "./cart.js";
import { getLocalStorage , setLocalStorage } from "./storage.js";

let allProduct = async () => {
    let res = await fetch(`http://localhost:4000/products`)
    let Products = await res.json()

    return Products;
}

// گرفتن اطلاعات مورد نظر از محصول
let getProductData = async (element) => {    
    let card = element.closest(".swiper-slide");
    let product = await getProductDataDB(card)    
    
    // دریافت اطلاعات کاربر از دیتابیس
    let user = await getUserDataDB();    
    if (!user || user.length === 0) {
        console.error("No user found with the given name.");
        return null;
    }

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
        user_id: user[0].id, // ID کاربر از دیتابیس
        product_id: product.id,
    };
};

// تابع دریافت اطلاعات کاربر از دیتابیس
let getUserDataDB = async () => {
    try {
        let userName = getLocalStorage("login");
        if (!userName) {
            console.error("No user is logged in.");
            return null;
        }

        let res = await fetch(`http://localhost:4000/users`);
        if (!res.ok) {
            throw new Error("Failed to fetch users data.");
        }

        let data = await res.json();
        let getUser = data.find((user) => user.name === userName);

        return getUser; // برگشت لیست کاربرانی که نام آنها با userName مطابقت دارد
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return null;
    }
};

let getProductDataDB = async (card) => {
    // دریافت اطلاعات تمام محصولات
    let Products = await allProduct()

    let productNameTarget = card.querySelector(".box-discription h6").textContent
    let findProductToDB = Products.find(product => product.name === productNameTarget)
    
    return findProductToDB;
}

// 🛒 تابع تغییر دکمه "افزودن به سبد خرید" با کلیک روی ان
async function toggleAddCart(event) {    
    // let addCart = getLocalStorage('cart');    
    // let product = getProductData(event.target);
    let card = event.target.closest('.swiper-slide')    
    let product = await getProductDataDB(card)    

    let res = await fetch('http://localhost:4000/carts')
    let data = await res.json()
    
    // 🛒 بررسی وجود یا عدم وجود محصول در سبد خرید
    let index = data.findIndex(item => item.id == product.id);    
    
    
    if (index === -1) {
                 
        // 🛒 افزودن محصول به سبد خرید
        card.querySelector('.add-cart').classList.add("text-bg-primary");
        card.querySelector('.add-cart p').textContent = "به سبد اضافه شد"
    } 
}

// تابع افزودن محصول به سبد خرید
function handleAddToCart(event) {    
    // let product = getProductData(event.target);
    
    addToCart(event); // فراخوانی تابع ساخت و افزودن به سبد خرید
    toggleAddCart(event) // "فراخوانی تغییر دکمه "افزودن به سبد خرید
}


let getIDProductMarkedToJson = async (element) => {
    let card = await element.closest(".swiper-slide");
    let product = await getProductDataDB(card)
    let user = await getUserDataDB();
    return {
        id: Date.now().toString(36),
        product_name: card.querySelector(".box-discription h6").textContent,
        user_id: user.id,
        product_id: product.id,
    };
}

let addToDataBase = async () => {
    let res = await fetch('http://localhost:4000/products' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    let data = await res.json()
}

// تابع مریوط به دکمه های باکس محصول
let clickButtonsProduct = async () => {

    //🧺 دکمه افزودن به سبد خرید
    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    //➡️ دکمه حرکت سمت راست
    document.querySelectorAll('.glide__arrow--right').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.children[0].style.color = '#2563eb';
            btn.previousElementSibling.children[0].style.color = '#75757533';
        });
    });

    //⬅️ دکمه حرکت سمت چپ
    document.querySelectorAll('.glide__arrow--left').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.children[0].style.color = '#2563eb';
            btn.nextElementSibling.children[0].style.color = '#75757533';
        });
    });
}

export {getProductData , handleAddToCart , toggleAddCart , getIDProductMarkedToJson , clickButtonsProduct , allProduct , getProductDataDB , getUserDataDB}
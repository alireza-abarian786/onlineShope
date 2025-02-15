import { addToCart } from "./cart.js";
import { getLocalStorage , setLocalStorage } from "./storage.js";

// گرفتن اطلاعات مورد نظر از محصول
function getProductData(element) {
    let card = element.closest(".swiper-slide"); 
    return {
        id: Date.now(),
        image: card.querySelector(".box-img img").src,
        title: card.querySelector(".box-discription h6").textContent,
        description: card.querySelector(".box-discription p").textContent,
        price: parseInt(card.querySelector(".box-price .price span").textContent),
        discount: card.querySelector(".box-price .discount span") ? parseInt(card.querySelector(".box-price .discount span").textContent) : 0,
        score: parseInt(card.querySelector(".box-discription span").textContent),
    };
}

// 🛒 تابع تغییر دکمه "افزودن به سبد خرید" با کلیک روی ان
function toggleAddCart(event) {    
    let product = getProductData(event.target);
    let addCart = getLocalStorage('cart');    
    
    // 🛒 بررسی وجود یا عدم وجود محصول در سبد خرید
    let index = addCart.findIndex(item => item.title === product.title);
    let card = event.target.closest('.swiper-slide')    
    
    if (index === -1) {         
        // 🛒 افزودن محصول به سبد خرید
        card.querySelector('.add-cart').classList.add("text-bg-primary");
        card.querySelector('.add-cart p').textContent = "به سبد اضافه شد"
    } 

    // افزودن به لوکال
    setLocalStorage('cart', addCart);
}

// تابع افزودن محصول به سبد خرید
function handleAddToCart(event) {    
    let product = getProductData(event.target);
    
    toggleAddCart(event) // "فراخوانی تغییر دکمه "افزودن به سبد خرید
    addToCart(product); // فراخوانی تابع ساخت و افزودن به سبد خرید
}


let getIDProductMarkedToJson = (element) => {
    let card = element.closest(".swiper-slide");
    return {
        id: Date.now(),
        title: card.querySelector(".box-discription h6").textContent,
    };
}

let addToDataBase = async () => {
    let res = await fetch('http://localhost:3000/products' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    let data = await res.json()
}

export {getProductData , handleAddToCart , toggleAddCart , getIDProductMarkedToJson}
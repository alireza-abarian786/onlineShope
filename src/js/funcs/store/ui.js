import { initTooltips , fetchDataFromApi} from "../utils.js";
import { attachCartEventListeners , fetchUserLogged} from "./cart.js";
import { clickAddBookMark} from "./bookMarks.js";
import { settingSliderGlide , settingSliderSwiper } from "../sliders.js";
import { attachProductEventListeners , extractProductTitle} from "./box.js";
import { buttonsShoppingCart } from "../../shoppingCart.js";

//! 🛒 تابع نمایش یا عدم نمایش نوتیف سبد خرید
async function updateCartNotification() {
  let userLogged = await fetchUserLogged()
  let data = await fetchDataFromApi(`https://onlineshope.onrender.com/api/carts/${userLogged.id}`);               //* دریافت لیست کل سبد خرید  
  console.log(await data.items.length);
  
  let notifCart = document.querySelector('.notif-cart');
  notifCart.classList.toggle('is-notif', data.items.length > 0);
}

//! 🛒 تابع ساخت باکس محصول در سبد خرید
async function renderCartItems(cartItems) {    
    const container = document.querySelector('.cantain-box-goods');
    container.innerHTML = '';                                                                   //? پاک کردن آیتم‌های قبلی                                                                              
    cartItems.forEach((item) => {                                                              //?🛒 ساخت باکس محصول و افزودن به سبد خرید           
        const cartHTML = `
            <div class="box-goods d-flex align-items-end swiper-slide" data-id="${item.id}" style='transform: translateY(0);'>
                <div>
                    <span class="plus-btn">+</span>
                    <span class="number">${item.quantity ? item.quantity : 1}</span>
                    <span class="minus-btn">-</span>
                </div>
                <div class=''>
                    <div class='box-info-product h-100 d-flex flex-column align-items-center'>
                    
                        <div class='row w-100 h-100'>
                            <div class='col'>
                                <div class='row'>
                                    <div class='col-1 p-0'>
                                        <button type="button" class="btn btn-danger mb-1 rounded remove-btn"><i class="bi bi-x-circle-fill"></i></button>
                                    </div>
                                    <div class='col-11 pe-1'>
                                        <h6 class='bg-white rounded text-center'>${item.product_name}</h6>
                                    </div>
                                </div>
                                <div class='row'>
                                    <p class='text-white fw-light px-2 m-0 rounded'>${item.product_description}</p>
                                </div>
                            </div>
                            <div class='col-4 p-0'>
                                <img src="${item.product_images[0]}" alt="img" class='rounded w-100 h-100'>
                            </div>
                        </div>
                    </div>
                    <div class='w-100 text-start text-white px-2 pt-3 pb-1 rounded d-flex justify-content-between'>
                        <span class='d-flex'>
                            تومان
                            <span class='price ms-1 total-price'>${item.totalPrice.toLocaleString()}</span>
                        </span>
                        <span>:قیمت محصول</span>
                    </div>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('afterbegin', cartHTML);
    });

    attachCartEventListeners();                                                                   //?🛒  فراخوانی تابع فعال کردن دکمه های سبد خرید 
    initTooltips()                                                                               //? فعال‌سازی تمام تولتیپ‌ها
}

// ! ساخت باکس های محصولات داخل صفحه ی سبد خرید
let createBoxToPageCart = async (shoppingCartProduct) => {
  
  if (document.querySelector('.container-Product-cards')) {
    document.querySelector('.container-Product-cards').textContent = ''; 

    if (shoppingCartProduct.length) {
      shoppingCartProduct.forEach(async box => {      
        document.querySelector('.container-Product-cards').insertAdjacentHTML('beforeend' , `
                  <div class="cart-item swiper-slide">
                <button class="delete-btn"><i class="bi bi-trash3"></i>&nbsp حذف</button>
                <div class="product-image">
                  <div class="swiper-container mySwiper5 h-100 w-100 position-relative overflow-hidden">
    
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><img src="${box.product_images[0]}" alt="محصول 1"></div>
                        <div class="swiper-slide"><img src="${box.product_images[1]}" alt="محصول 2"></div>
                        <div class="swiper-slide"><img src="${box.product_images[2]}" alt="محصول 3"></div>
                    </div>
                    <!-- کنترل‌های اسلایدر -->
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                  </div> 
                </div>
                <div class="product-description">
                    <div class="product-title product-title-cart">${box.product_name}</div>
                    <div class="product-Specifications">
                        <span>رنگ: سیاه</span>
                        <span>وزن: ۱.۵ کیلوگرم</span>
                    </div>
                    <div class="score">
                        ${await createStars(box.product_ratings)}
                        <span>(${box.product_ratings})</span>
                    </div>
                    <div class="description">${box.product_description}</div>
                    <div class="price-contain">
                        <div class="product-price-cart">قیمت واحد: ${box.price.toLocaleString()} تومان</div>
                        <div class="discount">${box.discount ? box.discount.toLocaleString() + ' :قیمت با تخفیف' : ''}</div>
                    </div>
                    <div class="container-total">
                      <img src="src/assets/images/home.png" alt="لوگوی برند" class="brand-logo">
                      <div class="total-price-container">جمع: 
                        <span class="total-price">${box.totalPrice.toLocaleString()}</span>
                       تومان
                      </div>
                      <div class="quantity-box">
                          <button class="quantity-btn"><i class="bi bi-dash-lg"></i></button>
                          <span class="quantity-value number">${box.quantity}</span>
                          <button class="quantity-btn"><i class="bi bi-plus-lg"></i></button>
                      </div>
                    </div>
                </div>
            </div>
        `)
  
        settingSliderSwiper();
        settingSliderGlide();
        attachProductEventListeners();
        clickAddBookMark();
        buttonsShoppingCart()
      })
      
    } else {
      document.querySelector('.container-Product-cards').textContent = ''; 
      document.querySelector('.container-Product-cards').insertAdjacentHTML('beforeend', `<div class='alert alert-danger w-100 text-center border-0'>:(     هیچ محصولی در سبد خرید شما موجود نمیباشد    ):</div>`)
    }
  }
}

let createStars = async (rating) => {  
  return Array.from({length:5} , (_ , i) => {
    if (i < Math.floor(rating)) {
      return `<i class="bi bi-star-fill"></i>`
    } else if (i - 1 < rating && i >= Math.floor(rating)) {
      let percentage = (rating % 1) * 100
      return `<i class='bi bi-star-fill' style="clip-path: inset(0 ${100 - percentage}% 0 0 );"></i>`
    } else {
      return `<i class="bi bi-star"></i>`
    }
  }).join('')
}



//! modal تابع ساخت و نمایش
let showModal = (text) => {                                                                                        
    let toastContainer = document.querySelector(".toast-container");                        
    if (!toastContainer) {                                                              //?💭 اگر المان نبود، بساز و نمایش پیغام وجود محصول در سبد خرید 
        document.body.insertAdjacentHTML("beforeend", `
            <div class="toast-container position-fixed top-0 end-0 p-3">
                <div id="liveToast" class="toast text-bg-primary w-auto" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong>باخرز استور</strong>
                    <small class="ms-auto">اکنون</small>
                    <button type="button" class="btn-close mx-1" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${text}</div>
                </div>
            </div>
        `);
    }

    
    let toastLive = document.getElementById("liveToast");                                      //? و نمایش آن `Toast` مقداردهی به
    if (toastLive) {
        let toastBootstrap = new bootstrap.Toast(toastLive);
        toastBootstrap.show();
    }

    document.querySelector(".toast-body").innerHTML = text
}

// ! اعمال تغییرات دکمه بعد از افزودن محصول سبد خرید
let changeBtnAfterAdd = async (element) => {
    let card = element.closest('.swiper-slide') 
    if (card.querySelector('.add-cart p')) {
        card.querySelector('.btn-cart-box').classList.add("add-cart-active-btn");                                     //* اعمال کلاس جدید کلید سبد خرید 
        card.querySelector(".add-cart > p").textContent = "به سبد اضافه شد"                                         //* عنوان کلید سبد خرید 
        card.querySelector(".add-cart > p").classList.add('add-cart-active-content')                                //* اعمال کلاس جدید به عنوان کلید سبد خرید                                                     
        card.querySelector(".add-cart > svg").classList.add('add-cart-active-content')                             //* اعمال کلاس جدید به ایکون کلید سبد خرید                                                       
    } else {
        card.querySelector('.btn-cart-box').classList.add("buy-button-active");
        card.querySelector('.btn-cart-box').textContent = "🧺 به سبد اضافه شد"        
    }
}

// ! اعمال تغییرات دکمه بعد از حذف محصول از سبد خرید
let changeBtnAfterDelete = async (element) => {  
  document.querySelectorAll('.product-box').forEach(async box => {                                    
    let titleBox = await extractProductTitle(element)                                                                     //* دریافت عنوان محصول
    let titleCart = await extractProductTitle(box)                                                                       //* دریافت عنوان کارت
    let card = box.closest('.swiper-slide')                                                                             //* دریافت کارت محصول
  
    if (titleCart === titleBox) {                                                                                     //* اگر عنوان محصول و عنوان کارت یکی بود
      if (card.querySelector('.add-cart p')) {                                                                       //* حالت ستونی
          card.querySelector('.btn-cart-box').classList.remove("add-cart-active-btn");                              //* اعمال کلاس جدید کلید سبد خرید 
          card.querySelector(".add-cart > p").textContent = "اضافه به سبد خرید"                                   //* عنوان کلید سبد خرید 
          card.querySelector(".add-cart > p").classList.remove('add-cart-active-content')                         //* اعمال کلاس جدید به عنوان کلید سبد خرید                                                     
          card.querySelector(".add-cart > svg").classList.remove('add-cart-active-content')                      //* اعمال کلاس جدید به ایکون کلید سبد خرید                                                       
      } else {                                                                                                  //* حالت ردیفی
          card.querySelector('.btn-cart-box').classList.remove("buy-button-active");
          card.querySelector('.btn-cart-box').textContent = "اضافه به سبد خرید"        
      }
    }
  })
}

//! ✅ تابع بررسی وضعیت در سبد خرید بودن یا نبودن محصولات و اعمال تغییرات متناسب
async function initializeStatusCarts() {    
  let userLogged = await fetchUserLogged()
  let Carts = await fetchDataFromApi(`https://onlineshope.onrender.com/api/carts/${userLogged.id}`);               //* دریافت لیست کل سبد خرید                                                                         //? دریافت اطلاعات تمام بوکمارک‌ها
  document.querySelectorAll('.btn-cart-box').forEach(async btn => {                                //?🧺🔖 دسترسی به باکس تمام محصولات             
    let title = await extractProductTitle(btn)                                                           //? دریافت عنوان محصول
    if (Carts.items.some(item => item.product_name === title)) {                                       //? اگر محصول در لیست سبد خرید بود
      changeBtnAfterAdd(btn)      
    }
  });
}

//! ✅ تابع بررسی وضعیت بوکمارک بودن یا نبودن محصولات و اعمال تغییرات متناسب
async function initializeStatusMarks() {    
  let Marks = await fetchDataFromApi('https://onlineshope.onrender.com/api/bookmarks');                                                          //? دریافت اطلاعات تمام بوکمارک‌ها 
  document.querySelectorAll('.icon-bookmark').forEach( async btn => {                     //? 🧺🔖 دسترسی به تمام بوکمارک ها و سبد خرید   
    let title = await extractProductTitle(btn)                                                  //? دریافت عنوان محصول
    if (Marks.some(item => item.product_name === title)) {                              //? اگر محصول در لیست بوکمارک‌ ها بود
        btn.parentElement.classList.add('is-mark');                                    //? اعمال کلاس جدید برای نشان دادن وضعیت
        btn.parentElement.classList.remove('not-mark');                               //? حذف کلاس قبلی
    }
  });
}


//! ساخت باکس محصولات صفحه اصلی 
let createProductsAppliances = (element, arrAppliances) => {
  if (!element) {
    console.error("❌ Container is not defined:", container);
    return;
  }

  if (!Array.isArray(arrAppliances) || arrAppliances.length === 0) {
    console.warn("⚠️ No products to display for this category.");
    return;
  }
    arrAppliances.forEach((box) => {
        element.insertAdjacentHTML(
        "beforeend",
        `
                <div class="swiper-slide glide product-box">
                <div class="box-img" class="glide__track" data-glide-el="track">
                    <ul class="glide__slides h-100">
                    <li class="glide__slide">
                        <img
                        src="${box.images[0]}"
                        alt="Slide 1"
                        />
                    </li>
                    <li class="glide__slide">
                        <img
                        src="${box.images[1]}"
                        alt="Slide 2"
                        />
                    </li>
                    <li class="glide__slide">
                        <img
                        src="${box.images[2]}"
                        alt="Slide 3"
                        />
                    </li>
                    </ul>
                    <div class="not-mark mark-contain">
                    <svg
                        class="icon-bookmark"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                        fill="currentColor"
                        d="M17.6 21.945a1.483 1.483 0 0 1-1.01-.4l-4.251-3.9a.5.5 0 0 0-.68 0l-4.25 3.9a1.5 1.5 0 0 1-2.516-1.1V4.57a2.5 2.5 0 0 1 2.5-2.5h9.214a2.5 2.5 0 0 1 2.5 2.5v15.872a1.481 1.481 0 0 1-.9 1.374a1.507 1.507 0 0 1-.607.129M12 16.51a1.5 1.5 0 0 1 1.018.395l4.251 3.9a.5.5 0 0 0 .839-.368V4.57a1.5 1.5 0 0 0-1.5-1.5H7.393a1.5 1.5 0 0 0-1.5 1.5v15.872a.5.5 0 0 0 .839.368l4.251-3.91A1.5 1.5 0 0 1 12 16.51"
                        />
                    </svg>
                    </div>
                </div>
                <div>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-width="2"
                        >
                        <path
                            stroke-dasharray="2 4"
                            stroke-dashoffset="6"
                            d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"
                        >
                            <animate
                            attributeName="stroke-dashoffset"
                            dur="0.6s"
                            repeatCount="indefinite"
                            values="6;0"
                            />
                        </path>
                        <path
                            stroke-dasharray="30"
                            stroke-dashoffset="30"
                            d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"
                        >
                            <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.1s"
                            dur="0.3s"
                            values="30;0"
                            />
                        </path>
                        <path
                            stroke-dasharray="10"
                            stroke-dashoffset="10"
                            d="M12 8v7.5"
                        >
                            <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.5s"
                            dur="0.2s"
                            values="10;0"
                            />
                        </path>
                        <path
                            stroke-dasharray="6"
                            stroke-dashoffset="6"
                            d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5"
                        >
                            <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.7s"
                            dur="0.2s"
                            values="6;0"
                            />
                        </path>
                        </g>
                    </svg>

                    <a href="#">تصاویر دیگر محصول</a>
                    </div>

                    <div
                    class="next-img-box glide__arrows"
                    data-glide-el="controls"
                    >
                    <div class="glide__arrow--left" data-glide-dir="<">
                        <svg
                        class="pretive"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        >
                        <path
                            fill="currentColor"
                            d="M497.333 239.999H80.092l95.995-95.995l-22.627-22.627L18.837 256L153.46 390.623l22.627-22.627l-95.997-95.997h417.243z"
                        />
                        </svg>
                    </div>

                    <div class="glide__arrow--right" data-glide-dir=">">
                        <svg
                        class="next"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        >
                        <path
                            fill="currentColor"
                            d="m359.873 121.377l-22.627 22.627l95.997 95.997H16v32.001h417.24l-95.994 95.994l22.627 22.627L494.498 256z"
                        />
                        </svg>
                    </div>
                    </div>
                </div>

                <div class="box-discription">
                    <h6>${box.name}</h6>
                    <p class="m-0">${box.description}</p>
                    <div class="box-star">
                    <span>${box.ratings}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                        fill="currentColor"
                        d="m10.833 8.142l1.8-3.57a1.64 1.64 0 0 1 1.49-.92c.306 0 .606.09.86.26c.251.166.452.398.58.67l1.76 3.57l.11.08l3.92.57c.302.04.586.165.82.36c.234.205.41.467.51.76a1.66 1.66 0 0 1 0 .91a1.57 1.57 0 0 1-.44.77l-2.84 2.77a.11.11 0 0 0 0 .11l.68 3.93c.047.297.016.6-.09.88a1.7 1.7 0 0 1-1.4 1.05a1.59 1.59 0 0 1-.91-.2l-3.38-1.77l-.17-.07h-.14l-3.52 1.84a1.61 1.61 0 0 1-.76.19h-.17a1.7 1.7 0 0 1-.84-.32a1.54 1.54 0 0 1-.55-.71a1.61 1.61 0 0 1 0-1l.66-3.81a.491.491 0 0 0 0-.11h-.05l-2.82-2.74a1.69 1.69 0 0 1-.46-.8a1.62 1.62 0 0 1 .53-1.65a1.59 1.59 0 0 1 .83-.36l3.87-.57zm-2.83-2h-6a.75.75 0 0 1 0-1.5h6a.75.75 0 1 1 0 1.5m-3 12.07h-3a.75.75 0 1 1 0-1.5h3a.75.75 0 1 1 0 1.5m-1.46-5.77h-1.5a.75.75 0 1 1 0-1.5h1.5a.75.75 0 1 1 0 1.5"
                        />
                    </svg>
                    </div>
                </div>

                <div class="box-price d-flex align-items-center w-100">
                    <div class="m-0 d-flex w-100 justify-content-center flex-column align-items-center">
                    ${
                        !box.discount
                        ? 
                        `<span class="price text-bg-primary rounded fw-bold px-2 position-relative d-flex align-items-center">
                          تومان
                          <span class="ms-1 lead fs-6">${box.price.toLocaleString()}</span>
                          &nbsp&nbsp:قیمت محصول
                        </span>`
                        : 
                        `<span class="price price-before position-relative d-flex align-items-center">
                          تومان
                          <span class="ms-1 lead fs-6">${box.price.toLocaleString()}</span>
                          </span>
                          <span class="discount d-flex text-white">
                          تومان
                          <span class="ms-1">${box.discount.toLocaleString()}</span>
                          &nbsp&nbsp:قیمت با تخفیف
                        </span>`
                    }
                    </div>
                </div>

                <div class="add-cart btn-cart-box" type="button" id="liveToastBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path
                        fill="currentColor"
                        d="M4 7a1 1 0 0 0 0 2h2.22l2.624 10.5c.223.89 1.02 1.5 1.937 1.5h12.47c.903 0 1.67-.6 1.907-1.47L27.75 10h-2.094l-2.406 9H10.78L8.157 8.5A1.984 1.984 0 0 0 6.22 7zm18 14c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m-9 0c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m3-14v3h-3v2h3v3h2v-3h3v-2h-3V7zm-3 16c.564 0 1 .436 1 1c0 .564-.436 1-1 1c-.564 0-1-.436-1-1c0-.564.436-1 1-1m9 0c.564 0 1 .436 1 1c0 .564-.436 1-1 1c-.564 0-1-.436-1-1c0-.564.436-1 1-1"
                    />
                    </svg>
                    <p>اضافه به سبد خرید</p>
                </div>
                </div>
                
            `
        );
    });

    settingSliderSwiper();
    settingSliderGlide();
    attachProductEventListeners();
    clickAddBookMark();
};

//! ساخت باکس مقالات صفحه اصلی 
let createBlogs = async (element) => {    
    let res = await fetch("https://onlineshope.onrender.com/api/blogs");
    let result = await res.json();
  
    result.forEach((blog) => {
        element.insertAdjacentHTML(
        "beforeend",`
              <div class="swiper-slide">
                <div class="pt-3">
                  <img src="${blog.image}" alt="image" />
                </div>
    
                <div>
                  <h6>${blog.title}</h6>
                  <p>${blog.content}</p>
                  <a href="./blog.html">
                    <p class="mb-1">مطالعه مقاله</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path
                        fill="currentColor"
                        d="M529.408 149.376a29.12 29.12 0 0 1 41.728 0a30.59 30.59 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672zm256 0a29.12 29.12 0 0 1 41.728 0a30.59 30.59 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
        `);
    });
  };


//! category ایجاد باکس‌ های محصولات به صورت ستونی داخل صفحه
let createBox = (arrCategory) => {  
  document.querySelector('.cantainer-category__footer').innerHTML = ''                                          //? پاک کردن محتوای قبلی

  if (arrCategory.length) {                                                                                   //? اگر محصولی وجود داشت، نمایش بده
    arrCategory.forEach(product => {                         
      document.querySelector('.cantainer-category__footer').insertAdjacentHTML('beforeend', `
                <div class="swiper-slide glide product-box">
                  <div class="box-img" class="glide__track" data-glide-el="track">
                    <ul class="glide__slides h-100">
                      <li class="glide__slide">
                        <img
                          src="${product.images[0]}"
                          alt="Slide 1"
                        />
                      </li>
                      <li class="glide__slide">
                        <img
                          src="${product.images[1]}"
                          alt="Slide 2"
                        />
                      </li>
                      <li class="glide__slide">
                        <img
                          src="${product.images[2]}"
                          alt="Slide 3"
                        />
                      </li>
                    </ul>
                    <div class="not-mark mark-contain">
                      <svg
                        class="icon-bookmark"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M17.6 21.945a1.483 1.483 0 0 1-1.01-.4l-4.251-3.9a.5.5 0 0 0-.68 0l-4.25 3.9a1.5 1.5 0 0 1-2.516-1.1V4.57a2.5 2.5 0 0 1 2.5-2.5h9.214a2.5 2.5 0 0 1 2.5 2.5v15.872a1.481 1.481 0 0 1-.9 1.374a1.507 1.507 0 0 1-.607.129M12 16.51a1.5 1.5 0 0 1 1.018.395l4.251 3.9a.5.5 0 0 0 .839-.368V4.57a1.5 1.5 0 0 0-1.5-1.5H7.393a1.5 1.5 0 0 0-1.5 1.5v15.872a.5.5 0 0 0 .839.368l4.251-3.91A1.5 1.5 0 0 1 12 16.51"
                        />
                      </svg>
                    </div>
                  </div>
  
                  <div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-width="2"
                        >
                          <path
                            stroke-dasharray="2 4"
                            stroke-dashoffset="6"
                            d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              dur="0.6s"
                              repeatCount="indefinite"
                              values="6;0"
                            />
                          </path>
                          <path
                            stroke-dasharray="30"
                            stroke-dashoffset="30"
                            d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.1s"
                              dur="0.3s"
                              values="30;0"
                            />
                          </path>
                          <path
                            stroke-dasharray="10"
                            stroke-dashoffset="10"
                            d="M12 8v7.5"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.5s"
                              dur="0.2s"
                              values="10;0"
                            />
                          </path>
                          <path
                            stroke-dasharray="6"
                            stroke-dashoffset="6"
                            d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.7s"
                              dur="0.2s"
                              values="6;0"
                            />
                          </path>
                        </g>
                      </svg>
  
                      <a href="#">تصاویر دیگر محصول</a>
                    </div>
  
                    <div
                      class="next-img-box glide__arrows"
                      data-glide-el="controls"
                    >
                      <div class="glide__arrow--left" data-glide-dir="<">
                        <svg
                          class="pretive"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M497.333 239.999H80.092l95.995-95.995l-22.627-22.627L18.837 256L153.46 390.623l22.627-22.627l-95.997-95.997h417.243z"
                          />
                        </svg>
                      </div>
  
                      <div class="glide__arrow--right" data-glide-dir=">">
                        <svg
                          class="next"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="m359.873 121.377l-22.627 22.627l95.997 95.997H16v32.001h417.24l-95.994 95.994l22.627 22.627L494.498 256z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
  
                  <div class="box-discription">
                    <h6 class='fw-bold'>${product.name}</h6>
                    <p class="m-0">${product.description}</p>
                    <div class="box-star">
                      <span>${product.ratings}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="m10.833 8.142l1.8-3.57a1.64 1.64 0 0 1 1.49-.92c.306 0 .606.09.86.26c.251.166.452.398.58.67l1.76 3.57l.11.08l3.92.57c.302.04.586.165.82.36c.234.205.41.467.51.76a1.66 1.66 0 0 1 0 .91a1.57 1.57 0 0 1-.44.77l-2.84 2.77a.11.11 0 0 0 0 .11l.68 3.93c.047.297.016.6-.09.88a1.7 1.7 0 0 1-1.4 1.05a1.59 1.59 0 0 1-.91-.2l-3.38-1.77l-.17-.07h-.14l-3.52 1.84a1.61 1.61 0 0 1-.76.19h-.17a1.7 1.7 0 0 1-.84-.32a1.54 1.54 0 0 1-.55-.71a1.61 1.61 0 0 1 0-1l.66-3.81a.491.491 0 0 0 0-.11h-.05l-2.82-2.74a1.69 1.69 0 0 1-.46-.8a1.62 1.62 0 0 1 .53-1.65a1.59 1.59 0 0 1 .83-.36l3.87-.57zm-2.83-2h-6a.75.75 0 0 1 0-1.5h6a.75.75 0 1 1 0 1.5m-3 12.07h-3a.75.75 0 1 1 0-1.5h3a.75.75 0 1 1 0 1.5m-1.46-5.77h-1.5a.75.75 0 1 1 0-1.5h1.5a.75.75 0 1 1 0 1.5"
                        />
                      </svg>
                    </div>
                  </div>
  
                <div class="box-price d-flex align-items-center w-100">
                    <div class="m-0 d-flex w-100 justify-content-center flex-column align-items-center">
                    ${
                        !product.discount
                        ? 
                        `<span class="price text-bg-primary rounded fw-bold px-2 position-relative d-flex align-items-center">
                          تومان
                          <span class="ms-1 lead fs-6">${product.price.toLocaleString()}</span>
                          &nbsp&nbsp:قیمت محصول
                        </span>`
                        : 
                        `<span class="price price-before position-relative d-flex align-items-center">
                          تومان
                          <span class="ms-1 lead fs-6">${product.price.toLocaleString()}</span>
                          </span>
                          <span class="discount d-flex text-white">
                          تومان
                          <span class="ms-1">${product.discount.toLocaleString()}</span>
                          &nbsp&nbsp:قیمت با تخفیف
                        </span>`
                    }
                    </div>
                </div>
  
                  <div class="add-cart btn-cart-box" type="button" id="liveToastBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path
                        fill="currentColor"
                        d="M4 7a1 1 0 0 0 0 2h2.22l2.624 10.5c.223.89 1.02 1.5 1.937 1.5h12.47c.903 0 1.67-.6 1.907-1.47L27.75 10h-2.094l-2.406 9H10.78L8.157 8.5A1.984 1.984 0 0 0 6.22 7zm18 14c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m-9 0c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m3-14v3h-3v2h3v3h2v-3h3v-2h-3V7zm-3 16c.564 0 1 .436 1 1c0 .564-.436 1-1 1c-.564 0-1-.436-1-1c0-.564.436-1 1-1m9 0c.564 0 1 .436 1 1c0 .564-.436 1-1 1c-.564 0-1-.436-1-1c0-.564.436-1 1-1"
                      />
                    </svg>
                    <p class='m-0'>اضافه به سبد خرید</p>
                  </div>
                </div>
          
      `);
          
      settingSliderGlide();
      attachProductEventListeners();
      clickAddBookMark();
    });

  } else {                                                                                                    //? اگر محصولی پیدا نشد، پیام خطا نمایش بده
    document.querySelector('.cantainer-category__footer').insertAdjacentHTML('beforeend', `<div class='alert alert-danger w-100 text-center'>:(     کالای مورد نظر شما یافت نشد     ):</div>`)
  }
}

//! category ایجاد باکس‌ های محصولات به صورت ردیفی داخل صفحه
let createBoxRow = (arrCategory) => {
  document.querySelector('.cantainer-category__footer').innerHTML = ''                               //? پاک کردن محتوای قبلی

  if (arrCategory.length) {                                                                         //? اگر محصولی وجود داشت، نمایش بده
    arrCategory.forEach(async product => {                         
      document.querySelector('.cantainer-category__footer').insertAdjacentHTML('beforeend', `

                    <div class="product-card swiper-slide h-100 product-box">
                      <div class="product-image-container">
                        <div class="swiper-container mySwiper5 h-100">

                          <div class="not-mark mark-contain">
                            <svg class="icon-bookmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M17.6 21.945a1.483 1.483 0 0 1-1.01-.4l-4.251-3.9a.5.5 0 0 0-.68 0l-4.25 3.9a1.5 1.5 0 0 1-2.516-1.1V4.57a2.5 2.5 0 0 1 2.5-2.5h9.214a2.5 2.5 0 0 1 2.5 2.5v15.872a1.481 1.481 0 0 1-.9 1.374a1.507 1.507 0 0 1-.607.129M12 16.51a1.5 1.5 0 0 1 1.018.395l4.251 3.9a.5.5 0 0 0 .839-.368V4.57a1.5 1.5 0 0 0-1.5-1.5H7.393a1.5 1.5 0 0 0-1.5 1.5v15.872a.5.5 0 0 0 .839.368l4.251-3.91A1.5 1.5 0 0 1 12 16.51"></path>
                            </svg>
                          </div>

                          <div class="swiper-wrapper">
                              <div class="swiper-slide"><img src="${product.images[0]}" alt="محصول 1"></div>
                              <div class="swiper-slide"><img src="${product.images[1]}" alt="محصول 2"></div>
                              <div class="swiper-slide"><img src="${product.images[2]}" alt="محصول 3"></div>
                          </div>
                          <!-- کنترل‌های اسلایدر -->
                          <div class="swiper-button-prev"></div>
                          <div class="swiper-button-next"></div>
                        </div>    
                      </div>

                      <div class="product-info">
                          <div class="product-title product-title-category">${product.name}</div>
                          <div class="product-rating">
                            ${await createStars(product.ratings)}
                            <span class='text-body'>(${product.ratings})</span>
                          </div>
                          <div class="product-description">${product.description}</div>
                          <div class="price-container">

                          ${
                              !product.discount
                              ? 
                              `<span class="price text-bg-primary rounded fw-bold px-2 position-relative d-flex align-items-center">
                                تومان
                                <span class="ms-1 lead p-2 fs-6">${product.price.toLocaleString()}</span>
                                &nbsp&nbsp:قیمت محصول
                              </span>`
                              : 
                              `<span class="price price-before position-relative d-flex align-items-center">
                                تومان
                                <span class="ms-1 lead fs-6">${product.price.toLocaleString()}</span>
                                </span>
                                <span class="discount d-flex text-white p-2 fs-6">
                                تومان
                                <span class="ms-1">${product.discount.toLocaleString()}</span>
                                &nbsp&nbsp:قیمت با تخفیف
                              </span>`
                          }

                          </div>
                          <div class="btn-cart-box buy-button">اضافه به سبد خرید</div>
                          <div class="product-features">
                              <div class="feature-item"><i class="fa fa-battery-full"></i> باتری 4000 میلی‌آمپر</div>
                              <div class="feature-item"><i class="fa fa-camera"></i> دوربین 64 مگاپیکسل</div>
                              <div class="feature-item"><i class="fa fa-mobile"></i> صفحه نمایش 6.2 اینچ</div>
                          </div>
                      </div>
                    </div>
      `);

      settingSliderSwiper();
      attachProductEventListeners();
      clickAddBookMark();
    });

  } else {                                                                                          //? اگر محصولی پیدا نشد، پیام خطا نمایش بده
    document.querySelector('.cantainer-category__footer').insertAdjacentHTML('beforeend', `<div class='alert alert-danger w-100 text-center'>:( کالای مورد نظر شما یافت نشد ):</div>`)
  }
}

const updateArrowButtonColors = (btn, nextBtnColor, prevBtnColor) => {
    btn.children[0].style.color = nextBtnColor;
    if (btn.previousElementSibling) {
        btn.previousElementSibling.children[0].style.color = prevBtnColor;
    }
    if (btn.nextElementSibling) {
        btn.nextElementSibling.children[0].style.color = prevBtnColor;
    }
};

function updateBookmarkUI(card, isMarked) {
  if (isMarked) {
      card.querySelector('.mark-contain').classList.add("is-mark");                             //* تغییر استایل برای نمایش بوکمارک بودن
      card.querySelector('.mark-contain').classList.remove("not-mark");                         //* حذف استایل بوکمارک نبودن
  } else {
      card.querySelector('.mark-contain').classList.remove("is-mark");
      card.querySelector('.mark-contain').classList.add("not-mark");
  }
}


export {showModal , updateArrowButtonColors, updateBookmarkUI, renderCartItems, updateCartNotification ,changeBtnAfterAdd ,changeBtnAfterDelete , createBoxToPageCart, createBox , initializeStatusCarts , initializeStatusMarks , createProductsAppliances , createBlogs , createBoxRow}
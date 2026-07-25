import fakeBlogs from "../../data/BlogsData.js";
import { fakeFavorites } from "../../data/FavoriteData.js";  
import { settingSliderGlide, settingSliderSwiper } from "./sliders.js";
import { getLocalStorage } from "./storage.js";
//!---------------------------------------------------------------------- functions -------------------------------------------------------

//todo========================================================== modal تابع ساخت و نمایش
let showModal = (text) => {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    //?💭 اگر المان نبود، بساز و نمایش پیغام وجود محصول در سبد خرید
    document.body.insertAdjacentHTML(
      "beforeend",
      `
            <div class="toast-container position-fixed top-0 end-0 p-3">
                <div id="liveToast" class="toast text-bg-primary w-auto" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong>دیجی استور</strong>
                    <small class="ms-auto">اکنون</small>
                    <button type="button" class="btn-close mx-1" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${text}</div>
                </div>
            </div>
        `
    );
  }

  let toastLive = document.getElementById("liveToast"); //? و نمایش آن `Toast` مقداردهی به
  if (toastLive) {
    let toastBootstrap = new bootstrap.Toast(toastLive);
    toastBootstrap.show();
  }

  document.querySelector(".toast-body").innerHTML = text;
};

//todo========================================================== ساخت باکس مقالات صفحه اصلی
let createBlogs = async (element) => {
  const blogs = fakeBlogs.filter(blog => blog.isPublished);

  if (!element) {
    console.error("Element not found for blogs");
    return;
  }

  element.innerHTML = ""; // پاک کردن محتوای قبلی

  blogs.forEach((blog) => {
    element.insertAdjacentHTML(
      "beforeend",
      `
        <div class="swiper-slide card-content container-blog">
          <div class="w-100 blog-image-container">
            <img src="${blog.image}" 
                 alt="${blog.title}" 
                 loading="lazy"
                 onerror="this.src='src/assets/images/blog-2.webp'" />
          </div>

          <div class="blog-info">
            <div class="blog-meta">
              <span class="blog-category">${blog.categoryLabel}</span>
              <span class="blog-date">${blog.createdAt}</span>
              <span class="blog-readtime">${blog.readTime} دقیقه مطالعه</span>
            </div>
            
            <h6 class="blog-title">
              <a href="./blog.html?slug=${blog.slug}">${blog.title}</a>
            </h6>
            
            <p class="blog-excerpt">${blog.excerpt || blog.content.substring(0, 150) + '...'}</p>
            
            <div class="blog-footer">
              <div class="blog-author">
                <img src="${blog.author.avatar}" alt="${blog.author.name}" class="author-avatar" />
                <span>${blog.author.name}</span>
              </div>
              
              <div class="blog-stats">
                <span><i class="bi bi-eye"></i> ${blog.views.toLocaleString()}</span>
                <span><i class="bi bi-heart"></i> ${blog.likes}</span>
                <span><i class="bi bi-chat"></i> ${blog.comments.length}</span>
              </div>
            </div>
            
            <a href="./blog.html?slug=${blog.slug}" class="read-more-btn">
              مطالعه مقاله
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="16" height="16">
                <path fill="currentColor" d="M529.408 149.376a29.12 29.12 0 0 1 41.728 0a30.59 30.59 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672zm256 0a29.12 29.12 0 0 1 41.728 0a30.59 30.59 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672z"/>
              </svg>
            </a>
          </div>
        </div>
    `);
  });
  
  if (window.blogSwiper) {
    window.blogSwiper.update();
  }
};

// src/js/funcs/ui.js

//todo========================================================== ساخت باکس محصولات صفحه اصلی
const createProductsTemplateHtml = (element, arrProducts) => {  
    if (!element) {
        console.error("❌ element is not defined");
        return;
    }

    // پاک کردن کامل محتوا
    element.innerHTML = "";

    if (!Array.isArray(arrProducts) || arrProducts.length === 0) {
        console.warn("⚠️ No products to display for this arrProducts.");
        element.insertAdjacentHTML(
            "beforeend",
            `<div class='alert alert-danger w-100 text-center mt-5 d-flex justify-content-center align-items-center fs-3 h-25'>:(     کالای مورد نظر شما یافت نشد     ):</div>`
        );
        return;
    }

    arrProducts.forEach((box, index) => {
        // ============ اصلاح تصاویر ============
        const images = box.images || [
            box.image,
            box.thumbnail || box.image,
            box.image
        ];

        // ============ محاسبه تخفیف ============
        const discountPercent = box.discount || 0;
        const finalPrice = discountPercent > 0 
            ? box.price - (box.price * discountPercent / 100)
            : box.price;
        
        // ============ امتیاز ============
        const rating = box.rating || box.ratings || 0;

        // ✅ چک کردن اینکه محصول در سبد خرید هست یا نه
        const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: [] };
        const isInCart = cartData.products.some(item => item.product._id === box._id);

        element.insertAdjacentHTML(
            "beforeend",
            `<div class="swiper-slide glide product-box card-content" data-id="${box._id}">
                ${/* ✅ فقط اگه تخفیف داشته باشه نشون بده */''}
                ${
                    discountPercent > 0
                        ? `<div class='box-discount'>${discountPercent}%</div>`
                        : ""
                }
                
                <div class="box-img glide__track" data-glide-el="track">
                    <ul class="glide__slides h-100">
                        ${images.map((img, i) => `
                            <li class="glide__slide">
                                <img
                                    src="${img}"
                                    alt="${box.name} - تصویر ${i + 1}"
                                    ${i > 0 ? 'loading="lazy"' : ''}
                                    onerror="this.src='src/assets/images/placeholder.webp'"
                                />
                            </li>
                        `).join('')}
                    </ul>
                    
                    <div class="not-mark mark-contain" onclick="addToFavorites('${box._id}')">
                        <svg class="icon-bookmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M17.6 21.945a1.483 1.483 0 0 1-1.01-.4l-4.251-3.9a.5.5 0 0 0-.68 0l-4.25 3.9a1.5 1.5 0 0 1-2.516-1.1V4.57a2.5 2.5 0 0 1 2.5-2.5h9.214a2.5 2.5 0 0 1 2.5 2.5v15.872a1.481 1.481 0 0 1-.9 1.374a1.507 1.507 0 0 1-.607.129M12 16.51a1.5 1.5 0 0 1 1.018.395l4.251 3.9a.5.5 0 0 0 .839-.368V4.57a1.5 1.5 0 0 0-1.5-1.5H7.393a1.5 1.5 0 0 0-1.5 1.5v15.872a.5.5 0 0 0 .839.368l4.251-3.91A1.5 1.5 0 0 1 12 16.51"/>
                        </svg>
                    </div>
                </div>
                
                <div class="glide-controls">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <!-- SVG آیکون -->
                        </svg>
                        <a href="#">${box.images ? 'تصاویر دیگر محصول' : 'مشاهده محصول'}</a>
                    </div>

                    <div class="next-img-box glide__arrows" data-glide-el="controls">
                        <div class="glide__arrow--left" data-glide-dir="<">
                            <svg class="pretive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M497.333 239.999H80.092l95.995-95.995l-22.627-22.627L18.837 256L153.46 390.623l22.627-22.627l-95.997-95.997h417.243z"/>
                            </svg>
                        </div>
                        <div class="glide__arrow--right" data-glide-dir=">">
                            <svg class="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="m359.873 121.377l-22.627 22.627l95.997 95.997H16v32.001h417.24l-95.994 95.994l22.627 22.627L494.498 256z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="box-discription">
                    <h6>${box.name}</h6>
                    <p class="m-0">${box.description || box.excerpt || ''}</p>
                    <div class="box-star">
                        <span>${rating}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="m10.833 8.142l1.8-3.57a1.64 1.64 0 0 1 1.49-.92c.306 0 .606.09.86.26c.251.166.452.398.58.67l1.76 3.57l.11.08l3.92.57c.302.04.586.165.82.36c.234.205.41.467.51.76a1.66 1.66 0 0 1 0 .91a1.57 1.57 0 0 1-.44.77l-2.84 2.77a.11.11 0 0 0 0 .11l.68 3.93c.047.297.016.6-.09.88a1.7 1.7 0 0 1-1.4 1.05a1.59 1.59 0 0 1-.91-.2l-3.38-1.77l-.17-.07h-.14l-3.52 1.84a1.61 1.61 0 0 1-.76.19h-.17a1.7 1.7 0 0 1-.84-.32a1.54 1.54 0 0 1-.55-.71a1.61 1.61 0 0 1 0-1l.66-3.81a.491.491 0 0 0 0-.11h-.05l-2.82-2.74a1.69 1.69 0 0 1-.46-.8a1.62 1.62 0 0 1 .53-1.65a1.59 1.59 0 0 1 .83-.36l3.87-.57zm-2.83-2h-6a.75.75 0 0 1 0-1.5h6a.75.75 0 1 1 0 1.5m-3 12.07h-3a.75.75 0 1 1 0-1.5h3a.75.75 0 1 1 0 1.5m-1.46-5.77h-1.5a.75.75 0 1 1 0-1.5h1.5a.75.75 0 1 1 0 1.5"/>
                        </svg>
                    </div>
                </div>
                
                <div class="box-price d-flex align-items-center w-100">
                    <div class="m-0 d-flex w-100 justify-content-center flex-column align-items-center">
                        ${
                            discountPercent === 0
                                ? `<span class="price d-flex">
                                        تومان
                                        <span class="ms-1">${box.price.toLocaleString()}</span>
                                          :قیمت محصول
                                    </span>`
                                : `<span class="price price-before position-relative d-flex align-items-center">
                                        تومان
                                        <span class="ms-1 lead fs-6">${box.price.toLocaleString()}</span>
                                    </span>
                                    <span class="discount discount-box d-flex text-white">
                                        تومان
                                        <span class="ms-1">${Math.round(finalPrice).toLocaleString()}</span>
                                          :قیمت با تخفیف
                                    </span>`
                        }
                    </div>
                </div>
                
                <div class="add-cart btn-cart-box btn ${isInCart ? 'btn-warning' : 'btn-success'}" type="button" 
                     id="liveToastBtn-${box._id}" 
                     onclick="addToCartAndToggleButton('${box._id}')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20">
                        <path fill="currentColor" d="M4 7a1 1 0 0 0 0 2h2.22l2.624 10.5c.223.89 1.02 1.5 1.937 1.5h12.47c.903 0 1.67-.6 1.907-1.47L27.75 10h-2.094l-2.406 9H10.78L8.157 8.5A1.984 1.984 0 0 0 6.22 7zm18 14c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m-9 0c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m3-14v3h-3v2h3v3h2v-3h3v-2h-3V7zm-3 16c.564 0 1 .436 1 1c0 .564-.436 1-1 1c-.564 0-1-.436-1-1c0-.564.436-1 1-1m9 0c.564 0 1 .436 1 1c0 .564-.436 1-1 1c-.564 0-1-.436-1-1c0-.564.436-1 1-1"/>
                    </svg>
                    <p class="d-flex align-items-center m-0">${isInCart ? '✓ در سبد خرید' : 'اضافه به سبد خرید'}</p>
                </div>
            </div>`
        );
    });

    // ============ Initialize Sliders بعد از رندر کامل ============
    setTimeout(() => {
        settingSliderSwiper();
        settingSliderGlide();
        updateFavoritesUI();
    }, 100);
};

//todo========================================================== 🛒 تابع ساخت مودال سبد خرید
 const shoppingCartModal = (cartData) => {
  const containerShoppingCart = document.querySelector(".container-shopping-cart")
  containerShoppingCart.innerHTML = ''

  containerShoppingCart.insertAdjacentHTML('beforeend' , `
    <div class="open-cart">
      <div class="contain-box-goods rounded overflow-auto">
      <div>
          ${
            cartData.length ? renderCartItems(cartData) : '<div class="alert alert-danger alert-cart">🛒 هیچ محصولی در سبد موجود نمیباشد</div>'
          }
      </div>
      </div>

      <div class="btn-modol-cart-box d-flex align-items-center justify-content-center flex-column w-100">
        <a href="./cart.html" class="btn btn-success w-100 mb-2 final-buy-cart">نهایی کردن خرید</a>
        <button class="clear-cart-all btn btn-danger w-100" onclick="removeAllFromCart()">پاک کردن سبد خرید</button>
      </div>
    </div>
  `)
 }

//todo========================================================== 🛒 تابع ساخت باکس محصول در مودال سبد خرید
function renderCartItems(cartItems) {
  let html = "";

  cartItems.forEach((item) => {
    html += `
      <div class="box-goods d-flex align-items-end swiper-slide mb-2" data-id="${item._id}" style='transform: translateY(0);'>
        <div>
          <span class="plus-btn" onclick="updateQuantity('increase', '${item.product._id}', '${item.quantity}')">+</span>
          <span class="number">${item.quantity}</span>
          <span class="minus-btn" onclick="updateQuantity('decrease', '${item.product._id}', '${item.quantity}')">-</span>
        </div>
        <div>
          <div class='box-info-product h-100 d-flex flex-column align-items-center'>
            <div class='row w-100 h-100'>
              <div class='col'>
                <div class='row'>
                  <div class='col-1 p-0'>
                    <button type="button" class="btn btn-danger mb-1 rounded remove-btn" onclick="removeFromCart('${item.product._id}')">
                      <i class="bi bi-x-circle-fill d-flex align-items-center justify-center"></i>
                    </button>
                  </div>
                  <div class='col-11 pe-1'>
                    <h6 class='bg-white rounded text-center'>${item.product.name}</h6>
                  </div>
                </div>
                <div class='row'>
                  <p class='text-white fw-light px-2 m-0 rounded'>${item.product.description}</p>
                </div>
              </div>
              <div class='col-4 p-0'>
                <img src="${item.product.images[0]}" alt="img" class='rounded w-100 h-100' loading="lazy">
              </div>
            </div>
          </div>
          <div class='text-price-cart-box w-100 text-start text-white px-2 pt-3 pb-1 rounded d-flex justify-content-between'>
            <span class='d-flex'>
              تومان
              <span class='price ms-1 total-price'>${item.finalPrice.toLocaleString()}</span>
            </span>
            <span>:قیمت محصول</span>
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

//todo========================================================== علامت بوکمارک محصول UI تغییر
async function updateFavoritesUI() {
    try {    
        // چک کردن لاگین
        if (!getLocalStorage('login')) return false;
        
        // ✅ دریافت لیست علاقه‌مندی‌ها از localStorage
        const favoritesData = JSON.parse(localStorage.getItem('favoritesData')) || { items: [] };
        const favoritesList = favoritesData.items || [];
        
        // همه کارت‌های محصول
        const cardProductElem = document.querySelectorAll(".glide.product-box, .product-card");

        cardProductElem.forEach((card) => {
            const cardProductId = card.dataset.id;
            if (!cardProductId) return;
            
            const markContain = card.querySelector(".mark-contain");
            if (!markContain) return;
            
            // چک کردن اینکه آیا این محصول تو علاقه‌مندی‌ها هست
            const isMarked = favoritesList.some(fav => fav.productId === cardProductId);
            
            // تغییر کلاس‌ها
            markContain.classList.toggle('is-mark', isMarked);
            markContain.classList.toggle('not-mark', !isMarked);
            
            // تغییر آیکون بوکمارک
            const bookmarkIcon = markContain.querySelector('.icon-bookmark');
            if (bookmarkIcon) {
                if (isMarked) {
                    bookmarkIcon.style.fill = '#ef4444';
                    bookmarkIcon.style.color = '#ef4444';
                } else {
                    bookmarkIcon.style.fill = 'currentColor';
                    bookmarkIcon.style.color = '';
                }
            }
        });

    } catch (error) {
        console.error("Error in updateFavoritesUI:", error);
    }
}

//todo========================================================== تابع تغییر استایل جهت نمای تصاویر محصول
const updateArrowButtonColors = (event, nextBtnColor, prevBtnColor) => {
  const btn = event.target.closest("div");
  btn.children[0].style.color = nextBtnColor;
  if (btn.previousElementSibling) {
    btn.previousElementSibling.children[0].style.color = prevBtnColor;
  }
  if (btn.nextElementSibling) {
    btn.nextElementSibling.children[0].style.color = prevBtnColor;
  }
};

//todo========================================================== ساخت باکس های محصولات داخل صفحه ی سبد خرید
let createBoxProductToPageCart = (shoppingCartProduct) => {   
  if (document.querySelector(".container-Product-cards")) {
    document.querySelector(".container-Product-cards").textContent = "";        

    if (shoppingCartProduct.products.length) {
      shoppingCartProduct.products.forEach(async (box) => {        
        document.querySelector(".container-Product-cards").insertAdjacentHTML(
          "beforeend",
          `
            <div class="cart-item flex-wrap flex-md-nowrap position-relative" data-id="${box._id}">
                <button class="delete-btn" onclick="removeFromCart('${box.product._id}')">
                  <i class="bi bi-trash3"></i>
                  <span class="d-none d-md-inline">&nbsp حذف</span>
                </button>
                <div class="product-image">    
                    <div>
                        <div><img src="${box.product.images[0]}" alt="محصول 1" loading="lazy" /></div>
                    </div>
                </div>
                <div class="product-description-cart">
                    <div class="product-title product-title-cart">${
                      box.product.name
                    }</div>
                    <div class="product-Specifications">
                        <span>رنگ: سیاه</span>
                        <span>وزن: ۱.۵ کیلوگرم</span>
                    </div>
                    <div class="score">
                        ${await createStars(box.product.rating)}
                        <span>(${box.product.rating})</span>
                    </div>
                    <div class="description">${box.product.description}</div>
                    <div class="price-contain flex-md-row flex-column gap-2 gap-md-5">
                        <div class="product-price-cart">قیمت واحد: ${box.product.price.toLocaleString()} تومان</div>
                        <div class="discount discount-cart-page"> ${box.discountPercent}% تخفیف </div>
                    </div>
                    <div class="container-total flex-md-row flex-column gap-2 gap-md-5">
                      <img src="./src/assets/images/logo.webp" alt="لوگوی برند" class="brand-logo" loading="lazy">
                      <div class="total-price-container">جمع: 
                        <span class="total-price">${box.finalPrice.toLocaleString()}</span>
                        تومان
                      </div>
                      <div class="quantity-box">
                          <button class="quantity-btn" onclick="updateQuantity('decrease', '${box.product._id}', '${box.quantity}')"><i class="bi bi-dash-lg"></i></button>
                          <span class="quantity-value number">${box.quantity}</span>
                          <button class="quantity-btn" onclick="updateQuantity('increase', '${box.product._id}', '${box.quantity}')"><i class="bi bi-plus-lg"></i></button>
                      </div>
                    </div>
                </div>
            </div>
        `
        );
      });
    } else {
      document.querySelector(".container-Product-cards").textContent = "";
      document
        .querySelector(".container-Product-cards")
        .insertAdjacentHTML(
          "beforeend",
          `<div class='alert alert-danger w-100 text-center border-0'>:(     هیچ محصولی در سبد خرید شما موجود نمیباشد    ):</div>`
        );
    }
  }
};

//todo========================================================== ساخت باکس مجموع قیمت نهایی داخل صفحه ی سبد خرید
const boxPaymentHtmlTemplate = (resultCartFetchOperation) => { 
    const boxPayment = document.querySelector(".box-payment")    

    if (boxPayment) {
        boxPayment.innerHTML = ''
    
        boxPayment.insertAdjacentHTML('beforeend' , `
            <div class="cart-collaterals h-100">
                <div class="cart_totals">
    
                <aside class="cart-three-sidebar shop_table">
                    <div class="cart-three-sidebar-content bg-white position-relative h-100 rounded-5 d-flex align-items-center justify-content-around flex-column">
                      <img src="./src/assets/images/total-price.webp" alt="image" width="73" height="63" class="position-absolute" style="top: -5%;" loading="lazy"/>
      
                      <div class="d-flex flex-row-reverse flex-lg-column flex-xxl-row-reverse align-items-center justify-content-between w-100">: قیمت کل
                          <div class="d-flex align-items-center">
                          <span>تومان</span>&nbsp;
                          <strong class="Total-cart-price total-price">${resultCartFetchOperation.products.length ? resultCartFetchOperation.totalWithoutDiscount.toLocaleString() : 0}</strong>
                          </div>
                      </div>
      
                      <div class="divider position-relative"></div>
      
                      <p class="text-center text-xxl-end">
                          هزینه ارسال در ادامه بر اساس آدرس و نحوه‌ی ارسال محاسبه و
                          اضافه خواهد شد
                      </p>
      
                      <div class="d-flex flex-row-reverse flex-lg-column flex-xxl-row-reverse align-items-center justify-content-between w-100 text-danger">: قیمت نهایی
                          <div class="d-flex align-items-center">
                          <span>تومان</span>&nbsp;
                          <strong class="Total-cart-price final-price">${resultCartFetchOperation.products.length ? resultCartFetchOperation.totalWithDiscount.toLocaleString() : 0}</strong>
                          </div>
                      </div>
                    </div>
                </aside>
    
                <div>
                    <a href="#" class="p-3 btn btn-success rounded-3 mt-4 d-flex align-items-center justify-content-center w-100">
                    <i class="bi bi-caret-left-fill"></i>&nbsp;&nbsp;
                    <span>اقدام به پرداخت</span>
                    </a>
                </div>
                <div class="clear-cart-all mt-2 p-3 btn btn-danger rounded-3 d-flex align-items-center justify-content-center w-100" onclick="removeAllFromCart()">
                    <i class="bi bi-trash2"></i>&nbsp;&nbsp;
                    <span>پاک کردن سبد خرید</span>
                </div>
    
                </div>
            </div>
        `)
    }
}

//todo========================================================== ساخت ستاره ها بر اساس امتیاز محصول
let createStars = async (rating) => {
  return Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) {
      return `<i class="bi bi-star-fill"></i>`;
    } else if (i - 1 < rating && i >= Math.floor(rating)) {
      let percentage = (rating % 1) * 100;
      return `<i class='bi bi-star-fill' style="clip-path: inset(0 ${
        100 - percentage
      }% 0 0 );"></i>`;
    } else {
      return `<i class="bi bi-star"></i>`;
    }
  }).join("");
};

//todo========================================================== category ایجاد باکس‌ های محصولات به صورت ردیفی داخل صفحه
let createProductsRowTemplateHtml = (arrCategory) => {
  const containerCategoryFooter = document.querySelector(".container-category__footer")
  document.querySelector(".container-category__footer").innerHTML = "";

  if (arrCategory.length) {
    arrCategory.forEach(async (product) => {      
      containerCategoryFooter.insertAdjacentHTML(
        "beforeend",
        `
          <div class="product-card glide h-100 product-box flex-md-nowrap flex-wrap align-items-center justify-content-center" data-id=${product._id} data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            ${
              product.discount
                ? `<div class='box-discount'>${Math.floor(
                    product.discount / 10000
                  )}% </div>`
                : ""
            }
            <div class="product-image-container">
              <div class="not-mark mark-contain" onclick="addToFavorites('${product._id}')">
                <svg class="icon-bookmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17.6 21.945a1.483 1.483 0 0 1-1.01-.4l-4.251-3.9a.5.5 0 0 0-.68 0l-4.25 3.9a1.5 1.5 0 0 1-2.516-1.1V4.57a2.5 2.5 0 0 1 2.5-2.5h9.214a2.5 2.5 0 0 1 2.5 2.5v15.872a1.481 1.481 0 0 1-.9 1.374a1.507 1.507 0 0 1-.607.129M12 16.51a1.5 1.5 0 0 1 1.018.395l4.251 3.9a.5.5 0 0 0 .839-.368V4.57a1.5 1.5 0 0 0-1.5-1.5H7.393a1.5 1.5 0 0 0-1.5 1.5v15.872a.5.5 0 0 0 .839.368l4.251-3.91A1.5 1.5 0 0 1 12 16.51"></path>
                </svg>
              </div>
              <div class="h-100">
                <div class="glide__track h-100" data-glide-el="track">
                  <ul class="glide__slides h-100">
                    <li class="glide__slide"><img src="${
                      product.images[0]
                    }" alt="Slide 1" loading="lazy" /></li>
                    <li class="glide__slide"><img src="${
                      product.images[1]
                    }" alt="Slide 2" loading="lazy" /></li>
                    <li class="glide__slide"><img src="${
                      product.images[2]
                    }" alt="Slide 3" loading="lazy" /></li>
                  </ul>
                </div>
                <div class="next-img-box glide__arrows box-row-arrow" data-glide-el="controls">
                  <div class="glide__arrow--left" data-glide-dir="<" onclick="updateArrowButtonColors(event, '#2563eb', '#75757533')">
                    <svg class="pretive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24"><path fill="currentColor" d="M497.333 239.999H80.092l95.995-95.995l-22.627-22.627L18.837 256L153.46 390.623l22.627-22.627l-95.997-95.997h417.243z"/></svg>
                  </div>
                  <div class="glide__arrow--right" data-glide-dir=">" onclick="updateArrowButtonColors(event, '#2563eb', '#75757533')">
                    <svg class="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24"><path fill="currentColor" d="m359.873 121.377l-22.627 22.627l95.997 95.997H16v32.001h417.24l-95.994 95.994l22.627 22.627L494.498 256z" /></svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="product-info align-items-md-end align-items-center">
              <div class="product-title product-title-category">${
                product.name
              }</div>
              <div class="points-container d-flex justify-content-end align-items-center flex-column-reverse flex-xl-row flex-wrap">
                <div class="product-features">
                  <div class="feature-item"> باتری 4000 میلی‌آمپر </div>
                  <div class="feature-item"> دوربین 64 مگاپیکسل </div>
                  <div class="feature-item"> صفحه نمایش 6.2 اینچ </div>
                </div>
                <div class="product-rating ps-0 ps-xl-5">
                  ${await createStars(product.rating)}
                  <span class='text-body'>(${product.rating})</span>
                </div>
              </div>
              <div class="product-description">${product.description}</div>
              <div class="price-container d-flex align-items-center justify-content-md-end justify-content-center flex-wrap flex-column flex-md-row position-relative">
                ${
                  !product.discount
                    ? `<span class="price text-bg-primary rounded fw-bold px-2 position-relative d-flex align-items-center">
                        تومان
                        <span class="ms-1 lead p-2 fs-6">${product.price.toLocaleString()}</span>
                        &nbsp&nbsp:قیمت محصول
                      </span>`
                    : `<span class="price price-before position-relative d-flex align-items-center">
                        تومان
                        <span class="ms-1 lead fs-6">${product.price.toLocaleString()}</span>
                      </span>
                      <span class="discount discount-box d-flex text-white p-2 m-0 ms-md-4 fs-6">
                        تومان
                        <span class="ms-1">${(
                          product.price -
                          product.price *
                            (Math.floor(product.discount / 10000) / 100)
                        ).toLocaleString()}</span>
                        &nbsp&nbsp:قیمت با تخفیف
                      </span>`
                }
              </div>
              <div class="btn-cart-box buy-button" onclick="addToCartAndToggleButton('${
                product._id
              }')"> 🧺 اضافه به سبد خرید </div>
            </div>
          </div>
        `
      );

      const currentSlider = containerCategoryFooter.querySelector(`.product-card[data-id="${product._id}"]`);
        if (currentSlider) {
          new Glide(currentSlider, {
            type: "slider",
            perView: 1,
            autoplay: 7000,
            animationDuration: 800,
          }).mount();
        }
        updateFavoritesUI();
    });

  } else {
    containerCategoryFooter.insertAdjacentHTML(
      "beforeend",
      `<div class='alert alert-danger w-100 text-center'>:( کالای مورد نظر شما یافت نشد ):</div>`
    );
  }
};

//todo==========================================================  ایجاد باکس‌ های دسته بندی ها داخل صفحه اصلی
const boxCategoriesTemplateHtml = async (categoriesData) => {
  const containerCategoryBoxIcon  = document.querySelector(".category-box-icon ")  
  
  categoriesData.forEach(item => {    
    containerCategoryBoxIcon.insertAdjacentHTML('beforeend' , `
      <div class="swiper-slide swiper-slide-active" role="group" aria-label="2 / 15" style="width: 310.4px;" data-id=${item._id}>
        <div>
          <a href="./category.html?cat=digital&amp;page=1" class="page" style="background-image: url('${item.icon}')"></a>
        </div>
        <h6>${item.label}</h6>
      </div>
    `)
  })
}

//!---------------------------------------------------------------------- exports -------------------------------------------------------

export {
  showModal,
  createBlogs,
  createProductsTemplateHtml,
  renderCartItems,
  updateFavoritesUI,
  updateArrowButtonColors,
  createBoxProductToPageCart,
  boxPaymentHtmlTemplate,
  createProductsRowTemplateHtml,
  shoppingCartModal,
  boxCategoriesTemplateHtml
};

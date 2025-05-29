//! ---------------------------------------------------------------------imports-----------------------------------------------------------------------
import "./header.js";
import "./../js/funcs/store/cart.js";
import { getLocalStorage } from "./funcs/store/storage.js";
import { removeAllFromCart } from "./../js/funcs/store/cart.js";

//! ---------------------------------------------------------------------variables-----------------------------------------------------------------------
const boxPayment = document.querySelector(".box-payment")
const getCartData = getLocalStorage('cartData')   

//! -------------------------------------------------------------------functions-------------------------------------------------------------------------
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

//todo========================================================== ساخت باکس های محصولات داخل صفحه ی سبد خرید
export let createBoxProductToPageCart = async (shoppingCartProduct) => {    
  if (document.querySelector(".container-Product-cards")) {
    document.querySelector(".container-Product-cards").textContent = "";

    if (shoppingCartProduct.length) {
      shoppingCartProduct.forEach(async (box) => {        
        document.querySelector(".container-Product-cards").insertAdjacentHTML(
          "beforeend",
          `
            <div class="cart-item flex-wrap flex-md-nowrap" data-id="${box._id}">
                <button class="delete-btn" onclick="removeFromCart('${box.product._id}')">
                  <i class="bi bi-trash3"></i>
                  <span class="d-none d-md-inline">&nbsp حذف</span>
                </button>
                <div class="product-image">    
                    <div>
                        <div><img src="${
                          box.product.images[0]
                        }" alt="محصول 1"></div>
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
                        ${await createStars(box.product.ratings)}
                        <span>(${box.product.ratings})</span>
                    </div>
                    <div class="description">${box.product.description}</div>
                    <div class="price-contain flex-md-row flex-column gap-2 gap-md-5">
                        <div class="product-price-cart">قیمت واحد: ${box.product.price.toLocaleString()} تومان</div>
                        <div class="discount discount-cart-page"> ${box.discountPercent}% تخفیف </div>
                    </div>
                    <div class="container-total flex-md-row flex-column gap-2 gap-md-5">
                      <img src="src/assets/images/logo.png" alt="لوگوی برند" class="brand-logo">
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

//todo========================================================== ساخت باکس های محصولات داخل صفحه ی سبد خرید
export const boxPaymentHtmlTemplate = (resultCartFetchOperation) => {    
    if (boxPayment) {
        boxPayment.innerHTML = ''
    
        boxPayment.insertAdjacentHTML('beforeend' , `
            <div class="cart-collaterals h-100">
                <div class="cart_totals">
    
                <aside class="cart-three-sidebar shop_table">
                    <div class="cart-three-sidebar-content bg-white position-relative h-100 rounded-5 d-flex align-items-center justify-content-around flex-column">
                      <img src="./src/assets/images/total-price.png" alt="image" width="73" height="63" class="position-absolute" style="top: -5%;"/>
      
                      <div class="d-flex flex-row-reverse flex-lg-column flex-xxl-row-reverse align-items-center justify-content-between w-100">: قیمت کل
                          <div class="d-flex align-items-center">
                          <span>تومان</span>&nbsp;
                          <strong class="Total-cart-price total-price">${resultCartFetchOperation.products.length ? resultCartFetchOperation.totalWithoutDiscount.toLocaleString() : 0}</strong>
                          </div>
                      </div>
      
                      <div class="divider position-relative"></div>
      
                      <p>
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

if (getCartData) {
    createBoxProductToPageCart(getCartData.products)
    boxPaymentHtmlTemplate(getCartData)
}

//! -------------------------------------------------------------------binding-------------------------------------------------------------------------
window.removeAllFromCart = removeAllFromCart

//! ---------------------------------------------------------------------imports-----------------------------------------------------------------------
import "./header.js";
import "./../js/funcs/store/cart.js";
import { getToken } from "./funcs/store/storage.js";
import { removeFromCart, updateQuantity } from "./../js/funcs/store/cart.js";

//! ---------------------------------------------------------------------variables-----------------------------------------------------------------------
const totalPrice = document.querySelector(".total-price")
const finalPrice = document.querySelector(".final-price")

//! ---------------------------------------------------------------------addEventListeners-----------------------------------------------------------------------
window.addEventListener("DOMContentLoaded", async () => {
  const cartFetchOperation = await fetch(
    "https://onlineshope.onrender.com/api/cart",
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  );
  const resultCartFetchOperation = await cartFetchOperation.json(); 
  console.log(resultCartFetchOperation);
  

  createBoxToPageCart(resultCartFetchOperation.products)

  totalPrice.textContent = resultCartFetchOperation.totalWithoutDiscount.toLocaleString()
  finalPrice.textContent = resultCartFetchOperation.totalWithDiscount.toLocaleString()
});

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
let createBoxToPageCart = async (shoppingCartProduct) => {
  if (document.querySelector(".container-Product-cards")) {
    document.querySelector(".container-Product-cards").textContent = "";

    if (shoppingCartProduct.length) {
      shoppingCartProduct.forEach(async (box) => {
        console.log(box.product);
        
        document.querySelector(".container-Product-cards").insertAdjacentHTML(
          "beforeend",
          `
            <div class="cart-item swiper-slide" data-id="${box._id}">
                <button class="delete-btn" onclick="removeFromCart('${box._id}')"><i class="bi bi-trash3"></i>&nbsp حذف</button>
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
                    <div class="price-contain">
                        <div class="product-price-cart">قیمت واحد: ${box.product.price.toLocaleString()} تومان</div>
                        <div class="discount"> ${box.discountPercent}% تخفیف </div>
                    </div>
                    <div class="container-total">
                      <img src="src/assets/images/logo.png" alt="لوگوی برند" class="brand-logo">
                      <div class="total-price-container">جمع: 
                        <span class="total-price">${box.finalPrice.toLocaleString()}</span>
                        تومان
                      </div>
                      <div class="quantity-box">
                          <button class="quantity-btn" onclick="updateQuantity('decrease', '${box._id}', '${box.quantity}')"><i class="bi bi-dash-lg"></i></button>
                          <span class="quantity-value number">${box.quantity}</span>
                          <button class="quantity-btn" onclick="updateQuantity('increase', '${box._id}', '${box.quantity}')"><i class="bi bi-plus-lg"></i></button>
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



function buttonsShoppingCart() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", removeFromCart);
  });
  document.querySelectorAll(".bi-plus-lg").forEach((btn) => {
    btn.addEventListener("click", (event) => updateQuantity(event, "increase"));
  });
  document.querySelectorAll(".bi-dash-lg").forEach((btn) => {
    btn.addEventListener("click", (event) => updateQuantity(event, "decrease"));
  });
}

//! -------------------------------------------------------------------bindings-------------------------------------------------------------------------
// window.updateQuantity = updateQuantity
// window.removeFromCart = removeFromCart

//! -------------------------------------------------------------------export-------------------------------------------------------------------------
export { buttonsShoppingCart };

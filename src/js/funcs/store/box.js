//!---------------------------------------------------------------------- imports -------------------------------------------------------
import { getLocalStorage, getToken, setLocalStorage } from "./storage.js";
import { showModal } from "./ui.js";
import { renderCartItems, updateCartNotification } from "./cart.js";
import { settingSliderGlide, settingSliderSwiper } from "../sliders.js";
import {
  hideLoader,
  modalAuthorized,
  showAlertLogin,
  showLoader,
} from "../utils.js";
//!---------------------------------------------------------------------- variables -------------------------------------------------------
const productsFetchOperation = await fetch("https://onlineshope.onrender.com/api/products");
export const resultProductsFetchOperation = await productsFetchOperation.json();
getFavorites()

//!---------------------------------------------------------------------- functions -------------------------------------------------------

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

//todo============================================================= تابع افزودن محصول به سبد خرید
async function addToCartAndToggleButton(id) {
  try {
    if (!(await showAlertLogin())) return false;

    showLoader();
    const resultCartFetchOperation = await getLocalStorage('cartData')
    const checkedCart = resultCartFetchOperation.products.some(
      (productCart) => productCart.product._id === id
    );

    if (!checkedCart) {
      const response = await fetch(
        `https://onlineshope.onrender.com/api/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            productId: id,
            quantity: 1,
          }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        hideLoader();
        showModal(`✅🛒 محصول به سبد خرید شما اضافه شد`);
      } else {
        throw new Error("❌ مشکلی در افزودن محصول به سبد خرید وجود دارد");
      }

      updateCartNotification();
      renderCartItems(result.cart.products);
      setLocalStorage('cartData' , result.cart)
    } else {
      hideLoader();
      showModal(`✅🛒 این محصول از قبل در سبد خرید شما موجود است`);
    }
  } catch (error) {
    hideLoader();
    showModal("❌ مشکلی در افزودن محصول به سبد خرید وجود دارد");
    throw error;
  }
}

//todo========================================================== ساخت باکس محصولات صفحه اصلی
export const createProductsTemplateHtml = (element, arrProducts) => {  
  element.textContent = "";

  if (!element) {
    console.error("❌ element is not defined:", container);
    return;
  }

  if (!Array.isArray(arrProducts) || arrProducts.length === 0) {
    console.warn("⚠️ No products to display for this arrProducts.");
  }

  if (arrProducts.length) {
    arrProducts.forEach((box) => {
      element.insertAdjacentHTML(
        "beforeend",
        `<div class="swiper-slide glide product-box" data-id=${box._id}>
                    ${
                      box.discount
                        ? `<div class='box-discount'>${Math.floor(
                            box.discount / 10000
                          )}%</div>`
                        : ""
                    }
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
                        <div class="not-mark mark-contain" onclick="addToFavorites('${
                          box._id
                        }')">
                            <svg class="icon-bookmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M17.6 21.945a1.483 1.483 0 0 1-1.01-.4l-4.251-3.9a.5.5 0 0 0-.68 0l-4.25 3.9a1.5 1.5 0 0 1-2.516-1.1V4.57a2.5 2.5 0 0 1 2.5-2.5h9.214a2.5 2.5 0 0 1 2.5 2.5v15.872a1.481 1.481 0 0 1-.9 1.374a1.507 1.507 0 0 1-.607.129M12 16.51a1.5 1.5 0 0 1 1.018.395l4.251 3.9a.5.5 0 0 0 .839-.368V4.57a1.5 1.5 0 0 0-1.5-1.5H7.393a1.5 1.5 0 0 0-1.5 1.5v15.872a.5.5 0 0 0 .839.368l4.251-3.91A1.5 1.5 0 0 1 12 16.51"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
                                    <path
                                        stroke-dasharray="2 4"
                                        stroke-dashoffset="6"
                                        d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21">
                                        <animate
                                            attributeName="stroke-dashoffset"
                                            dur="0.6s"
                                            repeatCount="indefinite"
                                            values="6;0"/>
                                    </path>
                                    <path
                                        stroke-dasharray="30"
                                        stroke-dashoffset="30"
                                        d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3">
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
                                        d="M12 8v7.5">
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
                                        d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5">
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

                        <div class="next-img-box glide__arrows" data-glide-el="controls">
                            <div class="glide__arrow--left" data-glide-dir="<" onclick="updateArrowButtonColors(event, '#2563eb', '#75757533')">
                                <svg class="pretive" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.333 239.999H80.092l95.995-95.995l-22.627-22.627L18.837 256L153.46 390.623l22.627-22.627l-95.997-95.997h417.243z"/>
                                </svg>
                            </div>
                            <div class="glide__arrow--right" data-glide-dir=">" onclick="updateArrowButtonColors(event, '#2563eb', '#75757533')">
                                <svg class="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="m359.873 121.377l-22.627 22.627l95.997 95.997H16v32.001h417.24l-95.994 95.994l22.627 22.627L494.498 256z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="box-discription">
                        <h6>${box.name}</h6>
                        <p class="m-0">${box.description}</p>
                        <div class="box-star">
                            <span>${box.ratings}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m10.833 8.142l1.8-3.57a1.64 1.64 0 0 1 1.49-.92c.306 0 .606.09.86.26c.251.166.452.398.58.67l1.76 3.57l.11.08l3.92.57c.302.04.586.165.82.36c.234.205.41.467.51.76a1.66 1.66 0 0 1 0 .91a1.57 1.57 0 0 1-.44.77l-2.84 2.77a.11.11 0 0 0 0 .11l.68 3.93c.047.297.016.6-.09.88a1.7 1.7 0 0 1-1.4 1.05a1.59 1.59 0 0 1-.91-.2l-3.38-1.77l-.17-.07h-.14l-3.52 1.84a1.61 1.61 0 0 1-.76.19h-.17a1.7 1.7 0 0 1-.84-.32a1.54 1.54 0 0 1-.55-.71a1.61 1.61 0 0 1 0-1l.66-3.81a.491.491 0 0 0 0-.11h-.05l-2.82-2.74a1.69 1.69 0 0 1-.46-.8a1.62 1.62 0 0 1 .53-1.65a1.59 1.59 0 0 1 .83-.36l3.87-.57zm-2.83-2h-6a.75.75 0 0 1 0-1.5h6a.75.75 0 1 1 0 1.5m-3 12.07h-3a.75.75 0 1 1 0-1.5h3a.75.75 0 1 1 0 1.5m-1.46-5.77h-1.5a.75.75 0 1 1 0-1.5h1.5a.75.75 0 1 1 0 1.5"/></svg>
                        </div>
                    </div>
                    <div class="box-price d-flex align-items-center w-100">
                        <div class="m-0 d-flex w-100 justify-content-center flex-column align-items-center">
                            ${
                              !box.discount
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
                                        <span class="ms-1">${(
                                          box.price -
                                          box.price *
                                            (Math.floor(box.discount / 10000) /
                                              100)
                                        ).toLocaleString()}</span>
                                          :قیمت با تخفیف
                                      </span>`
                            }
                        </div>
                    </div>
                    <div class="add-cart btn-cart-box btn btn-success" type="button" id="liveToastBtn-${
                      box._id
                    }" onclick="addToCartAndToggleButton('${box._id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <path
                                fill="currentColor"
                                d="M4 7a1 1 0 0 0 0 2h2.22l2.624 10.5c.223.89 1.02 1.5 1.937 1.5h12.47c.903 0 1.67-.6 1.907-1.47L27.75 10h-2.094l-2.406 9H10.78L8.157 8.5A1.984 1.984 0 0 0 6.22 7zm18 14c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m-9 0c-1.645 0-3 1.355-3 3s1.355 3 3 3s3-1.355 3-3s-1.355-3-3-3m3-14v3h-3v2h3v3h2v-3h3v-2h-3V7zm-3 16c.564 0 1 .436 1 1c0 .564-.436 1-1 1c-.564 0-1-.436-1-1c0-.564.436-1 1-1m9 0c.564 0 1 .436 1 1c0 .564-.436 1-1 1c-.564 0-1-.436-1-1c0-.564.436-1 1-1"
                            />
                        </svg>
                        <p class="d-flex align-items-center m-0">اضافه به سبد خرید</p>
                    </div>
                </div>`
      );
    });
  } else {
    element.insertAdjacentHTML(
      "beforeend",
      `<div class='alert alert-danger w-100 text-center'>:(     کالای مورد نظر شما یافت نشد     ):</div>`
    );
  }

  settingSliderSwiper();
  settingSliderGlide();
  updateFavoritesUI()
};

// //todo========================================================== افزودن محصول به علاقه مندی ها
const addToFavorites = async (productId) => {
  try {
    if (!(await showAlertLogin())) return false;

    showLoader();
    const markList = await getLocalStorage('markData')    
    const checkedMark = markList.favorites.some((mark) => mark === productId);    

    if (!checkedMark) {
      const response = await fetch(
        "https://onlineshope.onrender.com/api/users/favorites/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({ productId }),
        }
      );

      hideLoader();
      if (!response.ok) throw new Error("خطا در افزودن به علاقه‌مندی‌ها");
      const favoritesData = await response.json()
      setLocalStorage('markData' , favoritesData)
      showModal("✅ محصول به علاقه‌مندی‌ها اضافه شد");
      updateFavoritesUI();      

    } else {
      removeFromFavorites(productId);
    }
  } catch (error) {
    hideLoader();
    console.error("Error in addToFavorites:", error);
    showModal("❌ خطا در افزودن به علاقه‌مندی‌ها");
  }
};

// //todo========================================================== حذف محصول از علاقه مندی ها
async function removeFromFavorites(productId) {
  try {
    if (!(await showAlertLogin())) return false;

    showLoader();
    const response = await fetch(
      "https://onlineshope.onrender.com/api/users/favorites/remove",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({ productId }),
      }
    );

    hideLoader();
    if (!response.ok) throw new Error("خطا در حذف از علاقه‌ مندی‌ ها");
    const favoritesData = await response.json()
    setLocalStorage('markData' , favoritesData)
    showModal("✅ محصول از علاقه‌ مندی‌ ها حذف شد");
    updateFavoritesUI();    

  } catch (error) {
    hideLoader();
    console.error("Error in removeFromFavorites:", error);
    showModal("❌ خطا در حذف از علاقه‌مندی‌ها");
  }
}

// //todo========================================================== دریافت لیست علاقه مندی های کاربر
export async function getFavorites() {
  try {
    const response = await fetch(
      "https://onlineshope.onrender.com/api/users/favorites",
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );

    if (response.status === 401) {
      if (!modalAuthorized()) return false;
    } else if (!response.ok) {
      throw new Error("خطا در دریافت علاقه‌مندی‌ها");
    }

    const favoritesData =  await response.json()
    setLocalStorage('markData' , favoritesData)
  } catch (error) {
    console.error("Error in getFavorites:", error);
    showModal("❌ خطا در دریافت علاقه‌مندی‌ها");
    return [];
  }
}

// //todo========================================================== علامت بوکمارک محصول UI تغییر
export async function updateFavoritesUI() {
  try {    
    if (!(getLocalStorage('login').length)) return false;
    
    const markList = await getLocalStorage('markData');    
    const cardProductElem = document.querySelectorAll(".glide");        

    cardProductElem.forEach((card) => {
      const cardId = card.dataset.id;
      const markContain = card.querySelector(".mark-contain");
      const isMarked = markList.favorites.some((mark) => mark === cardId);
      
      if (isMarked) {
        markContain.classList.add("is-mark");
        markContain.classList.remove("not-mark");
      } else {
        markContain.classList.remove("is-mark");
        markContain.classList.add("not-mark");
      }
    });
  } catch (error) {
    console.error("Error in updateFavoritesUI:", error);
    showModal("❌ خطا در به‌روزرسانی لیست علاقه‌مندی‌ها");
  }
}

//!---------------------------------------------------------------------- binding -------------------------------------------------------
window.addToCartAndToggleButton = addToCartAndToggleButton;
window.updateArrowButtonColors = updateArrowButtonColors;
window.addToFavorites = addToFavorites;

//! ---------------------------------------------------------------------imports-----------------------------------------------------------------------
import { showModal } from "./ui.js";
import {
  hideLoader,
  modalAuthorized,
  showAlertLogin,
  showLoader,
} from "../utils.js";
import { getLocalStorage, getToken, setLocalStorage } from "./storage.js";
import {
  boxPaymentHtmlTemplate,
  createBoxProductToPageCart,
} from "../../shoppingCart.js";

//! ---------------------------------------------------------------------variables-----------------------------------------------------------------------
const clearCartAll = document.querySelector(".clear-cart-all");
const cartNotification = document.querySelector(".cart-notification");
const containerOpenCart = document.querySelector(".container-shopping-cart");
const openCart = document.querySelector(".open-cart");
const shoppingCartIcon = document.querySelector(".shopping-cart-icon");
const alertCart = document.querySelector(".alert-cart");
const container = document.querySelector(".cantain-box-goods");

//! ---------------------------------------------------------------------addEventListeners-----------------------------------------------------------------------

window.addEventListener("load", () => {
  updateCartNotification();
  toggleCart();
  closeCart();
  // getCartData()
});

clearCartAll.addEventListener("click", removeAllFromCart);

//! -------------------------------------------------------------------functions-------------------------------------------------------------------------

//todo========================================================== 🛒 دریافت اطلاعات سبد خرید
export const getCartData = async () => {
  try {
    if (!(getLocalStorage('login').length) || (getLocalStorage('isAuthorized') === false)) return false;

    const cartFetchOperation = await fetch(
      "https://onlineshope.onrender.com/api/cart",
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    
    const cartData = await cartFetchOperation.json();    
    setLocalStorage('cartData' , cartData);
    updateCartNotification()
    hideLoader();

  } catch (error) {
    hideLoader();
    console.error("Error in getCartData:", error);
    return null;
  }
};

//todo========================================================== 🛒 تابع ساخت باکس محصول در سبد خرید
export function renderCartItems(cartItems) {
  container.innerHTML = "";
  cartItems.forEach((item) => {
    const cartHTML = `
      <div class="box-goods d-flex align-items-end swiper-slide mb-2" data-id="${
        item._id
      }" style='transform: translateY(0);'>
        <div>
          <span class="plus-btn" onclick="updateQuantity('increase', '${
            item.product._id
          }', '${item.quantity}')">+</span>
          <span class="number">${item.quantity}</span>
          <span class="minus-btn" onclick="updateQuantity('decrease', '${
            item.product._id
          }', '${item.quantity}')">-</span>
        </div>
        <div>
          <div class='box-info-product h-100 d-flex flex-column align-items-center'>
            <div class='row w-100 h-100'>
              <div class='col'>
                <div class='row'>
                  <div class='col-1 p-0'>
                    <button type="button" class="btn btn-danger mb-1 rounded remove-btn" onclick="removeFromCart('${
                      item.product._id
                    }')">
                      <i class="bi bi-x-circle-fill d-flex align-items-center justify-center"></i>
                    </button>
                  </div>
                  <div class='col-11 pe-1'>
                    <h6 class='bg-white rounded text-center'>${
                      item.product.name
                    }</h6>
                  </div>
                </div>
                <div class='row'>
                  <p class='text-white fw-light px-2 m-0 rounded'>${
                    item.product.description
                  }</p>
                </div>
              </div>
              <div class='col-4 p-0'>
                <img src="${
                  item.product.images[0]
                }" alt="img" class='rounded w-100 h-100'>
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
    container.insertAdjacentHTML("afterbegin", cartHTML);
  });
  // initTooltips(); //? فعال‌سازی تمام تولتیپ‌ها
}

//todo=================================================================== تابع کلیک روی ایکون سبد خرید و باز کردن سبد خرید
export function toggleCart() {
  shoppingCartIcon.addEventListener("click", async () => {
    try {
      if (!(await showAlertLogin())) return false;
      if (getLocalStorage('isAuthorized') === false) return modalAuthorized()

      showLoader();
      const getCartData = getLocalStorage("cartData")      
      openCart.classList.add("is-content");
      containerOpenCart.style.display = "flex";
      cartNotification.classList.remove("is-notification");
      renderCartItems(getCartData.products);
      showAlertEmptyCart(getCartData.products);
      positionOpenCart();
      hideLoader();

    } catch (error) {
      hideLoader();
      console.error("Error in Function toggleCart =>", error);
    }
  });
}

//todo========================================================== 🛒 تابع نمایش یا عدم نمایش نوتیف سبد خرید
async function updateCartNotification() {
  try {
    if (getLocalStorage("login").length === 0) return false;
    const resultCartFetchOperation = await getLocalStorage("cartData")

    if (resultCartFetchOperation.products) {
      cartNotification.classList.toggle("is-notification", resultCartFetchOperation.products.length > 0);
    }
  } catch (error) {
    console.error(error);
  }
}

//todo=================================================================== تابع حذف محصول از سبد خرید
export async function removeFromCart(id) {
  try {
    if (!(await showAlertLogin())) return false;
    showLoader();
    const removeFromCartOperation = await fetch(
      "https://onlineshope.onrender.com/api/cart/remove",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          productId: id,
        }),
      }
    );

    const resultRemoveFromCartOperation = await removeFromCartOperation.json();
    if (!removeFromCartOperation.ok) {
      throw new Error(
        resultRemoveFromCartOperation.error || "Failed to delete item from cart"
      );
    }

    renderCartItems(resultRemoveFromCartOperation.cart.products);
    createBoxProductToPageCart(resultRemoveFromCartOperation.cart.products);
    boxPaymentHtmlTemplate(resultRemoveFromCartOperation.cart);
    setLocalStorage('cartData' , resultRemoveFromCartOperation.cart)
    updateCartNotification();    

    hideLoader();
    showModal(`❌🧺  محصول از سبد خرید شما حذف شد`);
  } catch (error) {
    console.error("Error in Function removeFromCart =>", error);
    hideLoader();
    showModal("خطا در حذف محصول از سبد خرید");
  }
}

//todo=================================================================== نمایش پیغام خالی بودن سبد خرید
let showAlertEmptyCart = async (shoppingCart) => {
  try {
    if (shoppingCart.length <= 0) {
      alertCart.classList.remove("d-none");
      alertCart.classList.add("d-block");
      cartNotification.classList.remove("is-notification");
    } else {
      alertCart.classList.add("d-none");
      alertCart.classList.remove("d-block");
    }

  } catch (error) {
    console.error("Error in Function showAlertEmptyCart =>", error);
  }
};

//todo=================================================================== عملیات افزایش یا کاهش تعداد محصول در سبد خرید
export let updateQuantity = async (operation, id, quantity) => {
  try {
    if (!(await showAlertLogin())) return false;
    showLoader();

    quantity = Number(quantity);
    if (operation === "increase") {
      quantity += 1;
    } else if (operation === "decrease" && quantity > 1) {
      quantity -= 1;
    } else {
      hideLoader();
      showModal("⚠️ حداقل تعداد محصول 1 می‌باشد.");
      return;
    }

    const res = await fetch(
      "https://onlineshope.onrender.com/api/cart/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity: +quantity,
        }),
      }
    );
    const resultRes = await res.json();
    renderCartItems(resultRes.cart.products);
    createBoxProductToPageCart(resultRes.cart.products);
    boxPaymentHtmlTemplate(resultRes.cart);
    setLocalStorage('cartData' , resultRes.cart)
    hideLoader();
  } catch (error) {
    hideLoader();
    console.error("Error in Function updateQuantity =>", error);
    showModal("❌ مشکل در به‌روزرسانی تعداد محصول");
  }
};

//todo=================================================================== تابع حذف همه موارد موجود از سبد خرید
export async function removeAllFromCart() {
  try {
    if (!(await showAlertLogin())) return false;
    showLoader();

    const response = await fetch(
      "https://onlineshope.onrender.com/api/cart/clear",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      hideLoader();
      throw new Error(data.message || "مشکل در خالی کردن سبد خرید");
    }

    container.innerHTML = "";
    showAlertEmptyCart(data.cart.products);
    createBoxProductToPageCart(data.cart.products);
    boxPaymentHtmlTemplate(data.cart);
    setLocalStorage('cartData' , data.cart)
    updateCartNotification();

    hideLoader();
    showModal("✅ سبد خرید با موفقیت خالی شد!");
  } catch (error) {
    hideLoader();
    console.error("Error in Function removeAllFromCart =>", error);
    showModal("خطا در خالی کردن سبد خرید");
  }
}

//todo=================================================================== تابع بستن سبد خرید
function closeCart() {
  containerOpenCart.addEventListener("click", async (e) => {
    try {
      if (e.target.classList.contains("container-shopping-cart")) {
        containerOpenCart.style.display = "none";
        openCart.classList.remove("is-content");
        shoppingCartIcon.style.zIndex = "9";
        updateCartNotification();
      }
    } catch (error) {
      console.error("Error in Function closeCart =>", error);
    }
  });
}

//todo===================================================================
function positionOpenCart() {
  const menuBox = document.querySelector(".menu-box");
  const menuBoxRect = menuBox.getBoundingClientRect();
  const cartIconRect = shoppingCartIcon.getBoundingClientRect();
  const openCartWidth = openCart.offsetWidth || 400;
  const viewportWidth = document.documentElement.clientWidth;

  const topPosition = menuBoxRect.bottom + 20;
  shoppingCartIcon.style.zIndex = "999";

  let rightPosition = viewportWidth - cartIconRect.right;

  if (rightPosition + openCartWidth > viewportWidth) {
    rightPosition = viewportWidth - openCartWidth - 10;
  }

  if (rightPosition < 10) {
    rightPosition = 10;
  }

  openCart.style.top = `${topPosition}px`;
  openCart.style.right = `${rightPosition}px`;
  openCart.style.left = "auto";
}

// window.addEventListener('resize', positionOpenCart);
window.addEventListener("scroll", positionOpenCart);

//! -------------------------------------------------------------------bindings-------------------------------------------------------------------------
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

//! -------------------------------------------------------------------export-------------------------------------------------------------------------
export { updateCartNotification };

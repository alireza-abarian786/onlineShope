//! ---------------------------------------------------------------------imports-----------------------------------------------------------------------
import {showModal} from "./ui.js";
import { hideLoader, showAlertLogin, showLoader} from "../utils.js";
import { getToken } from "./storage.js";

//! ---------------------------------------------------------------------variables-----------------------------------------------------------------------
const clearCartAll = document.querySelector('.clear-cart-all')
//! ---------------------------------------------------------------------addEventListeners-----------------------------------------------------------------------

window.addEventListener("DOMContentLoaded" , () => {
  updateCartNotification()
  toggleCart()
  closeCart()
})

clearCartAll.addEventListener("click" , removeAllFromCart)

//! -------------------------------------------------------------------functions-------------------------------------------------------------------------

//todo========================================================== 🛒 تابع ساخت باکس محصول در سبد خرید
export function renderCartItems(cartItems) {
  const container = document.querySelector(".cantain-box-goods");
  container.innerHTML = "";
  cartItems.forEach((item) => {
    const cartHTML = `
      <div class="box-goods d-flex align-items-end swiper-slide" data-id="${item._id}" style='transform: translateY(0);'>
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
                <img src="${item.product.images[0]}" alt="img" class='rounded w-100 h-100'>
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
  const shoppingCartIcon = document.querySelector(".shopping-cart-icon");
  const openCart = document.querySelector(".open-cart");
  const containerOpenCart = document.querySelector(".container-shopping-cart");
  const cartNotification = document.querySelector(".cart-notification");
  
  shoppingCartIcon.addEventListener("click", async () => {
    showLoader()
    console.log('Opening cart');
    const cartFetchOperation = await fetch("https://onlineshope.onrender.com/api/cart",{
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    const resultCartFetchOperation = await cartFetchOperation.json(); 

    try {
      if (!(await showAlertLogin())) return false;
      openCart.classList.add("is-content");
      containerOpenCart.style.visibility = "visible";
      containerOpenCart.style.height = document.body.offsetHeight + "px";
      cartNotification.classList.remove("is-notification");
      renderCartItems(resultCartFetchOperation.products)
      showAlertEmptyCart(resultCartFetchOperation.products);
      hideLoader();

    } catch (error) {
      hideLoader();
      console.error("Error in Function toggleCart =>", error);
    }
  });
}

//todo========================================================== 🛒 تابع نمایش یا عدم نمایش نوتیف سبد خرید
async function updateCartNotification() {  
  const cartFetchOperation = await fetch("https://onlineshope.onrender.com/api/cart", {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  );
  const resultCartFetchOperation = await cartFetchOperation.json();    
  const cartNotification = document.querySelector(".cart-notification");
  cartNotification.classList.toggle("is-notification", resultCartFetchOperation.products.length > 0);
  // hideLoader();
}

//todo=================================================================== تابع حذف محصول از سبد خرید
async function removeFromCart(id) {
  try {
    if (!(await showAlertLogin())) return false;    
    showLoader()
    const removeFromCartOperation = await fetch("https://onlineshope.onrender.com/api/cart/remove" , {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({
        productId: id,
      })
    })

    const resultRemoveFromCartOperation = await removeFromCartOperation.json()
    if (!removeFromCartOperation.ok) {
      throw new Error(resultRemoveFromCartOperation.error || "Failed to delete item from cart");
    }

    renderCartItems(resultRemoveFromCartOperation.cart.products)

    hideLoader()
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
    const alertCart = document.querySelector(".alert-cart");
    const cartNotification = document.querySelector(".cart-notification");

    if (shoppingCart.length <= 0) {
      alertCart.classList.remove("d-none");
      alertCart.classList.add("d-block");
      cartNotification.classList.remove("is-notification");
    } else {
      alertCart.classList.add("d-none");
      alertCart.classList.remove("d-block");
    }

    // hideLoader();
  } catch (error) {
    console.error("Error in Function showAlertEmptyCart =>", error);
  }
};

//todo=================================================================== عملیات افزایش یا کاهش تعداد محصول در سبد خرید
let updateQuantity = async (operation, id , quantity) => {
  try {
    if (!(await showAlertLogin())) return false;   
    showLoader();    

    quantity = Number(quantity)
    if (operation === "increase") {
      quantity += 1;
    } else if (operation === "decrease" && quantity > 1) {
      quantity -= 1;
    } else {
      hideLoader();
      showModal("⚠️ حداقل تعداد محصول 1 می‌باشد.");
      return;
    }

    const res = await fetch("https://onlineshope.onrender.com/api/cart/update" , {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({
        productId: id,
        quantity: +quantity,
      })
    })
    const resultRes = await res.json();     
    renderCartItems(resultRes.cart.products)
    hideLoader()
    
  } catch (error) {
    hideLoader();
    console.error("Error in Function updateQuantity =>", error);
    showModal("❌ مشکل در به‌روزرسانی تعداد محصول");
  }
};

//todo=================================================================== تابع حذف همه موارد موجود از سبد خرید
async function removeAllFromCart() {
  try {
    if (!(await showAlertLogin())) return false;
    showLoader()

    const response = await fetch('https://onlineshope.onrender.com/api/cart/clear', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      hideLoader()
      throw new Error(data.message || 'مشکل در خالی کردن سبد خرید');
    }
    
    const container = document.querySelector(".cantain-box-goods");
    container.innerHTML = '';
    showAlertEmptyCart(data.cart.products);
    updateCartNotification();

    hideLoader()
    showModal('✅ سبد خرید با موفقیت خالی شد!');

  } catch (error) {
    hideLoader()
    console.error('Error in Function removeAllFromCart =>', error);
    showModal('خطا در خالی کردن سبد خرید');
  }
}

//todo=================================================================== تابع بستن سبد خرید
function closeCart() {
  const containerShoppingCart = document.querySelector(".container-shopping-cart");
  const openCart = document.querySelector(".open-cart");

  containerShoppingCart.addEventListener("click", async (e) => {
    try {
      if (e.target.classList.contains("container-shopping-cart")) {
        containerShoppingCart.style.visibility = "hidden";
        openCart.classList.remove("is-content");
        updateCartNotification()
      }
    } catch (error) {
      console.error("Error in Function closeCart =>", error);
    }
  });
}

//! -------------------------------------------------------------------bindings-------------------------------------------------------------------------
window.updateQuantity = updateQuantity
window.removeFromCart = removeFromCart

//! -------------------------------------------------------------------export-------------------------------------------------------------------------
export {
  updateCartNotification,
};
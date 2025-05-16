import {
  showModal,
} from "./ui.js";
import {
  hideLoader,
  showAlertLogin,
} from "../utils.js";
import { getToken } from "./storage.js";
//! --------------------------------------------------------------------------------------------------------------------------------------------

window.addEventListener("DOMContentLoaded" , () => {
  updateCartNotification()
  toggleCart()
  closeCart()
})

//todo========================================================== 🛒 تابع ساخت باکس محصول در سبد خرید
async function renderCartItems(cartItems) {
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
}
 // initTooltips(); //? فعال‌سازی تمام تولتیپ‌ها

//todo=================================================================== تابع کلیک روی ایکون سبد خرید و باز کردن سبد خرید
async function toggleCart() {
  const cartFetchOperation = await fetch(
    "https://onlineshope.onrender.com/api/cart",
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  );
  const resultCartFetchOperation = await cartFetchOperation.json(); 
  const shoppingCartIcon = document.querySelector(".shopping-cart-icon");
  const openCart = document.querySelector(".open-cart");
  const containerOpenCart = document.querySelector(".container-shopping-cart");
  const cartNotification = document.querySelector(".cart-notification");

  shoppingCartIcon.addEventListener("click", async () => {
    console.log('Opening cart');
    
    try {
      if (!(await showAlertLogin())) return false;
      openCart.classList.add("is-content");
      containerOpenCart.style.visibility = "visible";
      containerOpenCart.style.height = document.body.offsetHeight + "px";
      cartNotification.classList.remove("is-notification");
      renderCartItems(resultCartFetchOperation.products)
      showAlertEmptyCart();
      // hideLoader();
    } catch (error) {
      console.error("Error in Function toggleCart =>", error);
    }
  });
}

//todo========================================================== 🛒 تابع نمایش یا عدم نمایش نوتیف سبد خرید
async function updateCartNotification() {  
  const cartFetchOperation = await fetch(
    "https://onlineshope.onrender.com/api/cart",
    {
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

    if (!removeFromCartOperation.ok) {
      const resultRemoveFromCartOperation = await removeFromCartOperation.json()
      throw new Error(resultRemoveFromCartOperation.error || "Failed to delete item from cart");
    }

    showModal(`❌🧺  محصول از سبد خرید شما حذف شد`);

  } catch (error) {
    console.error("Error in Function removeFromCart =>", error);
    hideLoader();
    showModal("خطا در حذف محصول از سبد خرید");
  }
}

//todo=================================================================== نمایش پیغام خالی بودن سبد خرید
let showAlertEmptyCart = async () => {
  try {
    const cartFetchOperation = await fetch(
      "https://onlineshope.onrender.com/api/cart",
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    );
    const resultCartFetchOperation = await cartFetchOperation.json(); 
    const alertCart = document.querySelector(".alert-cart");
    const cartNotification = document.querySelector(".cart-notification");

    if (resultCartFetchOperation.products.length <= 0) {
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
    // showLoader();    
    if (!(await showAlertLogin())) return false;   

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
    console.log(resultRes);
    
    renderCartItems(resultRes.cart.products)
    
  } catch (error) {
    console.error("Error in Function updateQuantity =>", error);
    hideLoader();
    showModal("❌ مشکل در به‌روزرسانی تعداد محصول");
  }
};

//todo=================================================================== تابع حذف همه موارد موجود از سبد خرید
async function removeAllFromCart(event) {
  try {
    // let userLogged = await functionGetLoggedInUserInformation();
    const response = await fetch(
      `https://onlineshope.onrender.com/api/carts/${userLogged.userId}/items`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "مشکل در حذف سبد خرید");
    }

    await refreshCart();
    document.querySelectorAll(".product-box").forEach((box) => {
      changeBtnAfterDelete(box);
    });
    showAlertEmptyCart();
    hideLoader();
    showModal("✅ سبد خرید با موفقیت خالی شد!");
  } catch (error) {
    console.error("Error in Function removeAllFromCart =>", error);
    showModal("خطا در حذف سبد خرید");
    hideLoader();
  }
}

//todo=================================================================== تابع بستن سبد خرید
function closeCart() {
  const cantainerShoppingCart = document.querySelector(".container-shopping-cart");
  const openCart = document.querySelector(".open-cart");

  cantainerShoppingCart.addEventListener("click", async (e) => {
    try {
      if (e.target.classList.contains("container-shopping-cart")) {
        cantainerShoppingCart.style.visibility = "hidden";
        openCart.classList.remove("is-content");
        updateCartNotification()
      }
    } catch (error) {
      console.error("Error in Function closeCart =>", error);
    }
  });
}

window.updateQuantity = updateQuantity
window.removeFromCart = removeFromCart

export {
  updateCartNotification,
  updateQuantity,
  toggleCart,
  closeCart,
  removeAllFromCart,
  removeFromCart,
};
import {
  updateCartNotification,
  renderCartItems,
  changeBtnAfterDelete,
  showModal,
  createBoxToPageCart,
} from "./ui.js";
import {
  fetchProductFromDatabase,
  extractProductTitle,
} from "./box.js";
import {
  fetchDataFromApi,
  hideLoader,
  showAlertLogin,
  showLoader,
} from "../utils.js";
import { totalPaymentFunc } from "../../shoppingCart.js";
import { getLocalStorage, getToken } from "./storage.js";
//! --------------------------------------------------------------------------------------------------------------------------------------------

//todo=================================================================== تابع دریافت اطلاعات کاربر لاگین‌شده
// let functionGetLoggedInUserInformation = async () => {
//   try {
//     const userName = await getLocalStorage("login");
//     if (!userName) {
//       throw new Error("کاربر لاگین نکرده است");
//     }
    
//     const fetchAllUsersFromDB = await fetchDataFromApi(
//       "https://onlineshope.onrender.com/api/users"
//     );
    
//     const findInformationUserLogged = fetchAllUsersFromDB.find(
//       (user) => user.name === userName
//     );
    
//     if (!findInformationUserLogged) {
//       throw new Error("اطلاعات کاربر یافت نشد");
//     }

//     return {
//       userId: findInformationUserLogged._id,
//       name: findInformationUserLogged.name,
//       email: findInformationUserLogged.email
//     };
//   } catch (error) {
//     console.error("خطا در دریافت اطلاعات کاربر:", error);
//     throw error;
//   }
// };

//todo=================================================================== تابع دریافت اطلاعات سبد خرید کاربر
// const functionGetUserCartInformation = async () => {
//   try {
//     const user = await functionGetLoggedInUserInformation();
    
//     if (!user || !user.userId) {
//       console.error("اطلاعات کاربر نامعتبر است:", user);
//       return { items: [] };
//     }
    
//     console.log("تلاش برای دریافت سبد خرید برای کاربر:", user.userId);
    
//     const getUserCartFromDB = await fetchDataFromApi(
//       `https://onlineshope.onrender.com/api/carts/${user.userId}`
//     );
    
//     if (!getUserCartFromDB) {
//       console.error("اطلاعات سبد خرید دریافت نشد");
//       return { items: [] };
//     }
    
//     console.log('سبد خرید دریافت شد:', getUserCartFromDB);
//     return getUserCartFromDB;
//   } catch (error) {
//     console.error("خطا در دریافت اطلاعات سبد خرید:", error);
//     // برگرداندن یک سبد خالی در صورت بروز خطا
//     return { items: [] };
//   }
// };

//todo=================================================================== تابع رفرش سبد خرید
const refreshCart = async () => {
  try {
    // const cart = await functionGetUserCartInformation();
    console.log('Refreshed cart:', cart);
    // console.log('Refreshed cart items:', cart.items.map(item => ({ _id: item._id, product_id: item.product_id, product_name: item.product_name })));
    // await renderCartItems(cart.items);
    await totalPaymentFunc();
    // return cart;
  } catch (error) {
    console.error('Error refreshing cart:', error);
    return { items: [] };
  }
};

//todo=================================================================== تابع بررسی وجود یا عدم وجود محصول در سبد خرید
async function addToCart(event) {
  try {
    if (!(await showAlertLogin())) return false;
    
    const product = await fetchProductFromDatabase(event);
    // const user = await functionGetLoggedInUserInformation();
    
    if (!user || !product) {
      throw new Error("اطلاعات کاربر یا محصول نامعتبر است");
    }

    // const cart = await functionGetUserCartInformation();
    // if (!cart) {
    //   throw new Error("خطا در دریافت اطلاعات سبد خرید");
    // }

    const newCart = await newProductData(product, user);
    // const exists = cart.items.some((item) => item.product_id == product.id);
    
    if (!exists) {
      const result = await addCartToDB(product);
      await Promise.all([
        refreshCart(),
        updateCartNotification(),
        showAlertEmptyCart()
      ]);
      showModal(`✅🛒 ${product.name} به سبد خرید شما اضافه شد`);
    } else {
      hideLoader();
      showModal(`✅🛒 ${product.name} از قبل در سبد خرید شما موجود است`);
    }
  } catch (error) {
    ErrorHandler.logError(error, 'addToCart');
    ErrorHandler.showErrorToUser(error, "خطا در افزودن به سبد خرید");
    hideLoader();
  }
}

//todo=================================================================== تنظیم اطلاعات محصول جدید سبد خرید
let newProductData = async (product, user) => {
  const priceAfterDiscount = product.discount
    ? +(
        product.price -
        product.price * (Math.floor(product.discount / 10000) / 100)
      )
    : +product.price;

  return {
    product_id: product.id,
    product_name: product.name,
    product_images: product.images,
    product_description: product.description,
    product_ratings: +product.ratings,
    discount: +product.discount,
    price: +product.price,
    quantity: 1,
    totalPriceProductCart: priceAfterDiscount * 1
  };
};

//todo=================================================================== انجام عملیات افزودن کارت محصول جدید به دیتابیس
let addCartToDB = async (product) => {
  try {
    if (!user || !user.userId) {
      throw new Error("اطلاعات کاربر نامعتبر است");
    }

    const response = await fetch(
      `https://onlineshope.onrender.com/api/cart/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        })
      }
    );

    await handleApiError(response, 'addCartToDB');
    const result = await response.json();
    console.log(response);
    console.log(result);
    
    
    // به‌روزرسانی کش
    await updateCartCache(user.userId);
    
    return result;
  } catch (error) {
    ErrorHandler.logError(error, 'addCartToDB');
    throw error;
  }
};

//todo=================================================================== تابع کلیک روی ایکون سبد خرید و باز کردن سبد خرید
async function toggleCart() {
  const shoppingCart = document.querySelector(".shoping-cart");
  const openCart = document.querySelector(".open-cart");
  const containerOpenCart = document.querySelector(".cantainer-open-cart");
  const notifCart = document.querySelector(".notif-cart");

  shoppingCart.addEventListener("click", async () => {
    console.log('Opening cart');
    
    try {
      if (!(await showAlertLogin())) return false;
      openCart.classList.add("is-content");
      containerOpenCart.style.visibility = "visible";
      containerOpenCart.style.height = document.body.offsetHeight + "px";
      notifCart.classList.remove("is-notif");
      await refreshCart();
      showAlertEmptyCart();
      hideLoader();
    } catch (error) {
      console.error("Error in Function toggleCart =>", error);
    }
  });
}

//todo=================================================================== فراخوانی توابع سبد خرید
async function initializeCart() {
  try {
    // let userCart = await functionGetUserCartInformation();
    // await renderCartItems(userCart.items);
  } catch (error) {
    console.error("Error in Function initializeCart =>", error);
  }
}

//todo=================================================================== تابع حذف محصول از سبد خرید
async function removeFromCart(event) {
  try {
    if (!(await showAlertLogin())) return false;
    let titleCart = await extractProductTitle(event.target);
    // let userLogged = await functionGetLoggedInUserInformation();
    let Carts = await fetchDataFromApi(
      `https://onlineshope.onrender.com/api/carts/${userLogged.userId}`
    );
    if (!Carts) {
      throw new Error("Error fetching cart data in removeFromCart");
    }

    let productTarget = Carts.items.find(
      (cart) => cart.product_name === titleCart
    );
    if (!productTarget) {
      throw new Error("Product not found in cart");
    }
    console.log('Removing product:', productTarget);
    

    let res = await fetch(
      `https://onlineshope.onrender.com/api/carts/${userLogged.userId}/items/${productTarget._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to delete item from cart");
    }

    changeBtnAfterDelete(event.target);
    await refreshCart();
    await totalPaymentFunc();
    await finalBuyCartFunc();
    hideLoader();
    showModal(`❌🧺 ${titleCart} از سبد خرید شما حذف شد`);
  } catch (error) {
    console.error("Error in Function removeFromCart =>", error);
    hideLoader();
    showModal("خطا در حذف محصول از سبد خرید");
  }
}

//todo=================================================================== نمایش پیغام خالی بودن سبد خرید
let showAlertEmptyCart = async () => {
  try {
    // const updateCart = await functionGetUserCartInformation();
    const alertCart = document.querySelector(".alert-cart");
    const notifCart = document.querySelector(".notif-cart"); 

    // if (updateCart.items.length <= 0) {
    //   alertCart.classList.remove("d-none");
    //   alertCart.classList.add("d-block");
    //   notifCart.classList.remove("is-notif");
    // } else {
    //   alertCart.classList.add("d-none");
    //   alertCart.classList.remove("d-block");
    // }

    // await renderCartItems(updateCart.items);
    hideLoader();
  } catch (error) {
    console.error("Error in Function showAlertEmptyCart =>", error);
  }
};

//todo=================================================================== عملیات افزایش یا کاهش تعداد محصول در سبد خرید
let updateQuantity = async (event, operation) => {
  try {
    showLoader();
    if (!(await showAlertLogin())) return false;
    
    const boxProduct = event.target.closest(".swiper-slide");
    const title = await extractProductTitle(event.target);
    const priceElem = boxProduct.querySelector(".total-price");
    const quantityElem = boxProduct.querySelector(".number");
    // const userLogged = await functionGetLoggedInUserInformation();
    
    // دریافت اطلاعات سبد خرید با کش
    const cartCache = await getCartCache(userLogged.userId);
    const getProductsDB = cartCache || await fetchDataFromApi(
      `https://onlineshope.onrender.com/api/carts/${userLogged.userId}`
    );

    const objProduct = getProductsDB.items.find(
      (item) => item.product_name === title
    );

    if (!objProduct) {
      hideLoader();
      showModal("❌ محصول مورد نظر یافت نشد!");
      return;
    }

    let quantity = Number(quantityElem.innerHTML);
    const itemPrice = calculateDiscountedPrice(objProduct.price, objProduct.discount);
    let updatePrice;

    if (operation === "increase") {
      quantity += 1;
    } else if (operation === "decrease" && quantity > 1) {
      quantity -= 1;
    } else {
      hideLoader();
      showModal("⚠️ حداقل تعداد محصول 1 می‌باشد.");
      return;
    }

    updatePrice = itemPrice * quantity;

    // به‌روزرسانی UI
    quantityElem.textContent = quantity;
    priceElem.textContent = updatePrice.toLocaleString();
    
    // ارسال درخواست به سرور
    await editeDataProductToDB(quantity, objProduct._id, updatePrice);    
    
    // به‌روزرسانی کش
    await updateCartCache(userLogged.userId);
    
    // به‌روزرسانی سبد خرید
    await Promise.all([
      refreshCart(),
      totalPaymentFunc(),
      finalBuyCartFunc()
    ]);
    
    hideLoader();
  } catch (error) {
    console.error("Error in Function updateQuantity =>", error);
    hideLoader();
    showModal("❌ مشکل در به‌روزرسانی تعداد محصول");
  }
};

//todo=================================================================== تابع گرفتن دیتای جدید و انجام عملیات ویرایش اطلاعات
let editeDataProductToDB = async (quantity, cartID, totalPriceProductCart) => {
  try {
    if (!(await showAlertLogin())) return false;
    // const userLogged = await functionGetLoggedInUserInformation();
        
    // const cartCache = await getCartCache(userLogged.userId);
    const product = cartCache || await fetchDataFromApi(
      `https://onlineshope.onrender.com/api/carts/${userLogged.userId}`
    );
    
    if (!product || !product.items) {
      throw new Error("اطلاعات سبد خرید نامعتبر است");
    }

    const productCart = product.items.find((item) => 
      item._id.toString() === cartIdString
    );

    if (!productCart) {
      throw new Error("آیتم در سبد خرید یافت نشد");
    }
    
    const updateCart = {
      ...productCart,
      quantity,
      totalPriceProductCart
    };
    
    const response = await fetch(
      `https://onlineshope.onrender.com/api/carts/${userLogged.userId}/items/${cartID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateCart),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "خطا در به‌روزرسانی سبد خرید");
    }

    const result = await response.json();
    await updateCartCache(userLogged.userId);
    return result;
  } catch (error) {
    showModal(error.message || "❌ خطا در به‌روزرسانی سبد خرید");
    throw error;
  }
};

//todo=================================================================== تابع محاسبه قیمت با تخفیف
const calculateDiscountedPrice = (price, discount) => {
  if (!discount) return price;
  return price - (price * (Math.floor(discount / 10000) / 100));
};

//todo=================================================================== تابع مدیریت کش سبد خرید
const cartCache = new Map();

const getCartCache = async (userId) => {
  if (cartCache.has(userId)) {
    const cacheData = cartCache.get(userId);
    if (Date.now() - cacheData.timestamp < 30000) { //todo=================================================================== کش برای 30 ثانیه معتبر است
      return cacheData.data;
    }
  }
  return null;
};

const updateCartCache = async (userId) => {
  const cartData = await fetchDataFromApi(
    `https://onlineshope.onrender.com/api/carts/${userId}`
  );
  cartCache.set(userId, {
    data: cartData,
    timestamp: Date.now()
  });
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

let finalBuyCartFunc = async () => {
  try {
    // let shopingCartProduct = await functionGetUserCartInformation();
    // await createBoxToPageCart(shopingCartProduct.items);
  } catch (error) {
    console.error("Error in Function finalBuyCartFunc =>", error);
  }
};

//todo=================================================================== تابع ست کردن رویداد کلیک روی دکمه‌های موجود در سبد خرید
function attachCartEventListeners() {
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", removeFromCart);
  });
  document.querySelectorAll(".plus-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => updateQuantity(event, "increase"));
  });
  document.querySelectorAll(".minus-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => updateQuantity(event, "decrease"));
  });
  document.querySelectorAll(".clear-cart-all").forEach((btn) => {
    btn.addEventListener("click", removeAllFromCart);
  });
  document
    .querySelector(".final-buy-cart")
    .addEventListener("click", finalBuyCartFunc);
}

//todo=================================================================== تابع بستن سبد خرید
function closeCart(userCart, userLogged) {
  const cantainerOpenCart = document.querySelector(".cantainer-open-cart");
  const openCart = document.querySelector(".open-cart");
  const notifCart = document.querySelector(".notif-cart");

  cantainerOpenCart.addEventListener("click", async (e) => {
    try {
      if (e.target.classList.contains("cantainer-open-cart")) {
        cantainerOpenCart.style.visibility = "hidden";
        openCart.classList.remove("is-content");

        const loggedInUser = await userLogged();
        if (!loggedInUser) return false;
        if (!userCart) {
          throw new Error("Error fetching cart data in closeCart");
        }

        if (userCart.length > 0) {
          notifCart.classList.add("is-notif");
        }
      }
      updateCartNotification(userCart);
    } catch (error) {
      console.error("Error in Function closeCart =>", error);
    }
  });
}

export {
  attachCartEventListeners,
  updateQuantity,
  finalBuyCartFunc,
  addToCart,
  toggleCart,
  initializeCart,
  closeCart,
  removeAllFromCart,
  removeFromCart,
  // functionGetLoggedInUserInformation,
  // functionGetUserCartInformation,
};
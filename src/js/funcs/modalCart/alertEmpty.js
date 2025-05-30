//todo=================================================================== نمایش پیغام خالی بودن سبد خرید
let showAlertEmptyCart = async (shoppingCart) => {
  const alertCart = document.querySelector(".alert-cart");
  const cartNotification = document.querySelector(".cart-notification");

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


//! -------------------------------------------------------------------exports-------------------------------------------------------------------------
export { showAlertEmptyCart }
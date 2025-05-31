import { updateCartNotification } from "./cartBtn.js";

//todo=================================================================== تابع بستن سبد خرید
function closeCart() {
  const containerOpenCart = document.querySelector(".container-shopping-cart");
  const shoppingCartIcon = document.querySelector(".shopping-cart-icon");
  const openCart = document.querySelector(".open-cart");

  if (containerOpenCart) {
    containerOpenCart.addEventListener("click", async (e) => {
      try {
        if (e.target.classList.contains("container-shopping-cart")) {
          containerOpenCart.style.display = "none";
          // openCart.classList.remove("is-content");
          // shoppingCartIcon.style.zIndex = "9";
          updateCartNotification();
        }
      } catch (error) {
        console.error("Error in Function closeCart =>", error);
      }
    });
    
  }
}

export { closeCart }
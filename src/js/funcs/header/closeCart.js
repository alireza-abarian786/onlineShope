
//todo=================================================================== تابع بستن سبد خرید
function closeCart() {
  const containerOpenCart = document.querySelector(".container-shopping-cart");

  if (containerOpenCart) {
    containerOpenCart.addEventListener("click", async (e) => {
      try {
        if (e.target.classList.contains("container-shopping-cart")) {
          containerOpenCart.style.display = "none";
        }
      } catch (error) {
        console.error("Error in Function closeCart =>", error);
      }
    });
    
  }
}

export { closeCart }
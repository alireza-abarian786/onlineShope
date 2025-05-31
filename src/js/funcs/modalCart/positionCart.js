//todo=================================================================== محل قرار گیری مودال سبد خرید
function positionOpenCart() {  
  const shoppingCartIcon = document.querySelector(".shopping-cart-icon");
  const openCart = document.querySelector(".open-cart");
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
// window.addEventListener("scroll", positionOpenCart);


export { positionOpenCart }
import { searchGlobalHandler } from "./funcs/utils.js";



//! ---------------------------------------------------------------------------------------------------
const boxDropDown = document.querySelector(".category-menu + div");
const categoryMenu = document.querySelector(".category-menu");
const iconCategoryMenu = document.querySelector(".icon-category-menu");
const searchGlobalInputElem = document.querySelector("#search-global");
//! ---------------------------------------------------------------------------------------------------

function settingsMenuDropDown() {
  if (window.innerWidth < 992) {
    boxDropDown.classList.remove("open-slide");
    iconCategoryMenu.classList.replace("icon-xl-window", "icon-lg-window");
  
    categoryMenu.addEventListener("click", () => {
      iconCategoryMenu.classList.toggle("icon-xl-window");
      iconCategoryMenu.classList.toggle("icon-lg-window");
    });
  }
}

searchGlobalInputElem.addEventListener("keyup" , (event) => searchGlobalHandler(event))


window.addEventListener('load' , () => {
  // console.log('window');
  
})


export {settingsMenuDropDown}






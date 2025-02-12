let boxDropDown = document.querySelector(".category-menu + div");
let categoryMenu = document.querySelector(".category-menu");
let iconCategoryMenu = document.querySelector(".icon-category-menu");

function settingsMenuDropDown(params) {
    if (window.innerWidth < 992) {
        boxDropDown.classList.remove("open-slide");
        iconCategoryMenu.classList.replace("icon-xl-window", "icon-lg-window");
      
        categoryMenu.addEventListener("click", () => {
          iconCategoryMenu.classList.toggle("icon-xl-window");
          iconCategoryMenu.classList.toggle("icon-lg-window");
        });
      }
}



export {settingsMenuDropDown}











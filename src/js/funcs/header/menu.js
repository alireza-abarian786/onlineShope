//todo======================================== دریافت کل دسته بندی ها
const categoriesData = async () => {
  const categories = await fetch(
    "https://onlineshope.onrender.com/api/categories"
  );
  const categoriesData = await categories.json();

  return categoriesData;
};

//todo============================================== تنظیمات منو در سایز 992
function settingsMenuDropDown() {
  const boxDropDown = document.querySelector(".category-menu + div");
  const iconCategoryMenu = document.querySelector(".icon-category-menu");
  const categoryMenu = document.querySelector(".category-menu");

  if (window.innerWidth < 992 && boxDropDown) {
    boxDropDown.classList.remove("open-slide");
    iconCategoryMenu.classList.replace("icon-xl-window", "icon-lg-window");

    categoryMenu.addEventListener("click", () => {
      iconCategoryMenu.classList.toggle("icon-xl-window");
      iconCategoryMenu.classList.toggle("icon-lg-window");
    });
  }
}

// todo============================================== و نمایش در قسمت منو category دریافت
const fetchCategoriesForShowToMenu = async () => {
  const categoryWrapperXl = document.querySelector(".category-wrapper-xl");
  const categoryWrapperLg = document.querySelector(".category-wrapper-lg");
  const cartItemsData = await categoriesData();

  if (categoryWrapperXl) {
    cartItemsData.forEach((item) => {
      categoryWrapperXl.insertAdjacentHTML(
        "beforeend",
        `
              <a href="./category.html?cat=${item.urlSearch}&page=1">
                  <h6 class="shadow-sm">${item.name}</h6>
              </a>
          `
      );
    });
  }

  if (categoryWrapperLg) {
    cartItemsData.forEach((item) => {
      categoryWrapperLg.insertAdjacentHTML(
        "beforeend",
        `
              <a href="./category.html?cat=${item.urlSearch}&page=1">
                  <h6 class="shadow-sm">${item.name}</h6>
              </a>
          `
      );
    });
  }
};

export { fetchCategoriesForShowToMenu, settingsMenuDropDown, categoriesData };

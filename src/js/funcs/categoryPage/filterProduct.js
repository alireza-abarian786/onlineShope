import { changeShowBoxes } from "./changingStateBoxes.js";

//todo======================================================= تابع مرتب سازی باکس ها بر اساس فیلتر های مشخص شده
let filteringProducts = async (sortingName , sortingProducts) => {
  let arrSorting = []  

  switch (sortingName) {
    case 'default': {
      arrSorting = sortingProducts
      break;
    }
    case 'cheapest': {
      arrSorting = sortingProducts.slice().sort((a , b) => a.price - b.price)
      break;
    }
    case 'expensive': {
      arrSorting = sortingProducts.slice().sort((a, b) => b.price - a.price)
      break;
    }
    case 'discount': {
      arrSorting = sortingProducts.slice().sort((a , b) => b.discount - a.discount)      
      break;
    }
    case 'score': {
      arrSorting = sortingProducts.slice().sort((a, b) => b.ratings - a.ratings)
      break;
    }
    default: {
      arrSorting = sortingProducts
      break;
    }
  }

  return arrSorting; 
}

//todo======================================================= و مرتب سازی باکس ها dropdown منو های active تغییر وضعیت
const setDropdownItem = async (getProductCategory) => {  
  const dropdownItem = document.querySelectorAll(".dropdown-item")
  const dropdownCategory = document.querySelector(".dropdown-category")

  dropdownItem.forEach((item) => {
    item.addEventListener('click', async (e) => {
      dropdownItem.forEach((item) => item.classList.remove('active'));
      e.target.classList.add('active')  
      dropdownCategory.textContent = e.target.textContent  
       
      const sorting = await filteringProducts(e.target.dataset.sorting , getProductCategory)
      changeShowBoxes(sorting) 
    })
  })
}

export { filteringProducts , setDropdownItem }
import { showLoader } from "../utils.js"
import { category } from "../../category.js"

//todo======================================================= تابع تنظیم استایل کلید های جابجایی بین صفحات
const handlePagination = (array , element , showItemCountToPage , currentPage) => {    
  element.textContent = ''
  const endIndex = showItemCountToPage * currentPage
  const startIndex = endIndex - showItemCountToPage
  const itemsCount = Math.ceil(array.length / showItemCountToPage)
  const itemsShow = array.slice(startIndex, endIndex)

  for (let i = 1; i < itemsCount + 1; i++) {
    element.insertAdjacentHTML('beforeend', `
      <li class="page-item" style="cursor: pointer;">
      ${i === Number(currentPage) ? 
        `<a onclick="clickOnPagination('page' , ${i})" class="page-link rounded text-center active">${i}</a>`
        : 
        `<a onclick="clickOnPagination('page' , ${i})" class="page-link rounded text-center">${i}</a>`
      }
      </li>  
    `)
  }
  
  return itemsShow;
}

//todo======================================================= تابع جابجایی بین صفحات
const clickOnPagination = (param , value) => {  
  showLoader()
  const urlSearchParams = new URL (location.href)
  urlSearchParams.searchParams.set(param , value)
  window.history.replaceState(null , "" , urlSearchParams.toString())
  category() 
}

export { clickOnPagination , handlePagination }
import { createProductsRowTemplateHtml, createProductsTemplateHtml } from "../../funcs/ui.js"

const containerCategoryFooter = document.querySelector(".container-category__footer")

//todo======================================================= حذف کلاس اکتیو از ایکون های ویوی باکس ها
const removeActive = () => {document.querySelectorAll('.active-view').forEach((item) => item.classList.remove('active-view'));}

//todo======================================================= هندل کردن تغییرات لازم بعد از کلیک روی ایکون های ویو
const handleItemClick = async (e , getProductCategory ) => {
  removeActive()  

  if (e.target.classList.contains('btn-outline-secondary')) {
    e.target.classList.add('active-view')
    
  } else if (e.target.classList.contains('bi')) {
    e.target.classList.add('active-view')
    e.target.parentElement.classList.add('active-view')

  }
  
  if (e.target.classList.contains('btn-row') || e.target.parentElement.classList.contains('btn-row')) {
    createProductsRowTemplateHtml(getProductCategory)
  } else {
      createProductsTemplateHtml(containerCategoryFooter , getProductCategory)

  }
}

//todo======================================================= تغییر حالت باکس ها
const changeShowBoxes = async (getProductCategory) => { 
  const iconView = document.querySelectorAll(".btn-outline-secondary")

  iconView.forEach((item) => {    
    if (item.classList.contains('btn-col') && item.classList.contains('active-view')) {
      createProductsTemplateHtml(containerCategoryFooter , getProductCategory)
    } else if (item.classList.contains('btn-row') && item.classList.contains('active-view')) {
      createProductsRowTemplateHtml(getProductCategory)
    }

    item.removeEventListener('click', handleItemClick);
    item.addEventListener('click', async (e) => {
      await handleItemClick(e , getProductCategory)
    })
  })
}

export { changeShowBoxes }
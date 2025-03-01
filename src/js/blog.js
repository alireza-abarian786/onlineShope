import { createBlogs } from "./funcs/store/ui.js"

let cantainerBlogs = document.querySelector('.cantainer-category')

document.addEventListener('DOMContentLoaded', () => {    
    createBlogs(cantainerBlogs)

})
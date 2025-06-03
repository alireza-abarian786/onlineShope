import { createBlogs } from "./funcs/ui.js"

let containerBlogs = document.querySelector('.container-category')
document.addEventListener('DOMContentLoaded', () => {    
    createBlogs(containerBlogs)
    console.log('blog');
})
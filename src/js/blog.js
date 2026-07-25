// src/js/blog.js

import { createBlogs } from "./funcs/ui.js";
import { hideLoader } from "./funcs/utils.js";

let containerBlogs = document.querySelector('.container-category');

document.addEventListener('DOMContentLoaded', () => {    
    createBlogs(containerBlogs);
    hideLoader();
    console.log('✅ Blog page loaded successfully');
});
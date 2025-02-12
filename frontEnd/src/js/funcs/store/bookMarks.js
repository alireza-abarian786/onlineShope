import { getLocalStorage, setLocalStorage } from "./storage.js";
import { getProductData , getIDProductMarkedToJson} from "./box.js";
import { showModal } from "./ui.js";

// 🔖 toggle تابع عمل کردن بوکمارک ها به صورت
function toggleBookmark(event) {
    let product = getProductData(event.target);
    let bookmarks = getLocalStorage('mark');  

    let prodectID = getIDProductMarkedToJson(event.target)
    let bookmarksID = getLocalStorage('id')
    
    
    // 🔖 بررسی وجود یا عدم وجود محصول در بوکمارک ها
    let index = bookmarks.findIndex(item => item.title === product.title);
    let id = bookmarksID.findIndex(item => item.title === product.title);
    let card = event.target.closest('.swiper-slide')
        
    if (index === -1) { 
        // 🔖 افزودن محصول به بوکمارک ها
        bookmarks.push(product);
        card.querySelector('.box-img > div').classList.add("is-mark");
        card.querySelector('.box-img > div').classList.remove("not-mark");
        
        // افزودن به دیتابیس و گرفتن ایدی در لوکال
        bookmarksID.push(prodectID)
        addBookMarks(product)
        showModal(`✅ ${product.title} به لیست علاقه مندی های شما اضافه شد`)
        
    } else { 
        // 🔖 حذف محصول از بوکمارک ها
        bookmarks.splice(index, 1);
        card.querySelector('.box-img > div').classList.remove("is-mark");
        card.querySelector('.box-img > div').classList.add("not-mark");
                
        // حذف از دیتابیس و گرفتن ایدی از لوکال
        removeBookMarkItem(bookmarksID[id].id)
        bookmarksID.splice(id , 1)
        showModal(`❌ ${product.title} از لیست علاقه مندی های شما حذف  شد`)

    }
    
    // اعمال تغییرات در لوکال استوریج
    setLocalStorage('mark', bookmarks);
    setLocalStorage('id' , bookmarksID)
}

// ✅ تابع بررسی وضعیت بوکمارک یا سبد خرید بودن یا نبودن محصولات
function initializeStatus(key , element , isLocal , notLocal) {
    let bookmarks = getLocalStorage(key);

    // 🧺🔖 دسترسی به تمام بوکمارک ها و سبد خرید
    document.querySelectorAll(element).forEach(btn => {
        let card = btn.closest(".swiper-slide");
        let title = card.querySelector(".box-discription h6").textContent;

        // ⚡ محصولاتی که بوکمارک یا خرید شدن رو با اعمال تغییرات مشخص کن
        if (bookmarks.some(item => item.title === title)) {            
            btn.parentElement.classList.add(isLocal);
            btn.parentElement.classList.remove(notLocal);
        }
    });
}

let addBookMarks = async (item) => {
    item.id = String(Date.now())
    let res = await fetch('http://localhost:3000/bookmarks', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(item)
    })
}

let removeBookMarkItem = async (id) => {    
    let res = await fetch(`http://localhost:3000/bookmarks/${id}`, {method: 'DELETE',})
}


export {toggleBookmark , initializeStatus}
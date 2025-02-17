// وارد کردن توابع از ماژول‌های دیگر
import { getIDProductMarkedToJson , allProduct} from "./box.js";
import { showModal } from "./ui.js";

// تابعی برای دریافت تمام بوکمارک‌ها از سرور
let allBookmarks = async () => {
    let resMark = await fetch('http://localhost:4000/bookmarks');
    let dataMark = await resMark.json();
    return dataMark
}

// 🔖 toggle تابع عمل کردن بوکمارک ها به صورت
async function toggleBookmark(event) {
    let card = await event.target.closest('.swiper-slide')  // پیدا کردن کارت محصول از روی رویداد کلیک
    let title = await card.querySelector(".box-discription h6").textContent;  // گرفتن عنوان محصول

    // 🔖 بررسی وجود یا عدم وجود محصول در بوکمارک‌ها
    let isBookMark = await isBookMarkToDB(event) 
    let newProdect = await getIDProductMarkedToJson(event.target)  // دریافت داده‌های محصولی که بوکمارک شده

    let idProduct = await getIDProduct(event)  // گرفتن اطلاعات محصول بر اساس رویداد
    let getMark = await isBookMark[0].find(mark => mark.name === title)  // پیدا کردن بوکمارک بر اساس عنوان محصول

    if (isBookMark[1] === -1) {  // اگر محصول در بوکمارک‌ها وجود ندارد
        // 🔖 افزودن محصول به بوکمارک‌ها
        addBookMarks(newProdect)  // اضافه کردن به لیست بوکمارک‌ها
        card.querySelector('.box-img > div').classList.add("is-mark");  // تغییر استایل برای نمایش بوکمارک بودن
        card.querySelector('.box-img > div').classList.remove("not-mark");  // حذف استایل بوکمارک نبودن
        showModal(`✅ ${idProduct.title} به لیست علاقه مندی های شما اضافه شد`)  // نمایش پیام موفقیت
    } else {  // اگر محصول قبلاً در بوکمارک‌ها باشد
        // 🔖 حذف محصول از بوکمارک‌ها
        removeBookMarkItem(getMark.id)  // حذف از سرور
        card.querySelector('.box-img > div').classList.remove("is-mark");  // تغییر استایل
        card.querySelector('.box-img > div').classList.add("not-mark");  // تغییر استایل
        showModal(`❌ ${idProduct.title} از لیست علاقه مندی های شما حذف  شد`)  // نمایش پیام حذف
    }
}

// تابع برای دریافت اطلاعات محصول از روی رویداد
let getIDProduct = async (event) => {
    let card = await event.target.closest('.swiper-slide')  // پیدا کردن کارت محصول
    let title = await card.querySelector(".box-discription h6").textContent;  // گرفتن عنوان محصول

    // دریافت اطلاعات تمام محصولات
    let Products = await allProduct()

    let getProductTarget = await Products.find(product => product.name === title)  // پیدا کردن محصول بر اساس عنوان

    return getProductTarget;
}

// تابع برای بررسی وضعیت بوکمارک بودن یا نبودن محصول در دیتابیس
let isBookMarkToDB = async (event) => {
    try {
        let idProduct = await getIDProduct(event)  // دریافت اطلاعات محصول

        // دریافت اطلاعات تمام بوکمارک‌ها
        let Marks = await allBookmarks()

        // بررسی اینکه آیا محصولی در بوکمارک‌ها وجود دارد
        let reviewStatusMakeProduct = Marks.findIndex(mark => mark.product_id == idProduct.id)

        console.log("Is any product bookmarked?", reviewStatusMakeProduct);  // نمایش وضعیت بوکمارک بودن
        return [Marks, reviewStatusMakeProduct]  // برگرداندن داده‌ها برای استفاده در بخش‌های دیگر
    } catch (error) {
        console.error("Error fetching data:", error);  // در صورت بروز خطا، چاپ پیام خطا
    }
};

// ✅ تابع بررسی وضعیت بوکمارک یا سبد خرید بودن یا نبودن محصولات
async function initializeStatusMarks(key , element , isLocal , notLocal) {    
    // دریافت اطلاعات تمام بوکمارک‌ها
    let Marks = await allBookmarks()

    // 🧺🔖 دسترسی به تمام بوکمارک ها و سبد خرید
    document.querySelectorAll(element).forEach(btn => {
        let card = btn.closest(".swiper-slide");  // پیدا کردن کارت محصول
        let title = card.querySelector(".box-discription h6").textContent;  // دریافت عنوان محصول

        // ⚡ محصولاتی که بوکمارک یا خرید شدن رو با اعمال تغییرات مشخص کن
        if (key.some(item => item.name === title)) {  // اگر محصول در لیست بوکمارک‌ها یا سبد خرید باشد
            btn.parentElement.classList.add(isLocal);  // اعمال کلاس برای نشان دادن وضعیت
            btn.parentElement.classList.remove(notLocal);  // حذف کلاس دیگر
        }
    });
}

// تابع برای اضافه کردن بوکمارک به دیتابیس
let addBookMarks = async (item) => {
    let res = await fetch('http://localhost:4000/bookmarks', {
        method: 'POST',  // ارسال داده به صورت POST
        headers: {
            'Content-type': 'application/json'  // مشخص کردن نوع داده به صورت JSON
        },
        body: JSON.stringify(item)  // ارسال داده به صورت رشته JSON
    })
}

// تابع برای حذف بوکمارک از دیتابیس
let removeBookMarkItem = async (id) => {    
    let res = await fetch(`http://localhost:4000/bookmarks/${id}`, {method: 'DELETE',})  // ارسال درخواست حذف به سرور
}

// تابع برای تنظیم رویداد کلیک روی دکمه‌های بوکمارک
let clickAddBookMark = () => {
    // 🛒 ست کردن رویداد کلیک روی دکمه بوکمارک شدن محصول
    document.querySelectorAll('.icon-bookmark').forEach(icon => {    
        icon.addEventListener('click', toggleBookmark);  // افزودن رویداد کلیک
    });
}

// صادر کردن توابع برای استفاده در سایر بخش‌ها
export {toggleBookmark , initializeStatusMarks , clickAddBookMark , allBookmarks}
// وارد کردن توابع از ماژول‌های دیگر
import { getIDProductMarkedToJson , allProduct , titleProduct} from "./box.js";
import { showModal } from "./ui.js";
import { showAlertLogin } from "../utils.js";

//! تابعی برای دریافت تمام بوکمارک‌ها از سرور
let allBookmarks = async () => {
    let resMark = await fetch('http://localhost:4000/bookmarks');
    let dataMark = await resMark.json();
    return dataMark
}

//! 🔖 toggle تابع عمل کردن بوکمارک ها به صورت
async function toggleBookmark(event) {
    let alertLogin = await showAlertLogin()
    if (!alertLogin) {
        return false;
    }
    let card = event.target.closest('.swiper-slide')
    let title = await titleProduct(event.target)                                                   //* دریافت عنوان محصول
    let isBookMark = await isBookMarkToDB(event)                                                  //* 🔖 بررسی وجود یا عدم وجود محصول در بوکمارک‌ها
    let newProduct = await getIDProductMarkedToJson(event)                                       //* دریافت داده‌های محصولی که بوکمارک شده
    let getMark = await isBookMark[0].find(mark => mark.product_name === title)                        //* پیدا کردن بوکمارک بر اساس عنوان محصول
    // let idProduct = await getIDProduct(event)                                                   //* گرفتن اطلاعات محصول بر اساس رویداد

    if (isBookMark[1] === -1) {                                                                        //* اگر محصول در بوکمارک‌ها وجود ندارد
        addBookMarks(newProduct)                                                                      //* اضافه کردن به لیست بوکمارک‌ها
        card.querySelector('.mark-contain').classList.add("is-mark");                               //* تغییر استایل برای نمایش بوکمارک بودن
        card.querySelector('.mark-contain').classList.remove("not-mark");                          //* حذف استایل بوکمارک نبودن
        showModal(`✅ ${title} به لیست علاقه مندی های شما اضافه شد`)                   //* نمایش پیام موفقیت

    } else {                                                                                             //* اگر محصول قبلاً در بوکمارک‌ها باشد
        removeBookMarkItem(getMark.id)                                                                  //* حذف از لیست بوکمارک‌ها
        card.querySelector('.mark-contain').classList.remove("is-mark");                              //* تغییر استایل
        card.querySelector('.mark-contain').classList.add("not-mark");                               //* تغییر استایل
        showModal(`❌ ${title} از لیست علاقه مندی های شما حذف  شد`)                      //* نمایش پیام حذف
    }
}

//! تابع برای دریافت اطلاعات محصول از روی رویداد
let getIDProduct = async (event) => {
    let title = await titleProduct(event.target)                                                       //* دریافت عنوان محصول
    let Products = await allProduct()                                                                 //* دریافت اطلاعات تمام محصولات
    let getProductTarget = await Products.find(product => product.name === title)                    //* پیدا کردن محصول بر اساس عنوان
    return getProductTarget;
}

//! تابع برای بررسی وضعیت بوکمارک بودن یا نبودن محصول در دیتابیس
let isBookMarkToDB = async (event) => {
    try {
        let idProduct = await getIDProduct(event)                                                             //* دریافت اطلاعات محصول
        let Marks = await allBookmarks()                                                                     //* دریافت اطلاعات تمام بوکمارک‌ها
        let reviewStatusMakeProduct = Marks.findIndex(mark => mark.product_id == idProduct.id)              //* بررسی اینکه آیا محصولی در بوکمارک‌ها وجود دارد
        return [Marks, reviewStatusMakeProduct]                                                             //* برگرداندن داده‌ها برای استفاده در بخش‌های دیگر

    } catch (error) {
        console.error("Error fetching data:", error);                                                       //* در صورت بروز خطا، چاپ پیام خطا
    }
};

//! تابع برای اضافه کردن بوکمارک به دیتابیس
let addBookMarks = async (item) => {
    await fetch('http://localhost:4000/bookmarks', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(item)
    })
}

//! تابع برای حذف بوکمارک از دیتابیس
let removeBookMarkItem = async (id) => {    
    let res = await fetch(`http://localhost:4000/bookmarks/${id}`, {method: 'DELETE',})                     //* ارسال درخواست حذف به سرور
}

//! تابع برای تنظیم رویداد کلیک روی دکمه‌های بوکمارک
let clickAddBookMark = () => {
    document.querySelectorAll('.icon-bookmark').forEach(icon => {                                           //* 🛒 ست کردن رویداد کلیک روی دکمه بوکمارک شدن محصول 
        icon.addEventListener('click', toggleBookmark);
    });
}

export {toggleBookmark , clickAddBookMark , allBookmarks , titleProduct}
import { createBookmarkProductObject , extractProductTitle} from "./box.js";
import { showModal , updateBookmarkUI} from "./ui.js";
import { showAlertLogin , fetchDataFromApi} from "../utils.js";
// -------------------------------------------------------------------------------------------------

//! 🔖 toggle تابع عمل کردن بوکمارک ها به صورت
async function toggleBookmark(event) {
    if (! await showAlertLogin()) return false;

    let card = event.target.closest('.swiper-slide')
    let title = await extractProductTitle(event.target)                                                   //* دریافت عنوان محصول
    const [marks, markIndex] = await isBookMarkToDB(event);                                             //* 🔖 بررسی وجود یا عدم وجود محصول در بوکمارک‌ها    

    if (markIndex === -1) {                                                                        //* اگر محصول در بوکمارک‌ها وجود ندارد
        await addBookMarks(await createBookmarkProductObject(event))                              //* اضافه کردن به لیست بوکمارک‌ها
        updateBookmarkUI(card, true)
        showModal(`✅ ${title} به لیست علاقه مندی های شما اضافه شد`)                   //* نمایش پیام موفقیت

    } else {                                                                                             //* اگر محصول قبلاً در بوکمارک‌ها باشد
        await removeBookMarkItem(marks[markIndex].id)                                                                  //* حذف از لیست بوکمارک‌ها
        updateBookmarkUI(card, false)
        showModal(`❌ ${title} از لیست علاقه مندی های شما حذف  شد`)                      //* نمایش پیام حذف
    }
}

//! تابع برای دریافت اطلاعات محصول از روی رویداد
let getIDProduct = async (event) => {
    let title = await extractProductTitle(event.target)                                                       //* دریافت عنوان محصول
    let Products = await fetchDataFromApi('http://localhost:4000/products');                                                                //* دریافت اطلاعات تمام محصولات
    let getProductTarget = await Products.find(product => product.name === title)                    //* پیدا کردن محصول بر اساس عنوان
    return getProductTarget;
}

//! تابع برای بررسی وضعیت بوکمارک بودن یا نبودن محصول در دیتابیس
let isBookMarkToDB = async (event) => {
    try {
        let idProduct = await getIDProduct(event)                                                             //* دریافت اطلاعات محصول
        let Marks = await fetchDataFromApi('http://localhost:4000/bookmarks');                                                                     //* دریافت اطلاعات تمام بوکمارک‌ها
        let reviewStatusMakeProduct = Marks.findIndex(mark => mark.product_id == idProduct.id)              //* بررسی اینکه آیا محصولی در بوکمارک‌ها وجود دارد
        return [Marks, reviewStatusMakeProduct]                                                             //* برگرداندن داده‌ها برای استفاده در بخش‌های دیگر

    } catch (error) {
        console.error("Error fetching data:", error);                                                       //* در صورت بروز خطا، چاپ پیام خطا
    }
};

//! تابع برای اضافه کردن بوکمارک به دیتابیس
let addBookMarks = async (item) => {
    if (!item || !item.product_id || !item.user_id) {
        console.error("Invalid item data:", item);
        return;
    }
    
    try {
        await fetch('http://localhost:4000/bookmarks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        
    } catch (error) {
        console.error("Error adding bookmark:", error);
    }
}

//! تابع برای حذف بوکمارک از دیتابیس
let removeBookMarkItem = async (id) => {   
    try {
        await fetch(`http://localhost:4000/bookmarks/${id}`, {method: 'DELETE',})                     //* ارسال درخواست حذف به سرور
    } catch (error) {
        console.error("Error deleting bookmark:", error);
    } 
}

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

//! تابع برای تنظیم رویداد کلیک روی دکمه‌های بوکمارک
let clickAddBookMark = () => {
    document.querySelectorAll('.icon-bookmark').forEach(icon => {                                           //* 🛒 ست کردن رویداد کلیک روی دکمه بوکمارک شدن محصول 
        icon.addEventListener('click', debounce(toggleBookmark, 300));
    });
}

export {toggleBookmark , clickAddBookMark}
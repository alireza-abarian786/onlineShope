//!---------------------------------------------------------------------- imports -------------------------------------------------------
// import { extractProductTitle , fetchProductFromDatabase } from "./box.js";
import { showModal , updateBookmarkUI} from "./ui.js";
import { showAlertLogin , fetchDataFromApi  , hideLoader} from "../utils.js";
//!---------------------------------------------------------------------- imports -------------------------------------------------------

//todo================================================= 🔖 toggle تابع عمل کردن بوکمارک ها به صورت
async function toggleBookmark(event) {
    if (! await showAlertLogin()) return false;                                                          //* بررسی لاگین کاربر

    // showLoader()
    let card = event.target.closest('.swiper-slide')                                                   //* دریافت کارت محصول
    let title = await extractProductTitle(event.target)                                               //* دریافت عنوان محصول
    const [marks, markIndex] = await isBookMarkToDB(event);                                          //* دریافت لیست کل بوکمارک ها && دریافت محصول بوکمارک شده   

    if (markIndex === -1) {                                                                                               //* اگر محصول در بوکمارک‌ها وجود نداشت        
        await addBookMarks(await createBookmarkProductObject(event))                                                     //* اضافه کردن به لیست بوکمارک‌ها
        updateBookmarkUI(card, true)                                                                                   //* تغییر استایل بوکمارک
        hideLoader()
        showModal(`✅ ${title} به لیست علاقه مندی های شما اضافه شد`)                                                  //* نمایش پیام موفقیت

    } else {                                                                                                          //* اگر محصول قبلاً در بوکمارک‌ها باشد
        await removeBookMarkItem(marks[markIndex]._id)                                                                //* حذف از لیست بوکمارک‌ها
        updateBookmarkUI(card, false)                                                                              //* تغییر استایل بوکمارک
        hideLoader()
        showModal(`❌ ${title} از لیست علاقه مندی های شما حذف  شد`)                                               //* نمایش پیام حذف
    }
}

//todo================================================= ذخیره اطلاعات محصول بوکمارک شده
let createBookmarkProductObject = async (event) => {
    let product = await fetchProductFromDatabase(event)                                                            //* دریافت اطلاعات محصول از سرور
    return {                                                                                                     //* برگرداندن اطلاعات محصول بوکمارک شده
        product_name: product.name,
        product_id: product.id,
    };

}
//todo================================================= تابع برای اضافه کردن بوکمارک به دیتابیس
let addBookMarks = async (item) => {    
    if (!item || !item.product_id) {                                                             //* اطمینان از صحیح بودن بوکمارک
        console.error("Invalid item data:", item);
        return;
    }
    
    try {                                                                                                        //* ذخیره بوکمارک در دیتابیس
        await fetch('https://onlineshope.onrender.com/api/bookmarks', { 
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        
    } catch (error) {
        console.error("Error adding bookmark:", error);                                                         //* در صورت بروز مشکل، چاپ پیام خطا
    }
}

//todo================================================= تابع برای دریافت اطلاعات محصول از روی رویداد
let getIDProduct = async (event) => {
    let title = await extractProductTitle(event.target)                                                         //* دریافت عنوان محصول
    let Products = await fetchDataFromApi('https://onlineshope.onrender.com/api/products');                                   //* دریافت اطلاعات کل محصولات
    let getProductTarget = await Products.find(product => product.name === title)                             //* پیدا کردن محصول بر اساس عنوان
    return getProductTarget;                                                                                 //* ارسال محصول مورد نظر
}

//todo================================================= تابع برای بررسی وضعیت بوکمارک بودن یا نبودن محصول در دیتابیس
let isBookMarkToDB = async (event) => {
    try {
        let idProduct = await getIDProduct(event)                                                               //* دریافت اطلاعات محصول مورد نظر
        let Marks = await fetchDataFromApi('https://onlineshope.onrender.com/api/bookmarks');                                 //* دریافت اطلاعات تمام بوکمارک‌ها
        let reviewStatusMakeProduct = Marks.findIndex(mark => mark.product_id == idProduct.id)                //* بررسی اینکه آیا محصول در بوکمارک‌ها وجود دارد
        return [Marks, reviewStatusMakeProduct]                                                              //* ارسال داده‌ها برای استفاده در بخش‌های دیگر

    } catch (error) {
        console.error("Error fetching data:", error);                                                       //* در صورت بروز مشکل، چاپ پیام خطا
    }
};


//todo================================================= تابع برای حذف بوکمارک از دیتابیس
let removeBookMarkItem = async (id) => {   
    try {
        await fetch(`https://onlineshope.onrender.com/api/bookmarks/${id}`, {method: 'DELETE',})                             //* ارسال درخواست حذف به سرور
    } catch (error) {
        console.error("Error deleting bookmark:", error);                                                    //* در صورت بروز مشکل، چاپ پیام خطا
    } 
}

//todo================================================= تابع برای تنظیم رویداد کلیک روی دکمه‌های بوکمارک
let clickAddBookMark = () => {        
    document.querySelectorAll('.icon-bookmark').forEach(icon => {
        icon.addEventListener('click', toggleBookmark);                                                      //* رویداد کلیک روی ایکون بوکمارک محصول
    });
}

//!---------------------------------------------------------------------- exports -------------------------------------------------------
export {toggleBookmark , clickAddBookMark}
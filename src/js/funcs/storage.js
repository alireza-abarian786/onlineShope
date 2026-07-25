// src/js/funcs/storage.js

// تابع ساخت مقدار در لوکال استوریج
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// تابع گرفتن مقادیر از لوکال استوریج
function getLocalStorage(key) {
    let data = localStorage.getItem(key);    
    return data ? JSON.parse(data) : null;
}

// تابع حذف مقدار از لوکال استوریج
function removeItemFromStorage(key, id) {
    let data = getLocalStorage(key);
    if (Array.isArray(data)) {
        let updatedData = data.filter(item => item.id !== id);
        setLocalStorage(key, updatedData);
    }
}

// ✅ اضافه کردن getToken برای سازگاری با فایل‌های قدیمی
function getToken() {
    // در حالت آفلاین، توکن معتبر نیست
    return null;
}

export { setLocalStorage, getLocalStorage, removeItemFromStorage, getToken };
// تابع ساخت مقدار در لوکال استوریج
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// تابع گرفتن مقادیر از لوکال استوریج
function getLocalStorage(key) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// تابع حذف مقادیر از لوکال استوریج
function removeItemFromStorage(key, id) {
    let data = getLocalStorage(key);
    let updatedData = data.filter(item => item.id !== id);
    setLocalStorage(key, updatedData);
}

export { setLocalStorage, getLocalStorage, removeItemFromStorage, }
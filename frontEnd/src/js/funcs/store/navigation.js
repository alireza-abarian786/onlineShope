// ⬅️➡️ تابع تنظیمات مریوط به دکمه های جابجایی بین تصاویر باکس محصول
function initializeNavigation() {
    
    
    //➡️ دکمه حرکت سمت راست
    document.querySelectorAll('.next').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.style.color = '#2563eb';
            btn.parentElement.previousElementSibling.children[0].style.color = '#75757533';
        });
    });

    //⬅️ دکمه حرکت سمت چپ
    document.querySelectorAll('.pretive').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.nextElementSibling.children[0].style.color = '#75757533';
            btn.style.color = '#2563eb';
        });
    });
}

export {initializeNavigation}
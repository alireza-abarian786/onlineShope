// ⬅️➡️ تابع تنظیمات مریوط به دکمه های جابجایی بین تصاویر باکس محصول
function initializeNavigation() {
    
    
    //➡️ دکمه حرکت سمت راست
    document.querySelectorAll('.glide__arrow--right').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.children[0].style.color = '#2563eb';
            btn.previousElementSibling.children[0].style.color = '#75757533';
        });
    });

    //⬅️ دکمه حرکت سمت چپ
    document.querySelectorAll('.glide__arrow--left').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.children[0].style.color = '#2563eb';
            btn.nextElementSibling.children[0].style.color = '#75757533';
        });
    });
}

export {initializeNavigation}
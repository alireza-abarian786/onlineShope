import { attachCartEventListeners } from "./cart.js";

//🛒 تابع نمایش یا عدم نمایش نوتیف سبد خرید
export function updateCartNotification(cartItems) {
    const notifCart = document.querySelector('.notif-cart');
    notifCart.classList.toggle('is-notif', cartItems.length > 0);
}

//🛒 تابع ساخت باکس محصول در سبد خرید
export function renderCartItems(cartItems) {
    const container = document.querySelector('.cantain-box-goods');
    container.innerHTML = ''; // پاک کردن آیتم‌های قبلی

    //🛒 ساخت باکس محصول و افزودن به سبد خرید
    cartItems.forEach((item) => {
        const cartHTML = `
            <div class="box-goods d-flex align-items-end" data-id="${item.id}">
                <div>
                    <span class="plus-btn">+</span>
                    <span class="number">1</span>
                    <span class="minus-btn">-</span>
                </div>
                <div class='d-flex align-items-start flex-column'>
                    <div class='d-flex mb-2 w-75 align-self-end'>
                        <p class='text-white fw-light p-1 rounded m-0 w-50 h-100 ms-1'>${item.description}</p>
                        <img src="${item.image}" alt="img" class='w-50 h-100 rounded '>
                    </div>
                    <h6 class='w-100 text-start bg-white p-2 rounded text-center'>${item.title}</h6>
                </div>
                <button type="button" class="btn-close bg-danger remove-btn"></button>
            </div>
        `;
        container.insertAdjacentHTML('afterbegin', cartHTML);
    });

    //🛒  فراخوانی تابع فعال کردن دکمه های سبد خرید 
    attachCartEventListeners();
}


let showModal = (text) => {    
    //💭 ساخت و نمایش پیغام وجود محصول در سبد خرید
    let toastContainer = document.querySelector(".toast-container"); // `toast-container` اطمینان از وجود المان 
    if (!toastContainer) {        
        document.body.insertAdjacentHTML("beforeend", `
            <div class="toast-container position-fixed top-0 end-0 p-3">
                <div id="liveToast" class="toast text-bg-primary w-auto" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong>باخرز استور</strong>
                    <small class="me-auto">اکنون</small>
                    <button type="button" class="btn-close mx-1" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${text}</div>
                </div>
            </div>
        `);
    }

    // و نمایش آن `Toast` مقداردهی به
    let toastLive = document.getElementById("liveToast");
    if (toastLive) {
        let toastBootstrap = new bootstrap.Toast(toastLive);
        toastBootstrap.show();
    }

    document.querySelector(".toast-body").innerHTML = text
}

export {showModal}
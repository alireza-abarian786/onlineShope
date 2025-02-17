import { attachCartEventListeners } from "./cart.js";
import { initTooltips } from "../utils.js";

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
                    <span class="number">${item.quantity ? item.quantity : 1}</span>
                    <span class="minus-btn">-</span>
                </div>
                <div class=''>
                    <div class='box-info-product h-100 d-flex flex-column align-items-center'>
                    
                        <div class='row w-100 h-100'>
                            <div class='col'>
                                <div class='row'>
                                    <div class='col-1 p-0'>
                                        <button type="button" class="btn btn-warning mb-1 rounded remove-btn"><i class='fa fa-close'></i> </button>
                                    </div>
                                    <div class='col-11 pe-1'>
                                        <h6 class='bg-white rounded text-center'>${item.title}</h6>
                                    </div>
                                </div>
                                <div class='row'>
                                    <p class='text-white fw-light px-2 m-0 rounded'>${item.description}</p>
                                </div>
                            </div>
                            <div class='col-4 p-0'>
                                <img src="${item.image}" alt="img" class='rounded w-100 h-100'>
                            </div>
                        </div>
                    </div>
                    <div class='w-100 text-start text-white px-2 pt-3 pb-1 rounded d-flex justify-content-between'>
                        <span class='d-flex'>
                            تومان
                            <span class='price ms-1'>${item.discount === 0 ? item.totalPrice ? item.totalPrice.toLocaleString() : item.price.toLocaleString() : item.totalPrice ? item.totalPrice.toLocaleString() : item.discount.toLocaleString()}</span>
                        </span>
                        <span>:قیمت محصول</span>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('afterbegin', cartHTML);
    });

    //🛒  فراخوانی تابع فعال کردن دکمه های سبد خرید 
    attachCartEventListeners();

    // فعال‌سازی تمام تولتیپ‌ها
    initTooltips()
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
                    <small class="ms-auto">اکنون</small>
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
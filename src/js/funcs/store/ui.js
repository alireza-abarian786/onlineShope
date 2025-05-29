//!---------------------------------------------------------------------- functions -------------------------------------------------------
//todo========================================================== modal تابع ساخت و نمایش
let showModal = (text) => {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    //?💭 اگر المان نبود، بساز و نمایش پیغام وجود محصول در سبد خرید
    document.body.insertAdjacentHTML(
      "beforeend",
      `
            <div class="toast-container position-fixed top-0 end-0 p-3">
                <div id="liveToast" class="toast text-bg-primary w-auto" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong>دیجی استور</strong>
                    <small class="ms-auto">اکنون</small>
                    <button type="button" class="btn-close mx-1" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${text}</div>
                </div>
            </div>
        `
    );
  }

  let toastLive = document.getElementById("liveToast"); //? و نمایش آن `Toast` مقداردهی به
  if (toastLive) {
    let toastBootstrap = new bootstrap.Toast(toastLive);
    toastBootstrap.show();
  }

  document.querySelector(".toast-body").innerHTML = text;
};

//todo========================================================== ساخت باکس مقالات صفحه اصلی
let createBlogs = async (element) => {
  let res = await fetch("https://onlineshope.onrender.com/api/blogs");
  let result = await res.json();

  result.forEach((blog) => {
    element.insertAdjacentHTML(
      "beforeend",
      `
              <div class="swiper-slide">
                <div class="pt-3">
                  <img src="${blog.image}" alt="image" />
                </div>
    
                <div>
                  <h6>${blog.title}</h6>
                  <p>${blog.content}</p>
                  <a href="./blog.html">مطالعه مقاله
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                      <path fill="currentColor" d="M529.408 149.376a29.12 29.12 0 0 1 41.728 0a30.59 30.59 0 0 1 0 42.688L259.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L197.76 534.272a32 32 0 0 1 0-44.672zm256 0a29.12 29.12 0 0 1 41.728 0a30.59 30.59 0 0 1 0 42.688L515.264 511.936l311.872 319.936a30.59 30.59 0 0 1-.512 43.264a29.12 29.12 0 0 1-41.216-.512L453.76 534.272a32 32 0 0 1 0-44.672z"/>
                    </svg>
                  </a>
                </div>
              </div>
        `
    );
  });
};

//!---------------------------------------------------------------------- exports -------------------------------------------------------

export {
  showModal,
  createBlogs,
};

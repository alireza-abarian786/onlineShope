// ست شده روی عکس های باکس محصول Glide تابع تنظیمات اسلایدر 
function settingSliderGlide() {    
  // گرفتن تمام باکس‌های اسلایدر و مشخص کردن ویژگی های آن
  document.querySelectorAll('.glide').forEach((slider, index) => {
    new Glide(slider, {
        type: 'slider',
        perView: 1,
        autoplay: 7000,
        animationDuration: 800,
    }).mount();
  });
}

// ست شده روی دسته بندی های صفحه اصلی Swiper تابع تنظیمات اسلایدر 
function settingSliderSwiper() {
  let swiper1 = new Swiper(".mySwiper1", {
    // modules: [Autoplay, Pagination], // 🔹 اضافه کردن ماژول‌ها
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      640: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1440: { slidesPerView: 5 },
    },
  });

  let swiper2 = new Swiper(".mySwiper2", {
    // modules: [Autoplay, Pagination],
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1, direction: "vertical", spaceBetween: 50 },
      600: { spaceBetween: 10 },
      768: { slidesPerView: 2, spaceBetween: 50 },
      992: { spaceBetween: 10 },
      1200: { slidesPerView: 2, spaceBetween: 50 },
      1440: { slidesPerView: 3, spaceBetween: 51 },
    },
  });

  let swiper3 = new Swiper(".mySwiper3", {
    // modules: [Autoplay, Pagination],
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1, direction: "vertical", spaceBetween: 50 },
      600: { spaceBetween: 10 },
      720: { slidesPerView: 2, spaceBetween: 50 },
      930: { slidesPerView: 3, spaceBetween: 10 },
      1024: { slidesPerView: 3, spaceBetween: 50 },
      1330: { slidesPerView: 4, spaceBetween: 10 },
      1455: { slidesPerView: 4, spaceBetween: 74 },
    },
  });

  let swiper4 = new Swiper(".mySwiper4", {
    // modules: [Autoplay, Pagination],
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1, direction: "vertical", spaceBetween: 50 },
      600: { spaceBetween: 10 },
      720: { slidesPerView: 2, spaceBetween: 50 },
      930: { slidesPerView: 3, spaceBetween: 10 },
      1024: { slidesPerView: 3, spaceBetween: 50 },
      1330: { slidesPerView: 4, spaceBetween: 10 },
      1455: { slidesPerView: 3, spaceBetween: 10 },
    },
  });

  let swiper5 = new Swiper('.mySwiper5', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
    // loop: true,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false
    }
  });

  // تابع توقف و شروع autoplay هنگام حرکت موس روی اسلایدر
  function mouseMoveOnSliders(elem, variable) {
    let slider = document.querySelector(elem);
    if (!slider) return;

    slider.addEventListener("mouseenter", () => {
      if (variable.autoplay && typeof variable.autoplay.stop === "function") {
        variable.autoplay.stop();
      }
    });

    slider.addEventListener("mouseleave", () => {
      if (variable.autoplay && typeof variable.autoplay.start === "function") {
        variable.autoplay.start();
      }
    });
  }

  // تابع توقف و شروع autoplay هنگام حرکت موس روی باکس های محصول
  function mouseMoveOnSlidersBoxs(elem, variables) {
    document.querySelectorAll(elem).forEach((box) => {
      box.addEventListener("mouseenter", () => {
        variables.forEach((variable) => {
          if (variable.autoplay && typeof variable.autoplay.stop === "function") {
            variable.autoplay.stop();
          }
        });
      });

      box.addEventListener("mouseleave", () => {
        variables.forEach((variable) => {
          if (variable.autoplay && typeof variable.autoplay.start === "function") {
            variable.autoplay.start();
          }
        });
      });
    });
  }

  // فراخوانی تنظیمات موس برای دسته بندی ها و باکس‌های محصول
  mouseMoveOnSliders(".mySwiper1", swiper1);
  mouseMoveOnSliders(".mySwiper2", swiper2);
  mouseMoveOnSliders(".mySwiper4", swiper4);
  mouseMoveOnSlidersBoxs(".mySwiper3", swiper3);
  mouseMoveOnSlidersBoxs(".mySwiper5", swiper5);
}

// خروجی توابع
export {settingSliderSwiper , settingSliderGlide}

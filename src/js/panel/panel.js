import { hideLoader, showLoader } from "../funcs/utils.js";

const logoutBtn = document.querySelector(".logout-btn");

logoutBtn.addEventListener("click", () => {
  console.log(1111);
  Swal.fire({
    title: "خروج از حساب",
    text: "آیا قصد شما خروج از این حساب میباشد؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله",
    cancelButtonText: "خیر",
  }).then(async (result) => {
    if (result.isConfirmed) {
      showLoader();
      const logOut = await fetch(
        "https://onlineshope.onrender.com/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        }
      );

      if (logOut.ok) {
        const logOutData = await logOut.json();
        hideLoader();
        Swal.fire({
          title: "عملیات موفق",
          text: `${logOutData.message}`,
          icon: "success",
          button: "ok",
        }).then(() => {
            localStorage.clear();
            window.location.href = "./login.html";
        });
      } else {
        hideLoader();
        Swal.fire({
          title: "خطا",
          text: "خروج از حساب با مشکل مواجه شد.",
          icon: "error",
          button: "ok",
        });
      }
    }
  });
});

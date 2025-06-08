import { isLogin } from "../funcs/header/loginBtn.js";
import { hideLoader, pagesInLoginState, showLoader } from "../funcs/utils.js";

const logoutBtn = document.querySelector(".logout-btn");

window.addEventListener("load", async () => {
  const Response = await fetch("https://onlineshope.onrender.com/api/user/me", {
    credentials: "include",
  });
  const data = await Response.json();
//   console.log("User data:", data);

  if (Response.ok) {
    console.error("fetching user data:", data.message);
  } else {
    console.error("Error fetching user data:", data.message);
  }
  isLogin();
  pagesInLoginState();
  hideLoader();
});

logoutBtn.addEventListener("click", () => {
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
          credentials: "include",
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

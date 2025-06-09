import { getCartData } from "../funcs/fetchData/fetchCart.js";
import { getProducts } from "../funcs/fetchData/fetchProducts.js";
import { showModal } from "../funcs/ui.js";
import { hideLoader, showLoader } from "../funcs/utils.js";

const logoutBtn = document.querySelector(".logout-btn");

window.addEventListener("load", async () => {
  showLoader()
  const response = await fetch("https://onlineshope.onrender.com/api/user/me", {
    credentials: "include",
  });

  if (response.status === 401) {
    window.location.href = '/login.html';
    return;
  }

  const userData = await response.json();
  const productData = await getProducts();
  const cartData = await getCartData()
  const productsFavorites = productData.filter(product => {    
    return userData.favorites.find(item => item == product._id)
  })

  //todo===================================================================== خروج از حساب کاربری
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

  //todo===================================================================== رندر پروفایل
  async function renderProfile() {
    try {
      document.getElementById('welcomeMessage').textContent = `${userData.name} عزیز، به پنل کاربری‌تان خوش آمدید 🎉`;
      document.getElementById('name').value = userData.name;
      document.getElementById('email').value = userData.email;
      document.getElementById('phone').value = userData.phone;
    } catch (error) {
      showModal('خطا در لود پروفایل!');
    }
  }

  //todo=================================================================== ویرایش پروفایل
  let isEditing = false;
  document.getElementById('editProfile').addEventListener('click', () => {
    isEditing = !isEditing;
    document.getElementById('name').disabled = !isEditing;
    document.getElementById('email').disabled = !isEditing;
    document.getElementById('phone').disabled = !isEditing;
    document.getElementById('editProfile').classList.toggle('hidden', isEditing);
    document.getElementById('saveProfile').classList.toggle('hidden', !isEditing);
  });

  //todo====================================================================== ذخیره پروفایل
  document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const updates = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
    };
    try {
      // const response = await fetch(`me`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates),
      //   credentials: 'include',
      // });
      // const updatedUser = await response.json();
      // showModal('پروفایل با موفقیت به‌روزرسانی شد!');
      // isEditing = false;
      // document.getElementById('name').disabled = true;
      // document.getElementById('email').disabled = true;
      // document.getElementById('phone').disabled = true;
      // document.getElementById('editProfile').classList.remove('hidden');
      // document.getElementById('saveProfile').classList.add('hidden');
      // document.getElementById('welcomeMessage').textContent = `${updatedUser.name} عزیز، به پنل کاربری‌تان خوش آمدید 🎉`;
    } catch (error) {
      showModal('خطا در به‌روزرسانی پروفایل!');
    }
  });

  //todo================================================================= رندر آمار حساب
  function renderUserStats() {
    document.getElementById("totalOrders").textContent = 0
    document.getElementById("totalSpent").textContent = cartData.products.length
    document.getElementById("totalFavorites").textContent = userData.favorites.length;
  }
  
  //todo================================================================= رندر وظایف در انتظار
  function renderPendingTasks(data) {
    const taskList = document.getElementById("pendingTasks");

  }
  
  //todo================================================================= رندر محصولات پیشنهادی
  function renderRecommendedProducts(data) {
    const productList = document.getElementById("recommendedProducts");

  }
  
  //todo================================================================= رندر فعالیت‌های اخیر
  function renderRecentActivities(data) {
    const activityList = document.getElementById("recentActivities");

  }
  
  //todo================================================================= رندر جدول خریدها
  function renderPurchases(data) {
    const purchaseBody = document.getElementById("purchaseBody");

  }
  
  //todo================================================================= رندر جدول علاقه‌مندی‌ها
  function renderFavorites(data) {
    const favoriteBody = document.getElementById("favoriteBody");
    favoriteBody.innerHTML = "";
    data.slice(-5).forEach((item) => {      
      const row = document.createElement("tr");
      row.innerHTML = `
            <td class="p-2">${item.name}</td>
            <td class="p-2">${item.price.toLocaleString()}</td>
            <td class="p-2">${item.description}</td>
          `;
      favoriteBody.appendChild(row);
    });
  }
  
  //todo================================================================= شبیه‌سازی لود داده‌ها
  function loadData() {
    const purchaseLoader = document.getElementById("purchaseLoader");
    const favoriteLoader = document.getElementById("favoriteLoader");
    purchaseLoader.style.display = "block";
    favoriteLoader.style.display = "block";
  
    setTimeout(() => {
      renderProfile()
      renderUserStats();
      renderPendingTasks(pendingTasks);
      renderRecommendedProducts(recommendedProducts);
      renderRecentActivities(recentActivities);
      renderFavorites(productsFavorites);
      purchaseLoader.style.display = "none";
      favoriteLoader.style.display = "none";
    }, 1000);
  }
  
  //todo================================================================= جستجوی خریدها
  document.getElementById("purchaseSearch").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();

  });
  
  //todo================================================================= جستجوی علاقه‌مندی‌ها
  document.getElementById("favoriteSearch").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();

  });
  
  //todo================================================================= تغییر تم
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });
  
  //todo================================================================= لود تم ذخیره‌شده
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  
  //todo================================================================= افزایش موجودی
  document.getElementById("addBalance").addEventListener("click", () => {
    const currentBalance = parseInt(document.getElementById("accountBalance").textContent);

  });

  loadData();
});

















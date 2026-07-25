// src/js/panel/panel.js

import { getLocalStorage, setLocalStorage } from "../funcs/storage.js";
import { showModal } from "../funcs/ui.js";
import { showLoader, hideLoader } from "../funcs/utils.js";
import fakeProducts from "../../data/ProductData.js";

//!----------------------------------------------------------------------------------------- Variables
const logoutBtn = document.querySelector(".logout-btn");
const themeToggle = document.querySelector("#themeToggle");

//!----------------------------------------------------------------------------------------- Initialize on page load
window.addEventListener("load", async () => {
  showLoader();
  
  // ✅ چک کردن لاگین از localStorage
  const userId = getLocalStorage("userId");
  const userData = getLocalStorage("userData");
  
  if (!userId || !userData) {
    window.location.href = "./login.html";
    return;
  }
  
  await loadData();
  
  // todo================================================================= Theme initialization
  if (getLocalStorage("theme") === "dark") {
    document.body.classList.add("dark-mode");
    changeIconTheme();
  }

  hideLoader();
});

// todo================================================================= Event Listeners
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        Swal.fire({
            title: "خروج از حساب",
            text: "آیا قصد شما خروج از این حساب می‌باشد؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "خیر",
        }).then(async (result) => {
            if (result.isConfirmed) {
                showLoader();
                // ✅ پاک کردن localStorage
                localStorage.removeItem("login");
                localStorage.removeItem("userId");
                localStorage.removeItem("isAuthorized");
                localStorage.removeItem("userData");
                localStorage.removeItem("favoritesData");
                
                hideLoader();
                showModal("✅ خروج با موفقیت انجام شد");
                window.location.href = "./login.html";
            }
        });
    });
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        setLocalStorage("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        changeIconTheme();
    });
}

// todo================================================================= Profile Editing
let isEditing = false;
const editProfileBtn = document.getElementById("editProfile");
if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
        isEditing = !isEditing;
        document.getElementById("name").disabled = !isEditing;
        document.getElementById("email").disabled = !isEditing;
        document.getElementById("phone").disabled = !isEditing;
        document.getElementById("editProfile").classList.toggle("hidden", isEditing);
        document.getElementById("saveProfile").classList.toggle("hidden", !isEditing);
    });
}

const profileForm = document.getElementById("profileForm");
if (profileForm) {
    profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const updates = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
        };
        
        try {
            showLoader();
            
            // ✅ بروزرسانی در localStorage
            const userData = getLocalStorage("userData");
            const users = JSON.parse(localStorage.getItem('usersData')) || [];
            const userIndex = users.findIndex(u => u._id === userData._id);
            
            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...updates };
                localStorage.setItem('usersData', JSON.stringify(users));
                setLocalStorage("userData", users[userIndex]);
                setLocalStorage("login", updates.name);
            }
            
            hideLoader();
            showModal("✅ پروفایل با موفقیت به‌روزرسانی شد!");
            
            isEditing = false;
            document.getElementById("name").disabled = true;
            document.getElementById("email").disabled = true;
            document.getElementById("phone").disabled = true;
            document.getElementById("editProfile").classList.remove("hidden");
            document.getElementById("saveProfile").classList.add("hidden");
            document.getElementById("welcomeMessage").textContent = `${updates.name} عزیز، به پنل کاربری‌تان خوش آمدید 🎉`;
            
        } catch (error) {
            hideLoader();
            showModal("❌ خطا در به‌روزرسانی پروفایل!");
            console.error("Error updating profile:", error);
        }
    });
}

// todo================================================================= Search Purchase
const purchaseSearch = document.getElementById("purchaseSearch");
if (purchaseSearch) {
    purchaseSearch.addEventListener("input", async (e) => {
        const purchaseLoader = document.getElementById("purchaseLoader");
        if (purchaseLoader) purchaseLoader.style.display = "block";

        const query = e.target.value.toLowerCase();
        const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: [] };
        const purchaseBody = document.getElementById("purchaseBody");
        purchaseBody.innerHTML = "";
        
        const filteredPurchases = cartData.products.filter((purchase) => 
            purchase.product.name.toLowerCase().includes(query)
        );
        
        if (filteredPurchases.length === 0) {
            purchaseBody.innerHTML = '<tr><td colspan="3" class="p-2 text-gray-500 text-center">هیچ خریدی یافت نشد.</td></tr>';
            if (purchaseLoader) purchaseLoader.style.display = "none";
            return;
        }
        
        filteredPurchases.forEach((purchase) => {
            purchaseBody.insertAdjacentHTML(
                "beforeend",
                `<tr class="hover:bg-gray-50">
                    <td class="p-2">${purchase.product.name}</td>
                    <td class="p-2">${purchase.product.price.toLocaleString()} تومان</td>
                    <td class="p-2">${purchase.product.description || ''}</td>
                </tr>`
            );
        });

        if (purchaseLoader) purchaseLoader.style.display = "none";
    });
}

// todo================================================================= Search Favorite
const favoriteSearch = document.getElementById("favoriteSearch");
if (favoriteSearch) {
    favoriteSearch.addEventListener("input", async (e) => {
        const favoriteLoader = document.getElementById("favoriteLoader");
        if (favoriteLoader) favoriteLoader.style.display = "block";

        const query = e.target.value.toLowerCase();
        const favoritesData = JSON.parse(localStorage.getItem('favoritesData')) || { items: [] };
        const favoriteProducts = favoritesData.items.filter(item => 
            item.name.toLowerCase().includes(query)
        ).slice(-5);
        
        const favoriteBody = document.getElementById("favoriteBody");
        favoriteBody.innerHTML = "";
        
        if (favoriteProducts.length === 0) {
            favoriteBody.innerHTML = '<tr><td colspan="3" class="p-2 text-gray-500 text-center">هیچ علاقه‌مندی یافت نشد.</td></tr>';
            if (favoriteLoader) favoriteLoader.style.display = "none";
            return;
        }

        favoriteProducts.forEach((item) => {
            favoriteBody.insertAdjacentHTML(
                "beforeend",
                `<tr class="hover:bg-gray-50">
                    <td class="p-2">${item.name}</td>
                    <td class="p-2">${item.price.toLocaleString()} تومان</td>
                    <td class="p-2">${item.description || ''}</td>
                </tr>`
            );
        });

        if (favoriteLoader) favoriteLoader.style.display = "none";
    });
}

// todo================================================================= Render Profile
async function renderProfile() {
    const welcomeMessage = document.getElementById("welcomeMessage");
    if (!welcomeMessage) return;
    
    try {
        const userData = getLocalStorage("userData");
        if (!userData) throw new Error("User data not found");
        
        welcomeMessage.textContent = `${userData.name} عزیز، به پنل کاربری‌تان خوش آمدید 🎉`;
        document.getElementById("name").value = userData.name;
        document.getElementById("email").value = userData.email;
        document.getElementById("phone").value = userData.phone || '';
    } catch (error) {
        showModal("خطا در لود پروفایل!");
        console.error("Error rendering profile:", error);
    }
}

// todo================================================================= Render Pending Tasks
async function renderPendingTasks() {
    const taskList = document.getElementById("pendingTasks");
    if (!taskList) return;
    taskList.innerHTML = "";
    
    try {
        // ✅ دریافت تسک‌ها از localStorage
        const tasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
        
        if (tasks.length === 0) {
            taskList.innerHTML = '<li class="text-gray-500 p-2">هیچ وظیفه‌ای یافت نشد.</li>';
            return;
        }
        
        tasks.forEach((task) => {
            taskList.insertAdjacentHTML(
                "beforeend",
                `<li class="flex justify-between items-center p-2 bg-gray-100 rounded hover:bg-gray-300 transition">
                    <span>${task.task}</span>
                    <i class="bi bi-trash3-fill text-red-500 cursor-pointer" onclick="deletePendingTasks('${task._id}')"></i>
                </li>`
            );
        });
    } catch (error) {
        taskList.innerHTML = '<li class="text-red-500 p-2">خطا در بارگذاری وظایف!</li>';
        console.error("Error rendering tasks:", error);
    }
}

// todo================================================================= Render Recent Activities
async function renderRecentActivities() {
    const activityList = document.getElementById("recentActivities");
    if (!activityList) return;
    activityList.innerHTML = "";
    
    try {
        const activities = JSON.parse(localStorage.getItem('recentActivities')) || [];
        
        if (activities.length === 0) {
            activityList.innerHTML = '<li class="text-gray-500 p-2">هیچ فعالیتی یافت نشد.</li>';
            return;
        }
        
        activities.forEach((activity) => {
            activityList.insertAdjacentHTML(
                "beforeend",
                `<li class="flex justify-between items-center p-2 bg-gray-100 rounded hover:bg-gray-300 transition">
                    <span>${activity.activity}</span>
                    <i class="bi bi-trash3-fill text-red-500 cursor-pointer" onclick="deleteRecentActivity('${activity._id}')"></i>
                </li>`
            );
        });
    } catch (error) {
        activityList.innerHTML = '<li class="text-red-500 p-2">خطا در بارگذاری فعالیت‌ها!</li>';
        console.error("Error rendering activities:", error);
    }
}

// todo================================================================= render Purchases
async function renderPurchases() {
    const purchaseBody = document.getElementById("purchaseBody");
    if (!purchaseBody) return;
    purchaseBody.innerHTML = "";
    
    try {
        const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: [] };
        
        if (cartData.products.length === 0) {
            purchaseBody.innerHTML = '<tr><td colspan="3" class="p-2 text-gray-500 text-center">هیچ خریدی یافت نشد.</td></tr>';
            return;
        }

        cartData.products.forEach((purchase) => {
            purchaseBody.insertAdjacentHTML(
                "beforeend",
                `<tr class="hover:bg-gray-50">
                    <td class="p-2">${purchase.product.name}</td>
                    <td class="p-2">${purchase.product.price.toLocaleString()} تومان</td>
                    <td class="p-2">${purchase.product.description || ''}</td>
                </tr>`
            );
        });
    } catch (error) {
        purchaseBody.innerHTML = '<tr><td colspan="3" class="p-2 text-red-500 text-center">خطا در بارگذاری خریدها!</td></tr>';
        console.error("Error rendering purchases:", error);
    }
}

// todo================================================================= render Favorites
async function renderFavorites() {
    const favoriteBody = document.getElementById("favoriteBody");
    if (!favoriteBody) return;
    favoriteBody.innerHTML = "";
    
    try {
        const favoritesData = JSON.parse(localStorage.getItem('favoritesData')) || { items: [] };
        const favoriteProducts = favoritesData.items.slice(-5);
        
        if (favoriteProducts.length === 0) {
            favoriteBody.innerHTML = '<tr><td colspan="3" class="p-2 text-gray-500 text-center">هیچ علاقه‌مندی یافت نشد.</td></tr>';
            return;
        }
        
        favoriteProducts.forEach((item) => {
            favoriteBody.insertAdjacentHTML(
                "beforeend",
                `<tr class="hover:bg-gray-50">
                    <td class="p-2">${item.name}</td>
                    <td class="p-2">${item.price.toLocaleString()} تومان</td>
                    <td class="p-2">${item.description || ''}</td>
                </tr>`
            );
        });
    } catch (error) {
        favoriteBody.innerHTML = '<tr><td colspan="3" class="p-2 text-red-500 text-center">خطا در بارگذاری علاقه‌مندی‌ها!</td></tr>';
        console.error("Error rendering favorites:", error);
    }
}

// todo================================================================= render Recommended Products
async function renderRecommendedProducts() {
    const productList = document.getElementById("recommendedProducts");
    const noProductsMessage = document.getElementById("noProductsMessage");
    if (!productList || !noProductsMessage) return;
    productList.innerHTML = "";
    noProductsMessage.classList.add("hidden");
    
    try {
        // ✅ دریافت محصولات پیشنهادی از دیتای فیک
        const products = fakeProducts
            .filter(p => p.discount > 0)
            .slice(0, 4);
        
        if (products.length === 0) {
            noProductsMessage.classList.remove("hidden");
            return;
        }
        
        products.forEach((product) => {
            productList.insertAdjacentHTML(
                "beforeend",
                `<div class="bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                    ${product.images ? 
                        `<img src="${product.images[0]}" alt="${product.name}" class="w-full h-48 object-cover" loading="lazy" />` : 
                        `<div class="w-full h-48 bg-gray-100 flex items-center justify-center">
                            <span class="text-gray-400">بدون تصویر</span>
                        </div>`
                    }
                    <div class="p-4 text-center">
                        <h4 class="text-lg font-semibold text-gray-800 truncate">${product.name}</h4>
                        <p class="text-sm text-gray-700 mt-1 line-clamp-2">${product.description || ''}</p>
                        <div class="my-4 flex flex-column items-center justify-between">
                            <span class="text-lg font-bold text-gray-700">${product.price.toLocaleString()} تومان</span>
                            ${product.discount > 0 ? `<span class="text-sm text-red-500">تخفیف: ${product.discount}%</span>` : ""}
                        </div>
                        <a href="#" class="p-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block">
                            مشاهده محصول
                        </a>
                    </div>
                </div>`
            );
        });
    } catch (error) {
        noProductsMessage.classList.remove("hidden");
        noProductsMessage.textContent = "خطا در بارگذاری محصولات!";
        console.error("Error fetching recommended products:", error);
    }
}

// todo================================================================= show Balance UI
async function showBalanceUI() {
    const accountBalancePElem = document.getElementById("accountBalance");
    if (!accountBalancePElem) return;
    
    try {
        const userData = getLocalStorage("userData");
        const balance = userData?.balance || 0;
        accountBalancePElem.textContent = `${balance.toLocaleString()} تومان`;
    } catch (error) {
        accountBalancePElem.textContent = "خطا در بارگذاری موجودی!";
        console.error("Error rendering balance:", error);
    }
}

// todo================================================================= render User Stats
async function renderUserStats() {
    const totalOrders = document.getElementById("totalOrders");
    const totalSpent = document.getElementById("totalSpent");
    const totalFavorites = document.getElementById("totalFavorites");
    if (!totalOrders || !totalSpent || !totalFavorites) return;
    
    try {
        const cartData = JSON.parse(localStorage.getItem('cartData')) || { products: [] };
        const favoritesData = JSON.parse(localStorage.getItem('favoritesData')) || { items: [] };
        
        totalOrders.textContent = cartData.products.length;
        totalSpent.textContent = (cartData.totalWithDiscount || 0).toLocaleString() + " تومان";
        totalFavorites.textContent = favoritesData.items.length;
    } catch (error) {
        totalOrders.textContent = "خطا";
        totalSpent.textContent = "خطا";
        totalFavorites.textContent = "خطا";
        console.error("Error rendering user stats:", error);
    }
}

// todo================================================================= Theme Icon Change
function changeIconTheme() {
    const iconTheme = document.querySelector(".theme-icon");
    if (!iconTheme) return;
    if (getLocalStorage("theme") === "dark") {
        iconTheme.classList.replace("bi-moon-stars", "bi-sun-fill");
    } else {
        iconTheme.classList.replace("bi-sun-fill", "bi-moon-stars");
    }
}

// todo================================================================= Load data
async function loadData() {
    await Promise.all([
        renderProfile(),
        renderUserStats(),
        renderPendingTasks(),
        renderRecentActivities(),
        renderPurchases(),
        renderFavorites(),
        renderRecommendedProducts(),
        showBalanceUI(),
    ]);
}

// todo================================================================= Global delete functions
window.deletePendingTasks = async (id) => {
    showLoader();
    try {
        const tasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
        const updatedTasks = tasks.filter(t => t._id !== id);
        localStorage.setItem('pendingTasks', JSON.stringify(updatedTasks));
        await renderPendingTasks();
        hideLoader();
        showModal("✅ حذف با موفقیت انجام شد");
    } catch (error) {
        hideLoader();
        showModal("❌ خطا در حذف وظیفه");
        console.error("Error deleting task:", error);
    }
};

window.deleteRecentActivity = async (id) => {
    showLoader();
    try {
        const activities = JSON.parse(localStorage.getItem('recentActivities')) || [];
        const updatedActivities = activities.filter(a => a._id !== id);
        localStorage.setItem('recentActivities', JSON.stringify(updatedActivities));
        await renderRecentActivities();
        hideLoader();
        showModal("✅ حذف با موفقیت انجام شد");
    } catch (error) {
        hideLoader();
        showModal("❌ خطا در حذف فعالیت");
        console.error("Error deleting activity:", error);
    }
};
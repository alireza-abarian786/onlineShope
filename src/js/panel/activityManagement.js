// src/js/panel/activityManagement.js

import { getLocalStorage, setLocalStorage } from "../funcs/storage.js";
import { showModal } from "../funcs/ui.js";
import { showLoader, hideLoader } from "../funcs/utils.js";

// !--------------------------------------------------------------------------------------------- Variables
const addTaskBtn = document.querySelector("#addTask");
const taskInput = document.querySelector("#taskInput");
const addActivityBtn = document.querySelector("#addActivity");
const activityInput = document.querySelector("#activityInput");
const addBalanceBtn = document.querySelector("#addBalance");
const balanceInput = document.querySelector("#balanceInput");
const themeToggle = document.querySelector("#themeToggle");

// !--------------------------------------------------------------------------------------------- Initialize on page load
window.addEventListener("load", async () => {
    showLoader();
    
    // ✅ چک کردن لاگین
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

// !----------------------------------------------------------------------------------------- Event Listeners
if (addTaskBtn) {
    addTaskBtn.addEventListener("click", async () => {
        const task = taskInput.value.trim();
        if (!task) return showModal("لطفاً وظیفه را وارد کنید!");
        
        try {
            showLoader();
            
            // ✅ ذخیره در localStorage
            const tasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
            const newTask = {
                _id: "task_" + Date.now(),
                task: task,
                completed: false,
                createdAt: new Date().toLocaleDateString('fa-IR'),
            };
            tasks.push(newTask);
            localStorage.setItem('pendingTasks', JSON.stringify(tasks));
            
            // ✅ اضافه کردن به فعالیت‌های اخیر
            addToRecentActivities(`وظیفه جدید اضافه شد: ${task}`);
            
            await renderPendingTasks();
            taskInput.value = "";
            hideLoader();
            showModal("✅ وظیفه جدید با موفقیت افزوده شد");
        } catch (error) {
            hideLoader();
            showModal("❌ خطا در افزودن وظیفه جدید");
            console.error("Error adding task:", error);
        }
    });
}

if (addActivityBtn) {
    addActivityBtn.addEventListener("click", async () => {
        const activity = activityInput.value.trim();
        if (!activity) return showModal("لطفاً فعالیت را وارد کنید!");
        
        try {
            showLoader();
            addToRecentActivities(activity);
            await renderRecentActivities();
            activityInput.value = "";
            hideLoader();
            showModal("✅ فعالیت جدید با موفقیت افزوده شد");
        } catch (error) {
            hideLoader();
            showModal("❌ خطا در افزودن فعالیت جدید");
            console.error("Error adding activity:", error);
        }
    });
}

if (addBalanceBtn) {
    addBalanceBtn.addEventListener("click", async () => {
        const amount = parseInt(balanceInput.value.trim());
        if (!amount || amount <= 0) return showModal("لطفاً مقدار معتبر وارد کنید!");
        
        try {
            showLoader();
            
            // ✅ بروزرسانی موجودی
            const userData = getLocalStorage("userData");
            const users = JSON.parse(localStorage.getItem('usersData')) || [];
            const userIndex = users.findIndex(u => u._id === userData._id);
            
            if (userIndex !== -1) {
                users[userIndex].balance = (users[userIndex].balance || 0) + amount;
                localStorage.setItem('usersData', JSON.stringify(users));
                setLocalStorage("userData", users[userIndex]);
                
                addToRecentActivities(`موجودی به ${(users[userIndex].balance || 0).toLocaleString()} تومان افزایش یافت`);
            }
            
            await showBalanceUI();
            balanceInput.value = "";
            hideLoader();
            showModal("✅ افزایش موجودی با موفقیت انجام شد");
        } catch (error) {
            hideLoader();
            showModal("❌ خطا در افزایش موجودی");
            console.error("Error updating balance:", error);
        }
    });
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        setLocalStorage("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        changeIconTheme();
    });
}

// !------------------------------------------------------------------------------------------- Helper Functions

// ✅ اضافه کردن به فعالیت‌های اخیر
function addToRecentActivities(activityText) {
    const activities = JSON.parse(localStorage.getItem('recentActivities')) || [];
    const newActivity = {
        _id: "act_" + Date.now(),
        activity: activityText,
        createdAt: 'همین الان',
    };
    activities.unshift(newActivity);
    // محدود کردن به 50 فعالیت آخر
    if (activities.length > 50) {
        activities.length = 50;
    }
    localStorage.setItem('recentActivities', JSON.stringify(activities));
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

// todo================================================================= Render Functions
async function renderPendingTasks() {
    const taskList = document.querySelector("#pendingTasks");
    if (!taskList) return;
    taskList.innerHTML = "";
    
    try {
        const tasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
        
        if (tasks.length === 0) {
            taskList.innerHTML = '<li class="text-gray-500">هیچ وظیفه‌ای یافت نشد.</li>';
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
        taskList.innerHTML = '<li class="text-red-500">خطا در بارگذاری وظایف!</li>';
        console.error("Error rendering tasks:", error);
    }
}

async function renderRecentActivities() {
    const activityList = document.querySelector("#recentActivities");
    if (!activityList) return;
    activityList.innerHTML = "";
    
    try {
        const activities = JSON.parse(localStorage.getItem('recentActivities')) || [];
        
        if (activities.length === 0) {
            activityList.innerHTML = '<li class="text-gray-500">هیچ فعالیتی یافت نشد.</li>';
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
        activityList.innerHTML = '<li class="text-red-500">خطا در بارگذاری فعالیت‌ها!</li>';
        console.error("Error rendering activities:", error);
    }
}

async function showBalanceUI() {
    const accountBalancePElem = document.querySelector("#accountBalance");
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

// todo================================================================= Load data
async function loadData() {
    await Promise.all([
        renderPendingTasks(),
        renderRecentActivities(),
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
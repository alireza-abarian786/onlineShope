import getDataMe from "../funcs/fetchData/fetchMe.js";
import { showModal } from "../funcs/ui.js";
import { showLoader, hideLoader } from "../funcs/utils.js";
import { fetchPendingTasks, addPendingTask, deletePendingTask } from "./api.js";
import { fetchRecentActivities, addRecentActivity, deleteRecentActivity } from "./api.js";
import { updateBalance, fetchBalance } from "./api.js";

// !--------------------------------------------------------------------------------------------- Variables
const addTaskBtn = document.querySelector("#addTask");
const taskInput = document.querySelector("#taskInput");
const addActivityBtn = document.querySelector("#addActivity");
const activityInput = document.querySelector("#activityInput");
const addBalanceBtn = document.querySelector("#addBalance");
const balanceInput = document.querySelector("#balanceInput");

// !--------------------------------------------------------------------------------------------- Initialize on page load
window.addEventListener("load", async () => {
    showLoader();
    const userData = await getDataMe();
    if (!userData) {
        window.location.href = "./login.html";
        return;
    }

    await loadData();
    hideLoader();
});

// !----------------------------------------------------------------------------------------- Event Listeners
if (addTaskBtn) {
    addTaskBtn.addEventListener("click", async () => {
        const task = taskInput.value.trim();
        if (!task) return showModal("لطفاً وظیفه را وارد کنید!");
        try {
            showLoader();
            await addPendingTask(task);
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
            await addRecentActivity(activity);
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
        const amount = +balanceInput.value.trim();
        if (!amount || amount <= 0) return showModal("لطفاً مقدار معتبر وارد کنید!");
        try {
            showLoader();
            await updateBalance(amount);
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

// !------------------------------------------------------------------------------------------- Render Functions
async function renderPendingTasks() {
    const taskList = document.querySelector("#pendingTasks");
    if (!taskList) return;
    taskList.innerHTML = "";
    try {
        const tasks = await fetchPendingTasks();
        if (tasks.length === 0) {
            taskList.innerHTML = '<li class="text-gray-500">هیچ وظیفه‌ای یافت نشد.</li>';
            return;
        }
        tasks.forEach((task) => {
            taskList.insertAdjacentHTML(
                "beforeend",
                `<li class="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition">
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
        const activities = await fetchRecentActivities();
        if (activities.length === 0) {
            activityList.innerHTML = '<li class="text-gray-500">هیچ فعالیتی یافت نشد.</li>';
            return;
        }
        activities.forEach((activity) => {
            activityList.insertAdjacentHTML(
                "beforeend",
                `<li class="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition">
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

async function renderPurchases() {
    const purchaseList = document.querySelector("#purchases");
    if (!purchaseList) return;
    purchaseList.innerHTML = "";
    try {
        const response = await fetch("https://onlineshope.onrender.com/api/dashboard/purchases", { credentials: "include" });
        if (!response.ok) throw new Error("Failed to fetch purchases");
        const purchases = await response.json();
        if (purchases.length === 0) {
            purchaseList.innerHTML = '<li class="text-gray-500">هیچ خریدی یافت نشد.</li>';
            return;
        }
        purchases.forEach((purchase) => {
            purchaseList.insertAdjacentHTML(
                "beforeend",
                `<li class="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition">
                    <span>${purchase.name || purchase.activity}</span>
                    <span>${purchase.price ? purchase.price.toLocaleString() + ' تومان' : 'نامشخص'}</span>
                </li>`
            );
        });
    } catch (error) {
        purchaseList.innerHTML = '<li class="text-red-500">خطا در بارگذاری خریدها!</li>';
        console.error("Error rendering purchases:", error);
    }
}

async function showBalanceUI() {
    const accountBalancePElem = document.querySelector("#accountBalance");
    if (!accountBalancePElem) return;
    try {
        const balance = await fetchBalance();
        accountBalancePElem.textContent = `${balance.toLocaleString()} تومان`;
    } catch (error) {
        accountBalancePElem.textContent = "خطا در بارگذاری موجودی!";
        console.error("Error rendering balance:", error);
    }
}

// !--------------------------------------------------------------------------------------------  Load data
async function loadData() {
    await Promise.all([
        renderPendingTasks(),
        renderRecentActivities(),
        renderPurchases(),
        showBalanceUI(),
    ]);
}

// !--------------------------------------------------------------------------------------- Global delete functions
window.deletePendingTasks = async (id) => {
    try {
        await deletePendingTask(id);
        await renderPendingTasks();
        showModal("حذف با موفقیت انجام شد ✅");
    } catch (error) {
        showModal("❌ خطا در حذف وظیفه");
        console.error("Error deleting task:", error);
    }
};

window.deleteRecentActivity = async (id) => {
    try {
        await deleteRecentActivity(id);
        await renderRecentActivities();
        showModal("حذف با موفقیت انجام شد ✅");
    } catch (error) {
        showModal("❌ خطا در حذف فعالیت");
        console.error("Error deleting activity:", error);
    }
};
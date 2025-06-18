import getDataMe from "../funcs/fetchData/fetchMe.js";
import { showModal } from "../funcs/ui.js";
import { hideLoader, pagesInLoginState, showLoader } from "../funcs/utils.js";

// ! _______________________________________________________________________ variables  __________________________________________
const addTaskBtn = document.querySelector("#addTask");
const taskInput = document.querySelector("#taskInput");

const addActivityBtn = document.querySelector("#addActivity");
const activityInput = document.querySelector("#activityInput");

const addBalanceBtn = document.querySelector("#addBalance");
const balanceInput = document.querySelector("#balanceInput");

// ! _______________________________________________________________________ functions  __________________________________________
window.addEventListener("load" , async () => {
    const getMe = await getDataMe()    
    if (!getMe) return pagesInLoginState()
    hideLoader()

    // todo ================================================================= اضافه کردن وظیفه جدید
    addTaskBtn.addEventListener('click', async () => {        
        try {
            showLoader()
            await fetch("https://onlineshope.onrender.com/api/dashboard/pending-tasks", {
                method: 'POST',
                headers: {
                    "Content-Type":  "application/json"
                },
                body: JSON.stringify({
                        task: taskInput.value.trim()
                    }
                ),
                credentials: "include",
            });

            showPendingTasksUI()
            hideLoader()
            showModal('✅ وظیفه جدید با موفقیت افزوده شد')
            
        } catch (error) {
            hideLoader()
            showModal('❌ خطا در افزودن وظیفه جدید')
            console.error('Error adding user pending-tasks:' , error);
            return;
        }
    });

    // todo ================================================================= اضافه کردن فعالیت جدید
    addActivityBtn.addEventListener('click', async () => {
        try {
            showLoader()
            await fetch("https://onlineshope.onrender.com/api/dashboard/recent-activities", {
                method: 'POST',
                headers: {
                    "Content-Type":  "application/json"
                },
                body: JSON.stringify({
                        activity: activityInput.value.trim()
                    }
                ),
                credentials: "include",
            });
        
            showRecentActivitiesUI()
            hideLoader()
            showModal('✅ فعالیت جدید با موفقیت افزوده شد')
            
        } catch (error) {
            hideLoader()
            showModal('❌ خطا در افزودن فعالیت جدید')
            console.error('Error adding user recent-activities:' , error);
            return;
        }
    });

    // todo ================================================================= افزایش موجودی
    addBalanceBtn.addEventListener('click', async () => {
        try {
            showLoader()
            await fetch("https://onlineshope.onrender.com/api/dashboard/balance", {
                method: 'PUT',
                headers: {
                    "Content-Type":  "application/json"
                },
                body: JSON.stringify({
                        amount: +balanceInput.value.trim()
                    }
                ),
                credentials: "include",
            });
        
            showBalanceUI()
            hideLoader()
            showModal('✅ افزایش موجودی با موفقیت انجام شد')
            
        } catch (error) {
            hideLoader()
            showModal('❌ خطا در افزایش موجودی')
            console.error('Error adding user balance:' , error);
            return;
        }
    });

    // todo ================================================================= نمایش وظایف کاربر
    const showPendingTasksUI = async () => {
        const pendingTasksUlElem = document.querySelector("#pendingTasks")
        const getPendingTasks = await fetch("https://onlineshope.onrender.com/api/dashboard/pending-tasks" , { credentials: 'include' })
        const resultGetPendingTasks = await getPendingTasks.json()
        
        pendingTasksUlElem.innerHTML = '',        
        resultGetPendingTasks.forEach(task => {
            pendingTasksUlElem.insertAdjacentHTML('beforeend' , `
                <li class="text-gray-700">${task.task}</li>
            `)
        });
    }
    // todo ================================================================= نمایش فعالیت های کاربر
    const showRecentActivitiesUI = async () => {
        const recentActivitiesUlElem = document.querySelector("#recentActivities")
        const getRecentActivities = await fetch("https://onlineshope.onrender.com/api/dashboard/recent-activities" , { credentials: 'include' })
        const resultGetRecentActivities = await getRecentActivities.json()

        recentActivitiesUlElem.innerHTML = '';
        resultGetRecentActivities.forEach(task => {
            recentActivitiesUlElem.insertAdjacentHTML('beforeend' , `
                <li class="text-gray-700">${task.activity}</li>
            `)
        });
    }
    // todo ================================================================= نمایش موجودی کاربر
    const showBalanceUI = async () => {
        const accountBalancePElem = document.querySelector("#accountBalance")
        const getMe = await getDataMe()    

        accountBalancePElem.innerHTML = '';
        accountBalancePElem.textContent = getMe.balance.toLocaleString() + ' تومان '
    }

    // todo ================================================================= لود دیتا ها
    const loadData = () => {
        showPendingTasksUI()
        showRecentActivitiesUI()
        showBalanceUI()
    }
    




    loadData()
})
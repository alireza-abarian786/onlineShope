export async function fetchPendingTasks() {
    const response = await fetch("https://onlineshope.onrender.com/api/dashboard/pending-tasks", { credentials: "include" });
    if (!response.ok) throw new Error("Failed to fetch pending tasks");
    return response.json();
}

export async function addPendingTask(task) {
    const response = await fetch("https://onlineshope.onrender.com/api/dashboard/pending-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
        credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to add pending task");
}

export async function deletePendingTask(id) {
    const response = await fetch(`https://onlineshope.onrender.com/api/dashboard/pending-tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to delete pending task");
}

export async function fetchRecentActivities() {
    const response = await fetch("https://onlineshope.onrender.com/api/dashboard/recent-activities", { credentials: "include" });
    if (!response.ok) throw new Error("Failed to fetch recent activities");
    return response.json();
}

export async function addRecentActivity(activity) {
    const response = await fetch("https://onlineshope.onrender.com/api/dashboard/recent-activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activity }),
        credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to add recent activity");
}

export async function deleteRecentActivity(id) {
    const response = await fetch(`https://onlineshope.onrender.com/api/dashboard/recent-activities/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to delete recent activity");
}

export async function updateBalance(amount) {
    const response = await fetch("https://onlineshope.onrender.com/api/dashboard/balance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
        credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to update balance");
}

export async function fetchBalance() {
    const userData = await fetch("https://onlineshope.onrender.com/api/user/me", { credentials: "include" }).then((res) => res.json());
    return userData.balance;
}
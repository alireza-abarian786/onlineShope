// src/js/funcs/timer.js

// ✅ تاریخ هدف داینامیک (مثلاً 7 روز بعد)
function getTargetDate() {
    const saved = localStorage.getItem('saleEndDate');
    if (saved) {
        return new Date(saved);
    }
    // 7 روز بعد
    const date = new Date();
    date.setDate(date.getDate() + 7);
    localStorage.setItem('saleEndDate', date.toISOString());
    return date;
}

const targetDate = getTargetDate();
const targetDate2 = getTargetDate();

// ارجاع به عناصر HTML
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const daysElement2 = document.getElementById("days2");
const hoursElement2 = document.getElementById("hours2");
const minutesElement2 = document.getElementById("minutes2");
const secondsElement2 = document.getElementById("seconds2");

// تابع برای به‌روزرسانی ساعت شمار
function updateTimer(targetDate, daysElement, hoursElement, minutesElement, secondsElement) {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    // ✅ اگر زمان تموم شد، دوباره ست کن
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 7);
    localStorage.setItem('saleEndDate', newDate.toISOString());
    daysElement.textContent = "07";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

let runTimer = () => {
  // هر ثانیه یکبار آپدیت کن
  setInterval(() => updateTimer(targetDate, daysElement, hoursElement, minutesElement, secondsElement), 1000);
  setInterval(() => updateTimer(targetDate2, daysElement2, hoursElement2, minutesElement2, secondsElement2), 1000);
  
  // اجرای اولیه
  updateTimer(targetDate, daysElement, hoursElement, minutesElement, secondsElement);
  updateTimer(targetDate2, daysElement2, hoursElement2, minutesElement2, secondsElement2);
}

export { runTimer };
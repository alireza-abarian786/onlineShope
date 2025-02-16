// تاریخ هدف (مثال: اوایل سال 2024)
const targetDate = new Date("2025-02-17T00:00:00");

const targetDate2 = new Date("2025-03-17T00:00:00");

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
  // تاریخ فعلی
  const now = new Date();

  // تفاوت زمانی بین تاریخ هدف و تاریخ فعلی (به میلی‌ثانیه)
  const diff = targetDate - now;

  // اگر زمان باقی‌مانده منفی شد، ساعت شمار تمام شده است
  if (diff <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    clearInterval(intervalId); // متوقف کردن بروزرسانی
    return;
  }

  // محاسبه روزها، ساعات، دقایق و ثانیه‌ها
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // روزها
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // ساعات
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // دقایق
  const seconds = Math.floor((diff % (1000 * 60)) / 1000); // ثانیه‌ها

  // نمایش ساعات، دقایق و ثانیه‌ها در عناصر مربوطه
  daysElement.textContent = String(days).padStart(2, "0"); // اطمینان از دو رقمی بودن
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

// فراخوانی تابع updateTimer هر ثانیه یکبار
setInterval(() => updateTimer(targetDate, daysElement, hoursElement, minutesElement, secondsElement) , 1000);
setInterval(() => updateTimer(targetDate2, daysElement2, hoursElement2, minutesElement2, secondsElement2) , 1000);

// اجرای اولیه تابع برای نمایش زمان بدون انتظار یک ثانیه
updateTimer(targetDate, daysElement, hoursElement, minutesElement, secondsElement)
updateTimer(targetDate2, daysElement2, hoursElement2, minutesElement2, secondsElement2)

export { updateTimer };

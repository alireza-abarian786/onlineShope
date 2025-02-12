// تاریخ هدف (مثال: اوایل سال 2024)
const targetDate = new Date('2026-01-01T00:00:00');

// ارجاع به عناصر HTML
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// تابع برای به‌روزرسانی ساعت شمار
function updateTimer() {
    // تاریخ فعلی
    const now = new Date();

    // تفاوت زمانی بین تاریخ هدف و تاریخ فعلی (به میلی‌ثانیه)
    const diff = targetDate - now;

    // اگر زمان باقی‌مانده منفی شد، ساعت شمار تمام شده است
    if (diff <= 0) {
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        clearInterval(intervalId); // متوقف کردن بروزرسانی
        return;
    }

    // محاسبه روزها، ساعات، دقایق و ثانیه‌ها
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // روزها
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // ساعات
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // دقایق
    const seconds = Math.floor((diff % (1000 * 60)) / 1000); // ثانیه‌ها

    // نمایش ساعات، دقایق و ثانیه‌ها در عناصر مربوطه
    hoursElement.textContent = String(hours).padStart(2, '0'); // اطمینان از دو رقمی بودن
    minutesElement.textContent = String(minutes).padStart(2, '0'); // اطمینان از دو رقمی بودن
    secondsElement.textContent = String(seconds).padStart(2, '0'); // اطمینان از دو رقمی بودن
}

// فراخوانی تابع updateTimer هر ثانیه یکبار
const intervalId = setInterval(updateTimer, 1000);

// اجرای اولیه تابع برای نمایش زمان بدون انتظار یک ثانیه
updateTimer();

export {updateTimer}
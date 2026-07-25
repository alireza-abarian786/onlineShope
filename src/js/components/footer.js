// src/js/components/footer.js

import { showModal } from "../funcs/ui.js";

let btnFooter = document.querySelector(".btn-footer");
let inputFooter = document.querySelector(".input-footer");

function btnEmailFooter() {
  btnFooter.addEventListener("click", () => {
    const email = inputFooter.value.trim();
    
    if (email) {
      // ✅ ذخیره ایمیل در localStorage (بدون سرور)
      const emails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];
      
      if (!emails.includes(email)) {
        emails.push(email);
        localStorage.setItem('subscribedEmails', JSON.stringify(emails));
        inputFooter.value = "";
        showModal("📧 ایمیل شما با موفقیت ثبت شد");
      } else {
        showModal("⚠️ این ایمیل قبلاً ثبت شده است");
      }
    } else {
      showModal("⚠️ لطفاً ایمیل خود را وارد کنید");
    }
  });
}

export { btnEmailFooter };
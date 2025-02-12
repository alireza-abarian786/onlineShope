import { showModal } from "./funcs/store/ui.js";
let btnFooter = document.querySelector(".btn-footer");
let inputFooter = document.querySelector(".input-footer");

function btnEmailFooter() {
  btnFooter.addEventListener("click", () => {

      let emailUser = {
        email: inputFooter.value,
      }
    
      if (inputFooter.value) {
        fetch("http://localhost:3000/email", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(emailUser),
          }).then((res) => res.json())
            .then((data) => {
            inputFooter.value = "";
            showModal("📧 ایمیل شما با موفقیت ثبت شد")
          });
      }
  });
}


export {btnEmailFooter}





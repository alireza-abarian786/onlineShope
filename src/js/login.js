import {setLocalStorage, getLocalStorage, getToken} from './funcs/store/storage.js';
import { showLoader , hideLoader , UserInformationGetFunction} from "./funcs/utils.js";
import { toggleCart , closeCart } from './funcs/store/cart.js';
import { isLogin } from './header.js';

let userName = document.querySelector('.Username-input');
let password = document.querySelector('.Password-input');
let btnLogin = document.querySelector('.btn-login');
let btnSignUp = document.querySelector('.btn-sign-up');
let usernameSignUp = document.querySelector(".username-sign-up")
let passwordSignUp = document.querySelector(".password-sign-up")
let emailSignUp = document.querySelector(".email-sign-up")
let phoneInput = document.querySelector(".phone-input")

let usernameText = document.querySelector('.username-text')
let passwordText = document.querySelector('.password-text')
let phoneText = document.querySelector('.phone-text')
let emailText = document.querySelector('.email-text')

let usernameValid = false;
let passwordValid = false;
let phoneValid = false;
let emailValid = false;

//! ------------------------------------------------------------------------------------------- all
window.addEventListener("DOMContentLoaded" , () => {
    toggleCart()
    closeCart()
    hideLoader()
})

//! ------------------------------------------------------------------------------------------- login
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    showLoader()

    if (userName.value && password.value !== '') {
        loginOperationManagementFunction()
        UserInformationGetFunction()
        clearInput(); 
        hideLoader()
        
    } else {
        hideLoader()
        Swal.fire({
            title: "ورود ناموفق",
            text: "لطفا نام کاربری یا رمز عبور را به درستی وارد کنید",
            icon: "error",
            button: "تایید",
        })
    }
});

function clearInput() {
    userName.value = '';
    password.value = '';
}

const loginOperationManagementFunction = async () => {
    const userLoginInformation = {
        email: userName.value.trim(),
        password: password.value.trim()
    }    

    const loginOperation = await fetch("https://onlineshope.onrender.com/api/auth/login" , {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userLoginInformation)
    })
         
    if (loginOperation.ok) {
        Swal.fire({
            title: 'خوش آمدید',
            text: "⁉️میخواهید به پنل کاربری خود بروید",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: 'بله، برو!',
            cancelButtonText: 'لغو'
        }).then((result) => {
            isLogin();
            if (result.isConfirmed) {
                window.location.href = './doshboard.html';
            }
        })

        const resultLoginOperation = await loginOperation.json()
        setLocalStorage('token' , resultLoginOperation.token);
    }
}

//! ------------------------------------------------------------------------------------------- sign up
btnSignUp.addEventListener("click", (event) => {
    event.preventDefault()

    showLoader()
    if (!usernameSignUp.value || !passwordSignUp.value || !phoneInput.value) {
        hideLoader()
        Swal.fire({
            title: "لطفا بیشتر دقت کنید (:",
            text: "❗ ورودی‌ها خالی هستند، ارسال انجام نمی‌شود ❗",
            icon: "warning",
            button: "تایید",
        })
        return;
    }


    statusLogin(usernameSignUp.value)

})

let statusLogin = async (username) => {
    
    let loginName = getLocalStorage('login');    
    if (loginName.length === 0) {
        if (usernameValid && passwordValid && phoneValid && emailValid) {
            let newUser = {
                name: usernameSignUp.value.trim(),
                email: emailSignUp.value.trim(), 
                password: passwordSignUp.value.trim(),
                phone: phoneInput.value.trim(),
            }
            
            try {
                let res = await fetch('https://onlineshope.onrender.com/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });
                
                const data = await res.json();
                console.log(data);
                
                
                if (!res.ok) {
                    throw new Error(data.error || data.details || `HTTP error! status: ${res.status}`);
                }

                setLocalStorage('login', username);
                setLocalStorage('token', data.token);
                isLogin();
                clearInputSignUp();

                hideLoader();
                Swal.fire({
                    title: "ثبت نام شما با موفقیت انجام شد",
                    text: "⁉️میخواهید به پنل کاربری خود بروید",
                    icon: "success", 
                    showCancelButton: true,
                    confirmButtonText: 'بله، برو!',
                    cancelButtonText: 'لغو'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = './doshboard.html';
                    }
                });
                
            } catch (error) {
                hideLoader();
                console.error("خطا در ارسال درخواست به سرور:", error);
                Swal.fire({
                    title: "خطا در ثبت نام",
                    text: error.message || "مشکلی در ثبت نام رخ داده است",
                    icon: "error",
                    button: "تایید"
                });
            }
        } else {
            hideLoader();
            Swal.fire({
                title: "خطا در اعتبارسنجی",
                text: "لطفاً تمام فیلدها را به درستی پر کنید",
                icon: "error",
                button: "تایید"
            });
        }

    } else {
        hideLoader();
        Swal.fire({
            title: "شما قبلا ثبت نام کرده اید",
            text: "⁉️میخواهید به پنل کاربری خود بروید",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: 'بله، برو!',
            cancelButtonText: 'لغو'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = './doshboard.html';
            }
        });
    }
}

function clearInputSignUp() {
    usernameSignUp.value = ''
    passwordSignUp.value = ''
    phoneInput.value = ''
}

// let SignUpUser = async () => {

//     await fetch("https://onlineshope.onrender.com/api/users")
//     .then(res => res.json())
//     .then(data => {

//         if (usernameSignUp.value.length < 5 || passwordSignUp.value.length < 8 || phoneInput.value.length < 11 || phoneInput.value.length >= 12) {
            
//             isLengthFalse(data)
//         } else {
            
//             isUserName(data)
//             passwordKey()
//             phoneKey()
//         }

//     })

// }

function isLengthFalse(data) {
    if (usernameSignUp.value.length < 5) {
        showText(usernameText , 'نام کاربری باید بیشتر از 5 کاراکتر باشد')
        isUserName(data)
    }

    if (passwordSignUp.value.length < 8 ) {
        showText(passwordText , 'رمز عبور باید بیشتر از 8 کاراکتر باشد')
        passwordKey()
    }

    if (phoneInput.value.length < 11 || phoneInput.value.length >= 12) {
        showText(phoneText , 'شماره تلفن باید به درستی وارد شود')
        phoneKey()
    }
}

function isUserName(data) {
        let item = data.find(user => user.name === usernameSignUp.value);        

        if (item !== undefined) {            
            if (item.name === usernameSignUp.value) {

                showText(usernameText , 'نام کاربری از قبل موجود میباشد')
                usernameValid = false
                
                usernameSignUp.addEventListener('keyup', (e) => {                    
                    if (usernameSignUp.value.length < 5) {
                        showText(usernameText , 'نام کاربری باید بیشتر از 5 کاراکتر باشد')
                        usernameValid = false
                    } else {

                        if (item.name === usernameSignUp.value) {
                            showText(usernameText , 'نام کاربری از قبل موجود میباشد')
                            usernameValid = false
                        } else {
                            fadeAnimated(usernameText , 'صحیح میباشد')
                            usernameValid = true
                        }
                    }
                    
                })      
            } 
        } else {

            usernameKey(data , item)
        }
}

let usernameKey = (data , item) => {    
    usernameSignUp.addEventListener('keyup', (e) => {                    
        if (usernameSignUp.value.length < 5) {
            showText(usernameText , 'نام کاربری باید بیشتر از 5 کاراکتر باشد')
            usernameValid = false
        } else {
            usernameValid = true
            fadeAnimated(usernameText , 'صحیح میباشد')
            isUserName(data)
        }
        
    })  
}

let passwordKey = () => {
    passwordSignUp.addEventListener("keyup", () => {
        if (passwordSignUp.value.length > 8) {
            fadeAnimated(passwordText , 'صحیح میباشد')
            passwordValid = true
        } else {
            showText(passwordText , 'رمز عبور باید بیشتر از 8 کاراکتر باشد')
            passwordValid = false
        }
    })
}

function phoneKey() {
    phoneInput.addEventListener('keyup' , (e) => {
        
        if (phoneInput.value.length == 11) {
            fadeAnimated(phoneText , 'صحیح میباشد')
            phoneValid = true
        } else {
            showText(phoneText , 'شماره تلفن باید به درستی وارد شود')
            phoneValid = false
            
        }
        
    })
}

let fadeAnimated = (element , text) => {
    element.innerHTML = text

    if (text === 'صحیح میباشد') {        
        // setTimeout(() => {
            element.style.display = 'none';
        // }, 1000);
    } else {
        element.style.display = 'block';

    }
}
let showText = (element , text) => {
    element.style.display = 'block';
    element.innerHTML = text
}

// اعتبارسنجی نام کاربری
usernameSignUp.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    usernameValid = value.length >= 3;
    if (!usernameValid) {
        fadeAnimated(usernameText, 'نام کاربری باید حداقل 3 کاراکتر باشد');
    } else {
        showText(usernameText, 'نام کاربری معتبر است');
    }
});

// اعتبارسنجی رمز عبور
passwordSignUp.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    passwordValid = value.length >= 6;
    if (!passwordValid) {
        fadeAnimated(passwordText, 'رمز عبور باید حداقل 6 کاراکتر باشد');
    } else {
        showText(passwordText, 'رمز عبور معتبر است');
    }
});

// اعتبارسنجی شماره تلفن
phoneInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    const phoneRegex = /^09[0-9]{9}$/;
    phoneValid = phoneRegex.test(value);
    if (!phoneValid) {
        fadeAnimated(phoneText, 'شماره تلفن باید با 09 شروع شود و 11 رقم باشد');
    } else {
        showText(phoneText, 'شماره تلفن معتبر است');
    }
});

// اعتبارسنجی ایمیل
emailSignUp.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailValid = emailRegex.test(value);
    if (!emailValid) {
        if (emailText) {
            fadeAnimated(emailText, 'لطفاً یک ایمیل معتبر وارد کنید');
        }
    } else {
        if (emailText) {
            showText(emailText, 'ایمیل معتبر است');
        }
    }
});
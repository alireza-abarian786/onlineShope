import {setLocalStorage, getLocalStorage} from './funcs/store/storage.js';
import { showLoader , hideLoader} from "./funcs/utils.js";
import { toggleCart , closeCart } from './funcs/store/cart.js';
import { fetchUserFromDatabase } from './funcs/store/box.js';
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

// ------------------------------------------------------------------------------------------- all
window.addEventListener("DOMContentLoaded" , () => {
    // let loginName = getLocalStorage('login');         
    // SignUpUser()
    toggleCart()
    closeCart()
    // fetchUserCart()
    hideLoader()
})

// ------------------------------------------------------------------------------------------- login
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    showLoader()
    fetch('https://onlineshope.onrender.com/api/users')
    .then(res => res.json())
    .then(data => {

        let item = data.find(user => user.email === userName.value && user.password === password.value);

        if (item && userName.value && password.value !== '') {
            loginCheked(item.name)
            
        } else {
            hideLoader()
            Swal.fire({
                title: "ورود ناموفق",
                text: "لطفا نام کاربری یا رمز عبور را به درستی وارد کنید",
                icon: "error",
                button: "تایید",
            })
        }
    })
    .catch(error => console.error("خطا در دریافت اطلاعات از سرور:", error));
});

function clearInput() {
    userName.value = '';
    password.value = '';
}

async function loginCheked(username) {
    setLocalStorage('login' , username);

    let userData = await fetchUserFromDatabase();    
    const cartUser = {
        email: userData.email,
        password: userData.password
    }    
    let res = await fetch("https://onlineshope.onrender.com/api/auth/login" , {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(cartUser)
    })

    hideLoader()
    clearInput();          
    if (res.ok) {
        // // ایجاد سبد خرید برای کاربر جدید
        // try {
        //     const cartResponse = await fetch(`https://onlineshope.onrender.com/api/carts/${userData._id}/items`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             items: [],
        //             totalPrice: 0
        //         })
        //     });
            
        //     if (!cartResponse.ok) {
        //         console.error('خطا در ایجاد سبد خرید');
        //     }
        // } catch (error) {
        //     console.error('خطا در ایجاد سبد خرید:', error);
        // }

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
            
            // address: "iran"
            console.log('Sending user data:', newUser);

            try {
                let res = await fetch('https://onlineshope.onrender.com/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });
                
                const data = await res.json();
                
                if (!res.ok) {
                    throw new Error(data.error || data.details || `HTTP error! status: ${res.status}`);
                }

                setLocalStorage('login', username);
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
import {setLocalStorage, getLocalStorage} from './funcs/store/storage.js';
import { isLogin , fetchDataFromApi , showSwal, showLoader , hideLoader} from "./funcs/utils.js";
import { toggleCart , closeCart } from './funcs/store/cart.js';
import { initializeCart } from './funcs/store/cart.js';
import { fetchUserFromDatabase } from './funcs/store/box.js';

let userName = document.querySelector('.Username-input');
let password = document.querySelector('.Password-input');
let btnLogin = document.querySelector('.btn-login');
let btnSignUp = document.querySelector('.btn-sign-up');
let usernameSignUp = document.querySelector(".username-sign-up")
let passwordSignUp = document.querySelector(".password-sign-up")
let phoneInput = document.querySelector(".phone-input")

let usernameText = document.querySelector('.username-text')
let passwordText = document.querySelector('.password-text')
let phoneText = document.querySelector('.phone-text')

let usernameValid , passwordValid , phoneValid;

// ------------------------------------------------------------------------------------------- all
window.addEventListener("DOMContentLoaded" , () => {
    let loginName = getLocalStorage('login');         
    console.log(loginName);
    // statusLogin(loginName)
    // isLogin(loginName);

    SignUpUser()
    toggleCart()
    closeCart()
    initializeCart()
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
    let res = await fetch("https://onlineshope.onrender.com/api/users/login" , {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(cartUser)
    })

    hideLoader()
    clearInput();          
    if (res.ok) {
        showSwal(
            'خوش آمدید' ,
            "⁉️میخواهید به پنل کاربری خود بروید",
            "success",
            true,
            'بله',
            'خیر',
            (result) => {
                isLogin();
                if (result) {
                    window.location.href = './doshboard.html';
                }
            }
        )
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

        if (usernameValid && passwordValid && phoneValid) {

            let newUser = {
                // _id: Date.now().toString(36),
                name: usernameSignUp.value,
                email: `${usernameSignUp.value}@example.com`,
                password: passwordSignUp.value,
                phone: phoneInput.value,
                address: "iran",
                registration_date: new Date().toISOString()
            }

            try {
                let res = await fetch('https://onlineshope.onrender.com/api/users' , {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                let result = await res.json();

                // ایجاد سبد خرید خالی برای کاربر جدید
                const newCart = {
                    _id: result.user._id, // استفاده از _id برگشتی از سرور
                    items: [],
                    totalPrice: 0
                };

                const cartRes = await fetch('https://onlineshope.onrender.com/api/carts', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(newCart)
                });

                if (!cartRes.ok) {
                    throw new Error('Failed to create cart');
                }

                if (res.ok) {
                    setLocalStorage('login' , username);
                    isLogin();
                    clearInputSignUp()

                    let userData = await fetchUserFromDatabase();
                    await fetch("https://onlineshope.onrender.com/api/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: userData.name, //* نام کاربر
                            password: userData.password, //* رمز عبور کاربر
                        }),
                    });

                    hideLoader()
                    Swal.fire({
                        title: "ثبت نام شما با موفقیت انجام شد",
                        text: "⁉️میخواهید به پنل کاربری خود بروید",
                        icon: "success",
                        showCancelButton: true,
                        confirmButtonText: 'بله، برو!',
                        cancelButtonText: 'لغو'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = './doshboard.html'; // آدرس صفحه مقصد
                        }
                    })
                    
                }
            } catch (error) {
                console.error("خطا در ارسال درخواست به سرور:", error);
            }
        }

    } else {
        hideLoader()
        Swal.fire({
            title: "شما قبلا ثبت نام کرده اید",
            text: "⁉️میخواهید به پنل کاربری خود بروید",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: 'بله، برو!',
            cancelButtonText: 'لغو'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = './doshboard.html'; // آدرس صفحه مقصد
            }
        })
    }
}

function clearInputSignUp() {
    usernameSignUp.value = ''
    passwordSignUp.value = ''
    phoneInput.value = ''
}

let SignUpUser = async () => {

    await fetch("https://onlineshope.onrender.com/api/users")
    .then(res => res.json())
    .then(data => {

        if (usernameSignUp.value.length < 5 || passwordSignUp.value.length < 8 || phoneInput.value.length < 11 || phoneInput.value.length >= 12) {
            
            isLengthFalse(data)
        } else {
            
            isUserName(data)
            passwordKey()
            phoneKey()
        }

    })

}

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
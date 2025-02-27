import {setLocalStorage, getLocalStorage} from './funcs/store/storage.js';
import { isLogin } from './funcs/utils.js';
import { toggleCart , closeCart } from './funcs/store/cart.js';
import { initializeCart } from './funcs/store/cart.js';

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
    isLogin(loginName);
    SignUpUser()
    statusLogin()

    toggleCart()
    closeCart()
    initializeCart()
})

// ------------------------------------------------------------------------------------------- login
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    fetch('http://localhost:4000/users')
    .then(res => res.json())
    .then(data => {

        let item = data.find(user => user.name === userName.value && user.password === password.value);        
        if (item && userName.value && password.value !== '') {
            loginCheked(getLocalStorage("login") , userName.value)
            
        } else {
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

function loginCheked(loginName , username) {
    if (loginName === username) {
        Swal.fire({
            title: "شما در سایت ثبت نام کرده اید",
            text: "⁉️میخواهید به پنل کاربری خود بروید",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: 'بله، برو!',
            cancelButtonText: 'لغو'
        }).then((result) => {
            clearInput();
            if (result.isConfirmed) {
                window.location.href = './doshboard.html'; // آدرس صفحه مقصد
            }
        })
        
    } else {


        Swal.fire({
            title: "شما در سایت ثبت نام کرده اید",
            text: "⁉️میخواهید به پنل کاربری خود بروید",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: 'بله، برو!',
            cancelButtonText: 'لغو'
        }).then((result) => {
            setLocalStorage('login' , username);
            loginName = getLocalStorage('login');                
            clearInput();
            isLogin(loginName);
            if (result.isConfirmed) {
                window.location.href = './doshboard.html'; // آدرس صفحه مقصد
            }
        })             
    }
}

// ------------------------------------------------------------------------------------------- sign up
btnSignUp.addEventListener("click", (event) => {
    event.preventDefault()

    if (!usernameSignUp.value || !passwordSignUp.value || !phoneInput.value) {
        Swal.fire({
            title: "لطفا بیشتر دقت کنید (:",
            text: "❗ ورودی‌ها خالی هستند، ارسال انجام نمی‌شود ❗",
            icon: "warning",
            button: "تایید",
        })
        return;
    }


    statusLogin()

})

let statusLogin = async () => {
    let loginName = getLocalStorage('login');

    if (loginName.length === 0) {

        if (usernameValid && passwordValid && phoneValid) {

            let newUser = {
                id: Date.now().toString(36),
                name: usernameSignUp.value,
                email: "sara@example.com",
                password: passwordSignUp.value,
                address: "iran",
                phone: phoneInput.value,
                registration_date: Date(),
            }

            let res = await fetch('http://localhost:4000/users' , {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            let result = await res.json()

            setLocalStorage('login' , result.name);
            let loginName = getLocalStorage('login');                
            isLogin(loginName);
            clearInputSignUp()

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

    } else {
        Swal.fire({
            title: "شما در سایت ثبت نام کرده اید",
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

let SignUpUser = () => {

    fetch("http://localhost:4000/users")
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
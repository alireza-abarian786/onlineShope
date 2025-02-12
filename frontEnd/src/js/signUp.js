
let userName = document.querySelector('.username-input')
let password = document.querySelector('.password-input')
let phone = document.querySelector('.phone-input')
let btn = document.querySelector('.btn-login')
let usernameText = document.querySelector('.username-text')
let passwordText = document.querySelector('.password-text')
let phoneText = document.querySelector('.phone-text')
let form = document.querySelector('form')
let usersServer = null

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

btn.addEventListener('click' , (e) => {
    e.preventDefault()

    if (userName.value.length < 5 || password.value.length < 8 || phone.value.length < 11 || phone.value.length >= 12) {        
        
        form.style.gap = '15px'
        isLengthFalse()
        
        
    } else { 

        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(data => {
            
            setUsers(data)
            isLengthTrue(data)
            isUserName(data)
            
        })
    }
})

function clearInput() {
    userName.value = ''
    password.value = ''
    phone.value = ''
}

function isPhone() {
    phone.addEventListener('keyup' , (e) => {
        
        if (phone.value.length == 11) {
            phoneText.innerHTML = 'شماره تلفن صحیح میباشد'
            phoneText.style.color =  'green'
        } else {
            phoneText.innerHTML = 'شماره تلفن باید به درستی وارد شود'
            phoneText.style.color =  '#aa2020'
        }
        
    })
}


function isLengthFalse() {
    if (userName.value.length < 5) {
        usernameText.innerHTML = 'نام کاربری باید بیشتر از 5 کاراکتر باشد'
        usernameText.style.color =  '#aa2020'
    }

    if (password.value.length < 8 ) {
        passwordText.innerHTML = 'رمز عبور باید بیشتر از 8 کاراکتر باشد'
        passwordText.style.color =  '#aa2020'
    }

    if (phone.value.length < 11 || phone.value.length >= 12) {
        phoneText.innerHTML = 'شماره تلفن باید به درستی وارد شود'
        phoneText.style.color =  '#aa2020'
        isPhone()
    }
}

function isLengthTrue(data) {
    if (userName.value.length > 5) {
        isUserName(data)
    }

    if (password.value.length > 8 ) {
        phoneText.innerHTML = ' رمز عبور صحیح میباشد'
        phoneText.style.color =  'green'
    }

    if (phone.value.length == 11) {
        phoneText.innerHTML = 'شماره تلفن صحیح میباشد'
        phoneText.style.color =  'green'
        isPhone()
    }
}



async function setUsers(data) {
    
    if (data.username === userName.value) {

        console.log(1);
        isUserName(data)
        return false
        
    } else {

            let newUser = {
                id: data.length + 1, 
                username: usernameText.value,
                password: passwordText.value,
                phone: phoneText.value,
            }
    
            swal({
                title: "ثبت نام با موفقیت انجام شد",
                text: "روی تایید کلیک کنید تا به صفحه ی اصلی منتقل شوید",
                icon: "success",
                button: "تایید",
            })
            .then(() => {
                // clearInputSignUp();
                // let loginName = getLocalStorage('login');                
                // if (!loginName) {
                //     setLocalStorage('login' , item.username);
                //     isLogin(loginName);
                // }
            })
    
            let res = await fetch("http://localhost:3000/users" , {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })

            // let result = await res.json()
            //     console.log(result);
                

    }
}

function isUserName(data) {
    
    if (userName.value.length < 5) {
        isLengthFalse()
        
    } else {
        
        for (const user in data) {            
            if (data[user].username === userName.value) {
                
                usernameText.innerHTML = 'نام کاربری از قبل موجود میباشد'
                usernameText.style.color =  '#aa2020'
                userName.addEventListener('keyup', () => {
                    console.log(data[user].username === userName.value);
                    
                    if (data[user].username !== userName.value) {
                        setTimeout(() => {
                            usernameText.innerHTML = 'نام کاربری صحیح میباشد'
                            usernameText.style.color =  'green'
                        }, 2000);
                    }
                })
                
            } else {
                setTimeout(() => {
                    usernameText.innerHTML = 'نام کاربری صحیح میباشد'
                    usernameText.style.color =  'green'
                }, 2000);
            }
        }
    }
}



let loginBtnText = document.querySelector('#login span')
let loginBtn = document.querySelector('#login')



let searchParams = (key) => {
    let urlSearchParams = new URLSearchParams(window.location.search)
    return urlSearchParams.get(key)
}

function isLogin(username) {    
    if (username.length !== 0) {
        loginBtnText.innerHTML = username
    } else {
        loginBtnText.innerHTML = "ورود / عضویت"
    }
}

let changeSrcLoginBtn = () => {
    if (loginBtnText.innerHTML !== "ورود / عضویت") {
        loginBtn.setAttribute('href' , '#doshbord')        
    } else {
        loginBtn.setAttribute('href' , './html/login.html')
    }
}

export {searchParams , isLogin , changeSrcLoginBtn}
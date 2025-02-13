let loginBtnText = document.querySelector('#login span')
let loginBtn = document.querySelector('#login')



let searchParams = (key) => {
    let urlSearchParams = new URLSearchParams(window.location.search)
    return urlSearchParams.get(key)
}

function isLogin(username) {    
    if (username.length !== 0) {
        loginBtnText.innerHTML = username
        // loginBtn.setAttribute('href' , './doshboard.html') 
        if (window.location.href === 'http://127.0.0.1:5500/index.html') {
            
            loginBtn.setAttribute('href' , './frontEnd/html/doshboard.html') 
        } else {
            loginBtn.setAttribute('href' , './doshboard.html') 
        }       
    } else {
        loginBtnText.innerHTML = "ورود / عضویت"
        loginBtn.setAttribute('href' , "./frontEnd/html/login.html")
    }
}

// let changeSrcLoginBtn = () => {
    
//     if (window.location.href === 'http://127.0.0.1:5500/index.html') {
//         loginBtn.setAttribute('href' , './html/doshboard.html') 
//     } else {
//         loginBtn.setAttribute('href' , './doshboard.html') 
//     }
// }

export {searchParams , isLogin}
import { removeFromCart ,finalBuyCartFunc , updateQuantity , fetchUserLogged} from "./funcs/store/cart.js"
import { fetchDataFromApi} from "./funcs/utils.js"
// -----------------------------------------------------------------------------------------------------------------------

let total = document.querySelectorAll(".Total-cart-price")
// -----------------------------------------------------------------------------------------------------------------------

window.addEventListener('DOMContentLoaded' , async () => {
    finalBuyCartFunc()
    totalPaymentFunc()
})

function buttonsShoppingCart() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', removeFromCart)
    })
    document.querySelectorAll('.bi-plus-lg').forEach(btn => {
        btn.addEventListener('click', (event) => updateQuantity(event , 'increase'))
    })
    document.querySelectorAll('.bi-dash-lg').forEach(btn => {
        btn.addEventListener('click', (event) => updateQuantity(event , 'decrease'))
    })
}

let totalPaymentFunc = async () => {
    let userLogged = await fetchUserLogged()
    if (userLogged) {
        
        let arrayCart = await fetchDataFromApi(`https://onlineshope.onrender.com/api/carts/${userLogged._id}`);               //* دریافت لیست کل سبد خرید  
        // let sum = arrayCart.items.map(item => item.totalPrice).reduce((acc , curr) => acc + curr , 0) 
        total.forEach(item => {
            item.textContent = arrayCart.totalPrice.toLocaleString()
        })
    }

}

export {buttonsShoppingCart, totalPaymentFunc}
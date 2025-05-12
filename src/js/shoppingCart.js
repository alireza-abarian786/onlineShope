import { removeFromCart , updateQuantity } from "./funcs/store/cart.js"
// -----------------------------------------------------------------------------------------------------------------------

let total = document.querySelectorAll(".Total-cart-price")
// -----------------------------------------------------------------------------------------------------------------------

window.addEventListener('DOMContentLoaded' , async () => {
    // fetchUserLogged();
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
    let userCart = await functionGetUserCartInformation()
    console.log(userCart);
    
    let sum = userCart.items.map(item => item.totalPriceProductCart).reduce((acc , curr) => acc + curr , 0) 
    total.forEach(item => {
        item.textContent = sum.toLocaleString()
    })
}

export {buttonsShoppingCart, totalPaymentFunc}
import { removeFromCart ,finalBuyCartFunc , updateQuantity} from "./funcs/store/cart.js"
import { fetchDataFromApi } from "./funcs/utils.js"
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
    let arrayCart = await fetchDataFromApi('http://localhost:4000/carts')
    let sum = arrayCart.map(item => item.totalPrice).reduce((acc , curr) => acc + curr , 0)

    total.forEach(item => {
        item.textContent = sum.toLocaleString()
    })
}









export {buttonsShoppingCart, totalPaymentFunc}
import { removeFromCart ,finalBuyCartFunc , increaseQuantity , decreaseQuantity} from "./funcs/store/cart.js"
import { fetchDataFromApi } from "./funcs/utils.js"
// -----------------------------------------------------------------------------------------------------------------------

let boxPayment = document.querySelector(".box-Payment")
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
    document.querySelectorAll('.fa-plus').forEach(btn => {
        btn.addEventListener('click', increaseQuantity)
    })
    document.querySelectorAll('.fa-minus').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity)
    })
}


// console.log(boxPayment.offsetTop);


// window.addEventListener('scroll', () => {
//     console.log(scrollY);
//     if (scrollY === boxPayment.offsetTop) {
//         boxPayment.style.position = 'fixed'
//     }
    
// })

let totalPaymentFunc = async () => {
    let arrayCart = await fetchDataFromApi('http://localhost:4000/carts')
    let sum = arrayCart.map(item => item.totalPrice).reduce((acc , curr) => acc + curr , 0)

    total.forEach(item => {
        item.textContent = sum.toLocaleString()
    })
    
 }









export {buttonsShoppingCart}
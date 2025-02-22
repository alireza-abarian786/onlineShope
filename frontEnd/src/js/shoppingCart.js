import { removeFromCart ,finalBuyCartFunc , increaseQuantity , decreaseQuantity} from "./funcs/store/cart.js"



window.addEventListener('DOMContentLoaded' , () => {
    finalBuyCartFunc()
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
















export {buttonsShoppingCart}
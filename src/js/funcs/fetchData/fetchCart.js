import { safeFetchWithCache } from "./FetchWithCache.js";

// //todo========================================================== 🛒 دریافت اطلاعات سبد خرید
async function getCartData() {
  const data = await safeFetchWithCache("https://onlineshope.onrender.com/api/cart");

  if (Array.isArray(data?.products)) {
    return data;
  }

  if (Array.isArray(data?.cart?.products)) {
    return data.cart;
  }

  return {
    products: [],
    totalWithoutDiscount: 0,
    totalDiscountAmount: 0,
    totalWithDiscount: 0
  };
}

export { getCartData }
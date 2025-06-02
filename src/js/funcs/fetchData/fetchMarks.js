import { safeFetchWithCache } from "./FetchWithCache.js";

// //todo========================================================== دریافت لیست علاقه مندی های کاربر
async function getFavorites() {
  const data = await safeFetchWithCache("https://onlineshope.onrender.com/api/users/favorites");  

  if (data?.favorites && Array.isArray(data.favorites)) {
    return data;
  }
  
  return { favorites: [] };
}

export { getFavorites }
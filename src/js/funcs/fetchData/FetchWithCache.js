import { setLocalStorage } from "../storage.js";
import { hideLoader, modalAuthorized, showLoader } from "../utils.js";

let isFlag = null
let cacheMap = new Map()
const pendingRequests = new Map();

const safeFetchWithCache = async (url , { maxTime = 5000 ,  showLoaderFlag = true } = {}) => {
    const now = Date.now()
    let cached = cacheMap.get(url)    

    if (cached && now - cached.time < maxTime) {
        return cached.data;
    }

    try {
        if (pendingRequests.has(url)) {
            return pendingRequests.get(url);
        }
        
        if (showLoaderFlag) showLoader();
        const fetchPromise = fetch(url, { credentials: 'include' })
            .then(async (res) => {

                if (res.status === 401) {
                    if (!isFlag) {
                        modalAuthorized()    
                        isFlag = true
                    }

                    setLocalStorage('isAuthorized' , false)               
                    throw new Error('دسترسی غیر مجاز - توکن معتر نمیباشد')   
                }
                
                if (!res.ok) throw new Error("خطا در fetch");
                return res.json();
            })
            .then((data) => {
                cacheMap.set(url, { data, time: Date.now() });
                pendingRequests.delete(url);
                return data;
            })
            .catch((err) => {
                pendingRequests.delete(url);
                console.error("❌ خطا:", url, err);
                return null;
            })
            .finally(() => {
                if (showLoaderFlag) hideLoader();
            })

        pendingRequests.set(url, fetchPromise);

        const data = await fetchPromise;
        return data;
        
    } catch (error) {
        console.error("❌ خطا در دریافت از:", url, error);
        return null;
    }
}

function updateCache(url , newData) { 
  cacheMap.set(url , {data: newData , time: Date.now()})  
}

function clearCache(url) {
  cacheMap.delete(url);
}

export { safeFetchWithCache , updateCache , clearCache}
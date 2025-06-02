let cacheMap = new Map()
const pendingRequests = new Map();

const safeFetchWithCache = async (url , { maxTime = 5000} = {}) => {
    const now = Date.now()
    let cached = cacheMap.get(url)    

    if (cached && now - cached.time < maxTime) {
        return cached.data;
    }

    try {
        if (pendingRequests.has(url)) {
            return pendingRequests.get(url);
        }

        const fetchPromise = fetch(url, { credentials: 'include' })
            .then((res) => {
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
            });

        pendingRequests.set(url, fetchPromise);
        return fetchPromise;
        
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
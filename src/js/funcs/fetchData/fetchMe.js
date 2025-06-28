let cacheMe = null
let cacheMeTime = null

const getDataMe = async () => {
    const now = Date.now()

    if (cacheMe && cacheMeTime &&  (now - cacheMeTime < 5000)) {
        return cacheMe;
    }

    try {
        const response = await fetch('https://onlineshope.onrender.com/api/user/me' , {
            credentials: 'include'
        })

        if (response.status === 401) {
            window.location.href = '/login.html';
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()    
        cacheMe = data
        cacheMeTime = now
        return cacheMe
        
    } catch (error) {
        console.error('Error fetching user data:', error);
        return false;
    }
    
}

export default getDataMe
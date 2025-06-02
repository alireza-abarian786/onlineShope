const checkLoginStatus = async () => {
    try {
        const resUser = await fetch("https://onlineshope.onrender.com/api/user/me" , {
            method: 'GET',
            credentials: 'include'
        })
    
        if (!resUser.ok) {
          throw new Error("Not logged in");  
        }
    
        const dataUser = await resUser.json()
        console.log(dataUser);
        

        return dataUser;

    } catch (error) {
        console.error("User not logged in");
        return null
    }
}

export { checkLoginStatus }
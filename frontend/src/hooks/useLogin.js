import { useAuthContext } from "../context/AuthContext.jsx"

const useLogin = () => {
    const {setAuthUser} = useAuthContext();
    
    const login = async (username, password) => {

        const success = handleInputErrors({username, password})
        if (!success) return;
        
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, password})
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("foodwars", JSON.stringify(data))
            setAuthUser(data)
        } catch (error) {
            console.log(error.message)  
        
    }
}
return { login }
}

export default useLogin;

function handleInputErrors({username, password}) {
    if(!username || !password) {
        console.log("Please fill in all fields")
        return false
    }
    
    return true
}
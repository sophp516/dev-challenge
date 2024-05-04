import { useAuthContext } from "../context/AuthContext.jsx";

const useSignup = () => {
const {setAuthUser} = useAuthContext()

    const signup = async ({username, password, confirmPassword}) => {
        const success = handleInputErrors({username, password, confirmPassword})
        if (!success) return

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({username, password, confirmPassword})
            })

            const data = await res.json()
            if(data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("foodwars", JSON.stringify(data))
            setAuthUser(data)

        } catch(error) {
            console.log(error.message)
        } 
    }
    return { signup }
}

export default useSignup;

function handleInputErrors({username, password, confirmPassword}) {
    if(!username || !password || !confirmPassword) {
        console.log("Please fill in all fields")
        return false
    }

    if (password !== confirmPassword) {
        console.log("passwords do not match")
        return false
    }

    if (password.length < 6) {
        console.log("Password must be at least 6 characters")
        return false
    }
    return true
}
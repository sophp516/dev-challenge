import { useAuthContext } from "../context/AuthContext.jsx";

const useLogout = () => {
    const {setAuthUser} = useAuthContext()
    const logout = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.removeItem("foodwars");
            setAuthUser(null);

        } catch (err) {
            console.log(err);
        }
    }
    return { logout };
}

export default useLogout;

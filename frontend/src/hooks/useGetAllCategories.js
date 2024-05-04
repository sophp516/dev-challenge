import { useEffect, useState } from "react"

const useGetAllCategories = () => {
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const res = await fetch('/api/recipe/getallcategories');
                const data = await res.json();
                if (data.error) throw new Error(data.error)
                setAllCategories(data);
            } catch (err) {
                console.log(err)
            }
        }
        getAllCategories();
    }, [])
    return {allCategories}
}

export default useGetAllCategories;

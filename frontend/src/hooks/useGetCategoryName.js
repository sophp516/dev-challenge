import { useState, useEffect } from "react"

const useGetCategoryName = () => {
    const [categoryName, setCategoryName] = useState('')
    useEffect(() => {
        const getCategoryName = async () => {
            try {
                const res = await fetch('/api/recipe/getcategoryname')
                const data = await res.json();

                if (data.err) throw new Error(data.error)
                setCategoryName(data);
            } catch (err) {
                console.log(err)
            }
        }
        getCategoryName();
    }, [])
    return { categoryName };
}

export default useGetCategoryName;

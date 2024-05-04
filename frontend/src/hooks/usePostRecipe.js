

const usePost = () => {
    const postHook = async ({recipeName, recipeDescription, ingredient, imageSrc, recipeMain, ranking, category, nutrient}) => {
        try {
            const res = await fetch("/api/recipe/post", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({recipeName, recipeDescription, ingredient, imageSrc, recipeMain, ranking, category, nutrient}),
                credentials: 'include'
            })
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error)
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    return { postHook }
}

export default usePost;
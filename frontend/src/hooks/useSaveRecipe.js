const useSaveRecipe = () => {

    const saveRecipe = async (recipeId) => {
        try {
            const res = await fetch ('/api/user/saverecipe', {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({recipeId}),
            })
            const data = await res.json();
            if (data.error) throw new Error(data.error);

        } catch (err) {
            console.log(err);
        }
    } 
    return { saveRecipe }
}

export default useSaveRecipe;

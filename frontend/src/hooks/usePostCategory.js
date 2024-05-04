const usePostCategory = () => {
    const postCategory = async(newCategory) => {
        try {
            const res = await fetch('/api/recipe/postcategoryname', {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({newCategory}),
                credentials: 'include'
            });
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error)
            }

        } catch (err) {
            console.log(err);
        }
    }
    return { postCategory }
}

export default usePostCategory;
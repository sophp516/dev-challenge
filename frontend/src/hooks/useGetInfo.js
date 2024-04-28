import { useEffect, useState } from 'react';

const useGetInfo = () => {
    const getInfo = async (ingredientList) => {
        try {
            const response = await fetch(`https://api.spoonacular.com/food/ingredients/glycemicLoad?apiKey=619ae524e94941c78ce0e22b8b11c465`, {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ ingredients: ingredientList })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data.totalGlycemicLoad;

        } catch (error) {
            console.log(error.message);
        }
    }

    return { getInfo }
}

export default useGetInfo;

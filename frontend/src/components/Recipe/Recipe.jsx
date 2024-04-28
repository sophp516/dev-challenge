import { useState, useEffect } from 'react';
import './Recipe.css';

const Recipe = (props) => {
    const [recipeData, setRecipeData] = useState({});
    const [unfoldRecipe, setUnfoldRecipe] = useState(false);

    useEffect(() => {
        setRecipeData(props.recipe)
    }, [props.recipe])

    const RecipeMain = () => {

        if (!recipeData.recipeMain) {
            return null;
        }

        return (
            recipeData.recipeMain.map((order, i) => (
                <div className="recipe-order-text-num" key={i}>
                    <div className="recipe-order-num">{i + 1}</div> <span className="recipe-order-span">{order}</span>
                </div>
            ))
        );
    };

    const IngredientList = () => {
        if (!recipeData.ingredient) {
            return null;
        }
        return (
            recipeData.ingredient.map((item, idx) => {
               if (idx < 2) {
                return <span className="ingredient-span" key={idx}>{item},</span>
               } else if (idx == 2) {
                return <span className="ingredient-span" key={idx}>{item}...</span>
               }
            })
        )
    }

    const handleClick = () => {
        setUnfoldRecipe(!unfoldRecipe);
    }

    return (
        <div>
            <div className="recipe-card">
                <img className="recipe-img" src={recipeData.imagesrc} />
                <div className="recipe-detail">
                    <div className="recipe-header">
                        <p className="recipe-date">{recipeData.date}</p>
                        <p className="recipe-category"><IngredientList/></p>
                    </div>
                    <div className="recipe-main">
                        <div className="recipe-name-ranking-div">
                            <p className="recipe-name">{recipeData.recipeName}</p>
                            <div className="recipe-ranking">{recipeData.ranking}</div>
                        </div>
                        <div className="recipe-description">
                            <p>{recipeData.description}</p>
                        </div>
                        <div className="name-and-unfold">
                            <p>{recipeData.author}</p>
                            <button className="unfold-button" onClick={handleClick}>{unfoldRecipe ? <i className="pi pi-angle pi-angle-up"></i>: <i className="pi pi-angle pi-angle-down" ></i>}</button>
                        </div>
                    </div>
                </div>
            </div>
            {unfoldRecipe ? 
                <div className="recipe-main-fold">
                    <RecipeMain />
                </div>
                : <></>}
        </div>
    )
}

export default Recipe;

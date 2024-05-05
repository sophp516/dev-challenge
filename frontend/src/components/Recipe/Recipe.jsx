import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSaveRecipe from '../../hooks/useSaveRecipe.js';
import useGetFavorites from '../../hooks/useGetFavorites.js';
import './Recipe.css';

const Recipe = (props) => {
    const [recipeData, setRecipeData] = useState({});
    const [unfoldRecipe, setUnfoldRecipe] = useState(false);
    const { saveRecipe } = useSaveRecipe();
    const navigateTo = useNavigate();
    const { favorites } = useGetFavorites();

    

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

    const formatDate = (timestamp) => {
        const dateObj = new Date(timestamp);
        const month = dateObj.getMonth() + 1; // Months are zero-based, so add 1
        const date = dateObj.getDate();
        const year = dateObj.getFullYear();
        const formattedDate = `${month}/${date}/${year}`;
        return formattedDate;
    }

    const IngredientList = () => {
        if (!recipeData.ingredient) {
            return null;
        }
        return (
            recipeData.ingredient.map((item, idx) => {
               if (idx == recipeData.ingredient.length - 1) {
                return <span className="ingredient-span" key={idx}>{item}</span>
               } else if (idx < 4) {
                return <span className="ingredient-span" key={idx}>{item}, </span>
               }
            })
        )
    }

    const handleClick = () => {
        setUnfoldRecipe(!unfoldRecipe);
    }

    const saveClick = async () => {
        await saveRecipe(recipeData._id);
        navigateTo("/home");
    }


    return (
        <div>
            <div className="recipe-card">
            <div className="image-container">
                <img className={recipeData.imageSrc === '' ? "recipe-img with-border" : "recipe-img"} src={recipeData.imageSrc === '' ? 'src/assets/default3.jpeg' : recipeData.imageSrc} alt="Recipe" />
                <p className="text-overlay">{recipeData.likes} people saved</p>
            </div>
                <div className="recipe-detail">
                    <div className="recipe-header-button">
                        <div className="recipe-header">
                            <p className="recipe-date">{formatDate(recipeData.createdAt)}</p>
                            <p className="recipe-category"><IngredientList/></p>
                        </div>
                        <div className="save-button-container">
                        {props.favorites ? ( // Conditional rendering based on isSaved state
                                <p id="saved-text">Saved</p>
                            ) : (
                                <button onClick={saveClick} id="save-button">Save</button>
                            )}
                        </div>
                    </div>
                    <div className="recipe-main">
                        <div className="recipe-name-ranking-div">
                            <p className="recipe-name">{recipeData.recipeName}</p>
                            <div className="recipe-ranking">{recipeData.ranking}</div>
                        </div>
                        <div className="recipe-description">
                            <p>{recipeData.recipeDescription}</p>
                        </div>
                        <div className="name-and-unfold">
                            <p>{recipeData.posterName}</p>
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

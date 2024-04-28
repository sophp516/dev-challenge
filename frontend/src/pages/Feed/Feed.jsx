import { useEffect, useState } from 'react';
import Recipe from '../../components/Recipe/Recipe';
import Navbar from '../../components/Navbar/Navbar';
import './Feed.css';

const Feed = (props) => {
    const [recipeList, setRecipeList] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        setRecipeList(props.recipeList);
    }, [props.recipeList])

    const selectRecipe = (recipe) => {
        setSelectedRecipe(recipe);
    }
    
    return (
        <div className="feed">
            <Navbar />
            <div className="feed-inner-container">
                {recipeList && recipeList.map((recipe, idx) => {
                    return (
                        <Recipe 
                            recipe={recipe}
                            key={idx}
                            idx={idx}
                            setSelectedRecipe={setSelectedRecipe} 
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Feed;

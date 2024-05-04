import { useState, useEffect } from 'react';
import Recipe from '../../components/Recipe/Recipe';
import Navbar from '../../components/Navbar/Navbar';
import { useQuery } from 'react-query';
import './Feed.css';

const fetchAllPosts = async () => {
    const res = await fetch('/api/recipe/getallposts');
    const data = await res.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data;
}

const Feed = (props) => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [saveTrigger, setSaveTrigger] = useState(false)

    const { data: allPosts, status } = useQuery('allPosts', fetchAllPosts);

    const selectRecipe = (recipe) => {
        setSelectedRecipe(recipe);
    }

    const setSave = () => {
        setSaveTrigger(true);
    }

    useEffect(() => {
        if (props.favorites) {
            setFavoriteRecipes((props.favorites).map((item) => item._id))
        }
    }, [props.favorites])

    if (status === 'loading') return <div className="loading">Loading...</div>;
    if (status === 'error') return <div>Error fetching data</div>;

    return (
        <div className="feed">
            <Navbar />
            <div className="feed-inner-container">
                {allPosts && allPosts.map((recipe, idx) => {
                    let favoriteBoolean;
                    if (favoriteRecipes && favoriteRecipes.includes(recipe._id)) {
                        favoriteBoolean = true
                    } else {
                        favoriteBoolean = false;
                    }
                    return (
                        <Recipe 
                            recipe={recipe}
                            favorites={favoriteBoolean}
                            key={idx}
                            idx={idx}
                            setSelectedRecipe={setSelectedRecipe}
                            setSave={setSave} 
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Feed;
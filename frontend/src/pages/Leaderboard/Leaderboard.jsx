import { useState, useEffect } from 'react';
import Recipe from "../../components/Recipe/Recipe.jsx";
import Navbar from '../../components/Navbar/Navbar.jsx';
import { useQuery } from 'react-query';
import './Leaderboard.css'

const fetchAllCategories = async () => {
    const res = await fetch('/api/recipe/getallcategories');
    const data = await res.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data;
};

const Leaderboard = (props) => {

    const { data: allCategories, status } = useQuery('allCategories', fetchAllCategories); // Fetch categories using useQuery
    const [ topRecipes, setTopRecipes ] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        if (allCategories) {
            const categoryRecipes = allCategories.map(category => category.categoryRecipes).flat();
            const sortedCategories = [...categoryRecipes].sort((a, b) => a.nutrient - b.nutrient);
            setTopRecipes(sortedCategories);
        }
    }, [allCategories])

    useEffect(() => {
        setName(props.categoryName)
    }, [props.categoryName])


    return (
        <div className="leaderboard">
            <Navbar />
            <div className="leaderboard-inner">
            <div className="leaderboard-header">
                <p>{"Today's"} top 100 recipes: <span>{name}</span></p>
            </div>
            { status === 'loading' ?
            <div className='loading'>loading...</div>
            : topRecipes?.map((recipe, i) => {
                return (
                    <div key={i} className="rank-recipe-container">
                        {/* <div className="leaderboard-rank">{i+1}</div> */}
                        <Recipe 
                        recipe={recipe}
                        />
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default Leaderboard;

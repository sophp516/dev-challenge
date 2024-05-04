import Navbar from "../../components/Navbar/Navbar";
import useGetFavorites from "../../hooks/useGetFavorites.js";
import DraggableComponent from "../../components/DraggableComponent/DraggableComponent.jsx";
import DroppableComponent from "../../components/DroppableComponent/DroppableComponent.jsx";
import './Home.css'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from "react-dnd";
import { useState } from "react";


const Home = () => {
    const { favorites } = useGetFavorites();
    const [meals, setMeals] = useState([])

    return (
        <div className="home">
            <DndProvider backend={HTML5Backend} >
            <Navbar />
            <div className="droppable-container">
                <DroppableComponent
                    meal={meals[0]} setMeals={setMeals} index={0} meals={meals}/>
                <DroppableComponent 
                    meal={meals[1]} setMeals={setMeals} index={1} meals={meals}/>
                <DroppableComponent 
                    meal={meals[2]} setMeals={setMeals} index={2} meals={meals} />
            </div>
            <div className="draggable-container">
                <h3>Saved Recipes:</h3>
                {favorites.favoriteRecipe && favorites.favoriteRecipe.map((recipe, i) => {
                    return (
                        <DraggableComponent 
                        recipe={recipe} 
                        key={i}
                        />
                    )
                })}
            </div>
            </DndProvider>
        </div>
    )
}

export default Home;

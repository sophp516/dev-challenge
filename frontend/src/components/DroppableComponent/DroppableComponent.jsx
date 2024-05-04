import { useDrop } from 'react-dnd';
import './Droppable.css'

const DroppableComponent = ({ meals, setMeals, index }) => {
    let whichMeal;
    if (index === 1) {
        whichMeal = 'lunch'
    } else if (index === 2) {
        whichMeal = 'dinner'
    } else if (index == 0) {
        whichMeal = 'breakfast';
    }
    const [{ isOver, }, drop] = useDrop(() => ({
        accept: 'RECIPE',
        drop: (item) => {
            const recipeName = item.passed.recipeName;
            setMeals(prevMeals => {
                const newMeals = [...prevMeals]; // Create a copy of the meals array
                newMeals[index] = recipeName; // Append the dragged recipe to the existing array or create a new array if it doesn't exist
                return newMeals; // Update the state with the modified meals array
            });
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))
    return (
        <div ref={drop} 
            className="droppable-component"
            style={{ border: isOver ? '2px solid orange' : '' }}>
            <div className="whichMeal">{whichMeal}</div>
            <p>{meals[index]}</p>
        </div>
    )
}

export default DroppableComponent;
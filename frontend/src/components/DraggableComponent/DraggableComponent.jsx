import { DndProvider, useDrag, useDrop } from 'react-dnd';
import './Draggable.css'

const DraggableComponent = (props) => {
    const passed = props.recipe;
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
      type: 'RECIPE',
      item: { passed },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
    console.log(props.recipe.recipeName)
    return (
        <div className="draggable" ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div className="draggable-inner" ref={drag}>
                <p>{props.recipe.recipeName}</p>
            </div>
        </div>
    )
}

export default DraggableComponent;

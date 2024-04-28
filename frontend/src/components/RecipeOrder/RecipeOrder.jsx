import { useEffect, useState } from "react";
import './RecipeOrder.css'

const RecipeOrder = (props) => {
    const [text, setText] = useState('');
    const [idx, setIdx] = useState(-1);
    const [editIdx, setEditIdx] = useState(-2);
    const [input, setInput] = useState('');

    const handleEditIndex = (i) => {
        props.handleEditIndex(i);
    }

    const handleSave = () => {
        props.handleSave(idx, input);
        handleEditIndex(-2);
        setInput('');
    }

    const handleEditButtonClick = (e) => {
        e.stopPropagation();
        handleEditIndex(idx);
    };

    const handleChange = (event) => {
        setInput(event.target.value);
    }

    useEffect(() => {
        setText(props.text);
        setIdx(props.idx);
        setEditIdx(props.editIdx);
    }, [props.text, props.idx, props.editIdx])

    return (
        <>
        {idx != editIdx ?
        <div className="order">
            <div className="order-idx">{idx + 1}</div>
            <div className="order-text">{text}</div>
            <button onClick={handleEditButtonClick} className="order-edit">edit</button>
        </div>
        : 
        <div className="order">
            <div className="order-idx">{idx + 1}</div>
            <textarea value={input} onChange={handleChange} className="order-text-input"></textarea>
            <button onClick={handleSave} className="order-edit">save</button>
        </div>
    }
    </>
    )
}

export default RecipeOrder;

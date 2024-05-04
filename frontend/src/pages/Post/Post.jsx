import { NavLink, useNavigate} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import 'primeicons/primeicons.css';
import './Post.css';
import RecipeOrder from "../../components/RecipeOrder/RecipeOrder.jsx";
import useGetInfo from "../../hooks/useGetInfo.js";
import usePost from "../../hooks/usePostRecipe.js";


const Post = (props) => {

    const [input, setInput] = useState({
        recipeName: '',
        recipeDescription: '',
        ingredient: [],
        imageSrc: '',
        recipeMain: [],
    })

    const { postHook } = usePost();
    const [isCategory, setIsCategory] = useState(false);

    const [submitState, setSubmitState] = useState(false);
    const [editIdx, setEditIdx] = useState(-2);
    const [selectedImage, setSelectedImage] = useState(null);
    const [firstPage, setFirstPage] = useState(true);
    const navigateTo = useNavigate();
    const inputRef = useRef(null);
    const [ingredientChange, setIngredientChange] = useState('');
    // const [ingredientMatches, setIngredientMatches] = useState([]);
    const [ingredientBubblesClick, setIngredientBubblesClick] = useState(false);
    const { getInfo } = useGetInfo();


    /* const handleIngredientClick = async () => {
        if (ingredientChange.trim() !== '') { // Check if ingredient is not empty
            
            const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=619ae524e94941c78ce0e22b8b11c465&query=${ingredientChange}&number=5&sortDirection=desc`);
            const data = await response.json();
            console.log(data)
            const potentialMatch = data.results;
            //const potentialMatch = [{id: 1, name:"banana"}]
            setIngredientMatches(potentialMatch);
            setIngredientBubblesClick(true); 

            setIngredientChange('');
        }
    } */

    const handleCheckboxChange = (e) => {
        setIsCategory(e.target.checked);
    };

    const handleEditIndex = (i) => {
        setEditIdx(i);
    }

/*     const IngredientBubbles = () => {
        return (
            <>
            {ingredientMatches.map((item) => (
                <p
                    className="ingredientBubble"
                    onClick={() => handleClickIngredientid(item.name)}
                    key={item.id}
                >
                    <span className="bubble-text">{item.name}</span>
                </p>
            ))}
        </>
        )
    } */

    const handleSave = (idx, newValue) => {
        const updatedRecipeMain = [...input.recipeMain];
        updatedRecipeMain[idx] = newValue;
        setInput((prevInput) => ({ ...prevInput, recipeMain: updatedRecipeMain }));
        handleEditIndex(-2);
    }

    const handleClickIngredient = () => {
        const updatedIngredient = [...input.ingredient, ingredientChange];
        setInput((prevInput) => ({...prevInput, ingredient: updatedIngredient}));
        setIngredientBubblesClick(false)
        setIngredientChange('');
    }

    const handleRecipeOrder = () => {
        const inputValue = inputRef.current.value.trim();
        if (inputValue !== '') {
            const newRecipeMain = [...input.recipeMain, inputValue]
            setInput((prevInput) => ({...prevInput, recipeMain: newRecipeMain}))
        }
        inputRef.current.value = '';
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({...prevInput, [name]: value}))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = () => {
            const imageData = reader.result;
            setInput((prevInput) => ({ ...prevInput, imageSrc: imageData}))
        };
        reader.readAsDataURL(file);
    };

    const recipeSubmit = async () => {
        const nutrient = await getInfo(input.ingredient);
        let alphabetRanking;
        if (nutrient < 5) {
            alphabetRanking = "A+";
        } else if (nutrient < 7) {
            alphabetRanking = "A";
        } else if (nutrient < 10) {
            alphabetRanking = "B";
        } else if (nutrient < 15) {
            alphabetRanking = "C";
        } else if (nutrient < 20) {
            alphabetRanking = "D";
        } else {
            alphabetRanking = "F";
        }
        // setInput((prevInput) => ({...prevInput, ranking: alphabetRanking}));
        const newRecipeFinal = ({...input, ranking: alphabetRanking, nutrient, category: isCategory})
        console.log(newRecipeFinal);
        await postHook(newRecipeFinal);
        //props.addRecipe(newRecipeFinal)
        setSubmitState(!submitState);
        navigateTo('/');
    }

    const handleChangeIngredient = (e) => {
        setIngredientChange(e.target.value);
    }

    const handleTogglePage = () => {
        setFirstPage(!firstPage);
    }

    return (
        <div className="post-main-container">
            <Navbar />
            <div className="post-container">
            {firstPage ? 
            <div className="post-inner-container">
                <NavLink to="/"><i className="pi pi-chevron-left"></i></NavLink>
                     
                    <div>
                        <div>
                        <div className="category-div">
                            <p>Does it fulfill {"today's"} theme?</p>
                            <input
                                type="checkbox"
                                id="categoryCheckbox"
                                name="category"
                                checked={isCategory}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                            <div>
                                <p>Choose a picture to show off your recipe!</p>
                                <input className="imageSrc" type="file" onChange={handleImageChange} />
                            </div>
                            <p>Give a name to your recipe: </p>
                            <input placeholder="e.g. my secret recipe" className="input-name" name="recipeName" value={input.recipeName} type="text" onChange={handleChange} />
                        </div>
                        <div>
                            <p>What ingredients do you need for your recipe?</p>
                            <p><span className="post-ingredient-span">ingredients: </span>{input.ingredient.map((item, idx) => <span key={idx} className="post-list-span">{item}, </span>)}</p>
                            <input placeholder="specify the amount (e.g. 2 cups rice)" className="input-ingredient" name="ingredient" value={ingredientChange} type="text" onChange={handleChangeIngredient} />
                            <button className="ingredient-button" onClick={handleClickIngredient}>+</button>
                        </div>
                        <div>
                            <input placeholder="add a description" className="input-description" name="recipeDescription" value={input.recipeDescription} type="textarea" onChange={handleChange} />
                        </div>
                        <div className="post-button-container">
                            <button onClick={handleTogglePage}>next</button>
                        </div>
                    </div>
                    
                </div> 
                :
                <div className="post-inner-container">
                <div>
                    <i className="pi pi-chevron-left" onClick={handleTogglePage}></i>
                </div>
                    <div>
                        {input.recipeMain.length > 0 && input.recipeMain.map((step, i) => 
                            <RecipeOrder key={i} 
                                editIdx={editIdx} 
                                handleEditIndex={handleEditIndex} 
                                text={step} 
                                handleSave={handleSave}
                                idx={i}/>)}
                        <div className="post-order-div">
                            <span className="post-idx">{input.recipeMain.length + 1}</span>
                            <textarea className="post-input" ref={inputRef}></textarea>
                            <button className="post-add" onClick={handleRecipeOrder}>+</button>
                        </div>
                        <div className="post-button-container">
                            <button onClick={recipeSubmit}>post</button>
                        </div>
                    </div>
                </div> }
            </div>
        </div>
    )
}

export default Post;

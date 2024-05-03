import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
    recipeName: {
        type: String,
        required: true, 
    },
    recipeDescription: {
        type: String,
        required: true,
    },
    ingredient: {
        type: [String],
        required: true,
    },
    recipeMain: {
        type: [String],
        required: true
    },
    imageSrc: {
        type: String,
        default: '',
    },
    ranking: {
        type: String,
        required: true,
    },
    nutrient: {
        type: Number,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    posterId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }, 
    posterName: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;

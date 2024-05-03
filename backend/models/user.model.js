import { mongoose } from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    favoriteRecipe: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
    }], 
    todaysMeal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        default: null,
    },
    profilePic: {
        type: String,
        default: '',
    },
    quote: {
        type: String,
        default: ''
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;

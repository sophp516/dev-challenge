import User from "../models/user.model.js";
import newtoken from "../utils/token.js";
import bcrypt from 'bcrypt';

/* username: {
    type: String,
    required: true,
    unique: true
}, 
password: {
    type: String,
    required: true,
    minlength: 6,
},
favoriteRecipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    default: [],
}, 
todaysMeal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    default: [],
},
profilePic: {
        type: String,
        default: '',
},
quote: {
    type: String,
    default: ''
} */
export const signup = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords do not match"});
        }

        const user = await User.findOne({username})
        if (user) return res.status(400).json({error: "Username already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newuser = new User({
            username,
            password: hashedPassword
        })

        if (newuser) {
            newtoken(newuser._id, res);
            await newuser.save();
            res.status(201).json({ _id: newuser._id, username: newuser.username })
        } else {
            res.status(400).json({error: "Invalid user data"})
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: "Internal server error"});
    }
}

//router.post("login", login)
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({username});
        if (!user) return res.status(400).json({error: "User not found"});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid credentials"})
        }

        newtoken(user._id, res)
        res.status(200).json({
            _id: user._id,
            username: user.username,
        })

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error"})
    }

}

//router.post("logout", logout);
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logged out successfully"})
    } catch(err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"})
    }
}
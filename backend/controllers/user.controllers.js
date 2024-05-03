import User from "../models/user.model.js";
import Recipe from "../models/recipe.model.js";

export const saveRecipe = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) return res.status(200).json({ error: "user not found" });
        if (user.favoriteRecipe.includes(recipeId)) {
            return res.status(400).json({ error: "Recipe already in favorites" });
        }

        user.favoriteRecipe.push(recipeId);
        await user.save();



        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        recipe.likes += 1;
        await recipe.save();
        return res.status(200).json({ message: "Recipe saved successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getFavorites = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('favoriteRecipe');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const favoriteRecipe = user.favoriteRecipe;
        return res.status(200).json({ favoriteRecipe });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" });
    }
}
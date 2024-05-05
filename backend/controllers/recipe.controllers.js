import Recipe from "../models/recipe.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";
import CategoryName from "../models/categoryName.model.js";

/* recipeName: {
    type: String,
    required: true, 
},
recipeDescription: {
    type: String,
    required: true,
},
ingredient: {
    type: String,
    required: true,
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
category: {
    type: Boolean,
    required: true,
},
likes: {
    type: Number,
    default: 0,
} */
export const post = async (req, res) => {
    try {
        const {recipeName, recipeDescription, recipeMain, ingredient, imageSrc, ranking, nutrient, category} = req.body;
        const posterId = req.user._id

        if (!recipeName || !ingredient || !ranking || !recipeMain) {
            return res.status(200).json({ error: "missing elements" });
        }

        const usernameFind = await User.findById(req.user._id);

        const newRecipe = new Recipe({
            recipeName,
            recipeDescription,
            recipeMain,
            ingredient,
            imageSrc,
            ranking,
            nutrient,
            likes: 0,
            posterId, // Assign the userId from req.user
            posterName: usernameFind.username,
        })

        console.log("New Recipe Object:", newRecipe);
        
        try {
            await newRecipe.save();
            console.log("Saved Recipe:", newRecipe);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Error saving recipe" });
        }

        // if recipe adheres to category
        if (category) {
            const categoryRef = await Category.findOne(); // find the single category
            if (!categoryRef) {
                // Create the category if it doesn't exist (should only happen once)
                const newCategory = new Category({ categoryRecipes: [newRecipe._id] });
                await newCategory.save();
            } else {
                // Update the existing category
                categoryRef.categoryRecipes.push(newRecipe._id);
                await categoryRef.save();
            }
        }
        res.status(201).json(newRecipe);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: "Internal server error"})
    }
}

export const getallposts = async (req, res) => {
    try {
        const allposts = await Recipe.find();

        if (!allposts) {
            return res.status(200).json([]);
        }
        return res.status(200).json(allposts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getallcategories = async (req, res) => {
    try {
        // populate id references
        const allcategories = await Category.find().populate('categoryRecipes');

        if (!allcategories || allcategories.length === 0) return res.status(200).json([]);
        return res.status(200).json(allcategories)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const postCategoryName = async (req, res) => {
    try {
        const { newCategory } = req.body;
        const categoryName = await CategoryName.findOne();
        
        // initialize category
        if (!categoryName) {
            const categoryName = new CategoryName({ categoryDaily: newCategory });
            await categoryName.save();
            res.status(201).json({ message: "Category name created successfully", category: categoryName });
        // or update category
        } else {
            categoryName.categoryDaily = newCategory;
            await categoryName.save();
            res.status(200).json({ message: "Category name updated successfully", category: categoryName });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getCategoryName = async (req, res) => {
    try {
        const categoryName = await CategoryName.findOne();

        if (!categoryName) return res.status(500).json({ message: "Category does not exist" });
        return res.status(200).json(categoryName);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteAllCategories = async (req, res) => {
    try {
      // use Mongoose to delete all documents from the Category collection
      await Category.deleteMany();
  
      // if successful
      return res.status(200).json({ message: "All categories deleted successfully" });
    } catch (err) {
      // if an error occurs
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
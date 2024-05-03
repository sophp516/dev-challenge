import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    categoryRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
})

const Category = mongoose.model("Category", categorySchema);

export default Category;

import mongoose from 'mongoose';

const categoryNameSchema = mongoose.Schema({
    categoryDaily: { 
        type: String, 
    },
})

const CategoryName = mongoose.model("CategoryName", categoryNameSchema);

export default CategoryName;

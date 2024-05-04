import express from 'express';
import { deleteAllCategories, post, getallposts, getallcategories, postCategoryName, getCategoryName } from '../controllers/recipe.controllers.js';
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/post", protectRoute, post);

router.get("/getallposts", protectRoute, getallposts);

router.get("/getallcategories", protectRoute, getallcategories);

router.post("/postcategoryname", protectRoute, postCategoryName);

router.get("/getcategoryname", protectRoute, getCategoryName);

router.delete("/reset", protectRoute, deleteAllCategories);


export default router;
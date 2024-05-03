import express from 'express';
import protectRoute from "../middleware/protectRoute.js";
import { saveRecipe, getFavorites } from '../controllers/user.controllers.js';

const router = express.Router();

// saveRecipe
router.post("/saverecipe", protectRoute, saveRecipe);

//getFavorites
router.get("/getfavorites", protectRoute, getFavorites);


export default router;

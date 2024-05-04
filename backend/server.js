import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import recipeRoutes from "./routes/recipe.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/mongodb.js";
import cookieParser from "cookie-parser";
import path from 'path';


const app = express();
const PORT = process.env.PORT || 8083;

const __dirname = path.resolve();

dotenv.config();

// file size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json()); // parse incoming requests with JSON
app.use(cookieParser());


app.use("/api/recipe", recipeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`)
})
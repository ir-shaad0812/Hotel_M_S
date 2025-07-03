import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectToDb } from "./src/config/db.js";
import authRoutes from "./src/routes/User.js"

dotenv.config();

//Db:
connectToDb();

const app = express()
app.use(express.json());
app.use (cors());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    console.log("Welcome  ");
    
});

// Routes
app.use("/auth/api", authRoutes);

app.listen(PORT, ()  =>{
    console.log(`Server is running on PORT $ {PORT}`);
    

})
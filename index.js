import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from "cors"
import movieRoutes from "./Routes/movieRoutes.js";
import authRoutes from "./Routes/authRoutes.js";



const app = express();
app.use(express.json())
dotenv.config();
app.use(cors())



app.get("/", (req, res) => {
    res.send("Working...")

})
app.use("/api", movieRoutes);
app.use("/auth", authRoutes);

 









mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to DB...")
})

app.listen(8000, () => {
    console.log("Listening on port 8000")
})
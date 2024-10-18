import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});

app.get("/", (req, res) => {
    res.send("Welcome to the project");
})

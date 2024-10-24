import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 5000;


//intialization.
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});


//home page, root endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the project");
})


//creating a route for enabling the user to create a new product.
app.post("/products", async (req, res) => {

    const user_product = req.body;

    if (!user_product.name || !user_product.price || !user_product.image) {
        res.status(400).json({ success: false, message: "all the fields are mandatory..." });
    }

    const newProduct = new Product(user_product); //i just created an instance here.

    try {
        await newProduct.save(); //saving the doc to the db.
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("error: ", error.message);
        res.status(500).json({ success: false, message: "internal server error" });
    }
})

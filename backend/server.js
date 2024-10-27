import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"; 
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT; //though it's getting exposed on terminal


//home page, root endpoint
app.get("/", (req, res) => {
    res.send("Welcome to the project");
})

//route to get all products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("error in getting all the products: ", error.message);
        res.status(500).json( {success: false, message: "internal server error"} );
    }
})

//creating a route for enabling the user to create a new product.
app.post("/api/products", async (req, res) => {

    const user_product = req.body;

    if (!user_product.name || !user_product.price || !user_product.image) {
        res.status(400).json({ success: false, message: "all the fields are mandatory..." });
    }

    const newProduct = new Product(user_product); //i just created an instance here(OOPs).

    try {
        await newProduct.save(); //saving the doc to the db.
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("error in creating the product: ", error.message);
        res.status(500).json({ success: false, message: "internal server error" });
    }
})

//route to update the product
app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id: ", id)
    const product = req.body; //contains the info required to update

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); //returns the product once it is updated ---> "{ new: true }"
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        if (!mongoose.Types.ObjectId.isValid(id)) { //used to check whether the object id is valid
            res.status(404).json({ success: false, message: "product not found" });
        }
        console.error("error in updating the product: ", error.message);
        res.status(500).json({ success: false, message: "internal server error" });
    }
})

//route for deleting a product
app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id: ", id);

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "product deleted successfully" });
    } catch (error) {
        if (!mongoose.Types.ObjectId.isValid(id)) { //used to check whether the object id is valid
            res.status(404).json({ success: false, message: "product not found" });
        }
        console.error("error in deleting the product: ", error.message);
        res.status(500).json({ success: false, message: "internal server error" }); //status code: server couldn't find the resource
    }
})


//initialization
app.listen(port, () => {
    connectDB();
    console.log(`server started at http://localhost:${port}`);
})
import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, //createdat and updatedat.
    }
);

const Product = mongoose.model("Product", productSchema); //addtional info: mongoose converts the convention for us. 'Product' ---> products.

export default Product;

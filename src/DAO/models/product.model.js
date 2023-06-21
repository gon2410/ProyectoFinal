import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";


const productSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    code: {
        type: String,
        unique: true
    },
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnail: String
})

productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productCollection, productSchema);
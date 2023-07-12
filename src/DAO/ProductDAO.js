import mongoose from "mongoose";
import { productModel } from "./models/product.model.js";

mongoose.connect("mongodb+srv://goonolivera:xyzab3landa@cluster0.rdf8a7f.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then(() => console.log("Database connected."))
.catch(err => console.log(err));

class ProductManager {
    constructor() {
        this.model = productModel;
    }

    async getAllProducts(page, perPage, sort, query) {
        let products;
        try {
            if (sort == "asc") {
                products = await this.model.paginate({category: query || {$exists: true}}, {page: page, limit: perPage, sort: {price: 1}});
            } else if (sort == "desc") {
                products = await this.model.paginate({category: query || {$exists: true}}, {page: page, limit: perPage, sort: {price: -1}});
            } else {
                products = await this.model.paginate({category: query || {$exists: true}}, {page: page, limit: perPage});
            }
        } catch (error) {
            console.log(error);
        }
        
        return products;
    }

    async getProductById(id) {
        let product;
        try {
            product = await this.model.findOne({_id: id});
        } catch (error) {
            console.log(error);
        }

        return product;
    }

    async addProduct(title, author, description, code, price, status, stock, category, thumbnail) {
        let product;
        try {
            product = await this.model.create({title, author, description, code, price, status, stock, category, thumbnail});
        } catch (error) {
            console.log(error);
        }

        return product;
    }

    async updateProduct(id, properties) {
        let product;
        try {
            product = await this.model.updateOne({_id: id}, properties);
        } catch (error) {
            console.log(error);            
        }

        return product;
    }

    async deleteUser(id) {
        try {
            await this.model.deleteOne({_id: id});
        } catch (error) {
            console.log(error);
        }
    }
}

export default ProductManager;
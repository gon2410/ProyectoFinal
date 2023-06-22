import { Router } from "express";
import ProductManager from "../DAO/ProductDAO.js";

const productRouter = Router();
const productManager = new ProductManager();

productRouter.get("/", async (req, res) => {
    let result;
    const perPage = req.query.limit || 10;
    const page = req.query.page || 1;
    const sort = req.query.sort;
    const query = req.query.query;

    try {
        result = await productManager.getAllProducts(page, perPage, sort, query);

        let productsArray = result.docs.map(elem => {
            return {
                id: elem._id,
                title: elem.title,
                author: elem.author,
                price: elem.price,
                description: elem.description,
                stock: elem.stock,
                category: elem.category
            }
        })

        const data =  {
            hasPrevPage: result.hasPrevPage,
            prevPage: result.prevPage,
            hasNextPage: result.hasNextPage,
            nextPage: result.nextPage,
            totalPages: result.totalPages,
            page: result.page,
        }

        let prevLink = data.hasNextPage ? `/api/products/?page=${page-1}&limit=${perPage}&query=${query}&sort=${sort}` : null;
        let nextLink = data.hasNextPage ? `/api/products/?page=${page+1}&limit=${perPage}&query=${query}&sort=${sort}` : null;

        res.send({status: "success", payload: productsArray, totalPages: data.totalPages, prevPage: data.prevPage,
                nextPage: data.nextPage, page: data.page, hasPravePage: data.hasPrevPage, hasNextPage: data.hasNextPage,
                prevLink, nextLink})
    } catch (error) {
        res.status(400).send({status: "error", error: ""})
    }
})

productRouter.get("/:pid", async (req, res) => {
    let product;
    let id = req.params.pid;

    try {
        product = await productManager.getProductById(id);
        res.send({status: "success", payload: product});
    } catch (error) {
        res.status(400).send({status: "error", error: "Product not found."});
    }
})

productRouter.post("/", async (req, res) => {
    let product;
    let {title, author, description, code, price, status, stock, category, thumbnail} = req.body;

    if (!title || !author || !description || !code || !price || !status || !stock || !category) {
        res.send({status: "Error", error: "Invalid parameters."})
    } else {
        try {
            product = await productManager.addProduct(title, author, description, code, price, status, stock, category, thumbnail);
            res.send({status: "success", payload: product});
        } catch (error) {
            res.status(500).send({status: "Error", error: "Incomplete values."})
        }
    }
})

productRouter.put("/:pid", async (req, res) => {
    let id = req.params.pid;
    let {title, author, description, code, price, status, stock, category, thumbnail} = req.body;
    let updatedProduct;
    
    if (!title || !author || !description || !code || !price || !status || !stock || !category) {
        res.send({status: "Error", error: "Invalid parameters."})
    } else {
        try {
            updatedProduct = await productManager.updateProduct(id, {title, author, description, code, price, status, stock, category, thumbnail});
            res.send({status: "success", payload: updatedProduct});
        } catch (error) {
            res.status(500).send({status: "Error", error: "Incomplete values."})
        }
    }
})

productRouter.delete("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        await productManager.deleteUser(id);
        res.send({status: "success", msg: "Produt deleted successfully."})
    } catch (error) {
        res.status(500).send({status: "Error", error: "Something went wrong."});
    }
}) 


export default productRouter;
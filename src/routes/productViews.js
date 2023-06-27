import { Router } from "express";
import ProductManager from "../DAO/ProductDAO.js";
import CartManager from "../DAO/CartDAO.js";


const productViewRouter = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();


productViewRouter.get("/", async (req, res) => {
    let result;
    let cart;
    const perPage = req.query.limit || 10;
    const page = req.query.page || 1;
    const sort = req.query.sort;
    const query = req.query.query;

    try {
        result = await productManager.getAllProducts(page, perPage, sort, query);
        cart = await cartManager.getAllCarts();

        let productsArray = result.docs.map(elem => {
            return {
                id: elem._id,
                title: elem.title,
                author: elem.author,
                price: elem.price,
                description: elem.description,
                stock: elem.stock,
                category: elem.category,
                cartId: cart._id
            }
        })

        const data =  {
            hasPrevPage: result.hasPrevPage,
            prevPage: result.prevPage,
            hasNextPage: result.hasNextPage,
            nextPage: result.nextPage,
            totalPages: result.totalPages,
            page: result.page,
            limit: result.limit,
            sort: sort,
            query: query,
            cartId: cart._id
        }

        if (data.page > data.totalPages) {
            let msg = "Page not found.";
            res.render("error", {msg})
        } else {
            
            res.render("products", {productsArray, data});
        }

    } catch (error) {
        res.status(400).send({status: "error", error: ""})
    }

})


export default productViewRouter
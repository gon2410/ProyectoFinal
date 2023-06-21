import { Router } from "express";
import ProductManager from "../DAO/ProductDAO.js";

const viewRouter = Router();
const productManager = new ProductManager();

viewRouter.get("/", async (req, res) => {
    let result;
    const perPage = req.query.limit || 10;
    const page = req.query.page || 1;
    const sort = req.query.sort;
    const query = req.query.query;

    try {
        result = await productManager.getAllProducts(page, perPage, sort, query);

        console.log(result)
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
            limit: result.limit
        }

        res.render("products", {productsArray, data});
    } catch (error) {
        res.status(400).send({status: "error", error: ""})
    }
})

export default viewRouter
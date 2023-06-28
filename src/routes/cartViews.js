import { Router } from "express";
import CartManager from "../DAO/CartDAO.js";


const cartViewRouter = Router();
const cartManager = new CartManager();


cartViewRouter.get("/:cid", async (req, res) => {
    let cartId = req.params.cid;
    let cart;
    try {
        cart = await cartManager.getCart(cartId);

        const cartArray = cart.products.map(elem => {
            return {
                title: elem.product.title,
                author: elem.product.author,
                price: elem.product.price
            }
        })

        res.render("carts", {cartArray})
    } catch (error) {
        res.status(400).send({status: "error", error: ""})
    }
})


export default cartViewRouter;
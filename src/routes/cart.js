import { Router } from "express";
import CartManager from "../DAO/CartDAO.js";

const cartRouter = Router();
const cartManager = new CartManager();

cartRouter.post("/", async (req, res) => {
    let cart;
    try {
        cart = await cartManager.addCart();
        res.send({status: "success", msg: "Cart created successfully!!!!!.", payload: cart});
    } catch (error) {
        res.status(400).send({status: "Error", error});
    }
})

cartRouter.get("/:cid", async (req, res) => {
    let id = req.params.cid;
    let cart;
    try {
        cart = await cartManager.getCart(id);
        res.send({status: "success", payload: cart});
    } catch (error) {
        res.status(400).send({status: "Error", error: "Cart not found."});
    }
})

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let cart;

    try {
        cart = await cartManager.addToCart(cartId, productId);
        res.send({status: "success", payload: cart});
    } catch (error) {
        res.status(500).send({status: "error", error: "Server error."})
    }
})

cartRouter.delete("/:cid/product/:pid", async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;

    let cart;
    try {
        cart = await cartManager.removeFromCart(cartId, productId);
        res.send({status: "success", payload: cart});
    } catch (error) {
        console.log(error);
    }
})

cartRouter.delete("/:cid", async (req, res) => {
    let cartId = req.params.cid;
    let cart;
    try {
        cart = await cartManager.removeAllItems(cartId);
        res.send({status: "success", payload: cart})
    } catch (error) {
        console.log(error);
    }
})


export default cartRouter;
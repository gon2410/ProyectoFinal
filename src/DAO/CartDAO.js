import { cartModel } from "./models/cart.model.js";

class CartManager {
    constructor() {
        this.model = cartModel;
    }

    async getAllCarts() {
        let carts;
        try {
            carts = await this.model.find({});
        } catch (error) {
            console.log(error);
        }

        return carts[0]
    }

    async addCart() {
        let cart;
        try {
            cart = await this.model.create({}); 
        } catch (error) {
            console.log(error);
        }

        return cart;
    }

    async getCart(id) {
        let cart;
        try {
            cart = await this.model.findOne({_id: id});
        } catch (error) {
            console.log(error);
        }

        return cart;
    }

    async addToCart(cid, pid) {
        let cartUpdated;

        try {
            let cart = await this.model.findOne({_id: cid});
            cart.products.push({product: pid});
            cartUpdated = await this.model.updateOne({_id: cid}, cart);
        } catch (error) {
            console.log(error);
        }

        return cartUpdated;
    }

    async removeFromCart(cid, pid) {
        let cartUpdated;
        try {
            cartUpdated = await this.model.updateOne({_id: cid}, { $pull: {products: {product: {_id: pid}}}});
        } catch (error) {
            console.log(error);
        }

        return cartUpdated;
    }

    async removeAllItems(cid) {
        let cartUpdated;
        try {
            cartUpdated = await this.model.updateOne({_id: cid}, {$set: {products: []}})
        } catch (error) {
            console.log(error);
        }

        return cartUpdated;
    }
}

export default CartManager;
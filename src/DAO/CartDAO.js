import { cartModel } from "./models/cart.model.js";

class CartManager {
    constructor() {
        this.model = cartModel;
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
            cart = await this.model.find({_id: id});
        } catch (error) {
            console.log(error);
        }

        return cart;
    }

    async addToCart(cid, pid) {
        let cartUpdated;

        try {
            let cart = await this.model.findOne({_id: cid});

            // for (let i = 0; i <= cart.products.length; i++) {
            //     console.log(cart.products[i]);
            // }
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
import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import productRouter from "./src/routes/product.js";
import cartRouter from "./src/routes/cart.js";
import productViewRouter from "./src/routes/productViews.js";

const app = express();

mongoose.connect("mongodb+srv://goonolivera:xyzab3landa@cluster0.rdf8a7f.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then(() => console.log("Database connected."))
.catch(err => console.log(err));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/products", productViewRouter);

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server running on port: ${server.address().port}`);
})
server.on("error", error => console.log(error));
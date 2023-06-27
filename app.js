import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import productRouter from "./src/routes/productViews.js"
import cartRouter from "./src/routes/cart.js";
import productViewRouter from "./src/routes/productViews.js";
import { Server } from "socket.io";


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.use(express.static("./src/public"))

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port: ${httpServer.address().port}`);
})
httpServer.on("error", error => console.log(error));

const socketServer = new Server(httpServer);

mongoose.connect("mongodb+srv://goonolivera:xyzab3landa@cluster0.rdf8a7f.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then(() => console.log("Database connected."))
.catch(err => console.log(err));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/products", productViewRouter);

// socketServer.on("connection", socket => {
//     console.log("Nuevo cliente conectado.")

//     socket.emit("event", "emitiendo desde app");
// })


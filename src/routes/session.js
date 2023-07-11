import { Router } from "express";
import { createUser, getAll, getByEmail } from "../DAO/SessionDAO.js";
import { authMiddleware } from "../middlewares/auth.js";

const sessionRouter = Router();

sessionRouter.get("/register", (req, res) => {
    res.render("register", {})
})

sessionRouter.post("/register", async (req, res) => {
    let user = req.body;
    let result = await createUser(user);
    console.log(result)
    res.render("login", {})
})

sessionRouter.get("/login", (req, res) => {
    res.render("login", {})
})

sessionRouter.post("/login", async (req, res) => {
    let user = req.body;
    let result = await getByEmail(user.email);
    if (user.password !== result.password) {
        req.session.user = user.email;
        res.render("login-error", {});
    }
    console.log(result);
    res.redirect("/products")
    //res.render("products", { user: req.session.user })
})

sessionRouter.get("/profile", authMiddleware, (req, res) => {
    res.redirect("/products")
    //res.render("products", {user})
})

sessionRouter.get("/logout", (req, res) => {
    req.session.destroy(error => {
        res.render("login")
    })
})

export default sessionRouter;
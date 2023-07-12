import { Router } from "express";
import { createUser, getAll, getByEmail, updateUserPassword } from "../DAO/SessionDAO.js";
import { authMiddleware } from "../middlewares/auth.js";
import { createHash, isValidPassword } from "../utils/index.js";
import passport from "passport";

const sessionRouter = Router();

sessionRouter.get("/register", (req, res) => {
    res.render("register", {})
})

sessionRouter.post("/register", passport.authenticate("register", {failureRedirect: "/api/session/failregister"}) ,async (req, res) => {
    //res.send({status: "success", message: "Usuario registrado con exito."})
    res.render("login", {});
})

sessionRouter.get("/failregister", (req, res) => {
    res.render("register-error", {})
})


sessionRouter.get("/login", (req, res) => {
    res.render("login", {})
})

sessionRouter.post("/login", passport.authenticate("login", { failureRedirect: "/api/session/faillogin"}) ,async (req, res) => {
    if (!req.user) return render("login-error", {});
    req.session.user = req.user.email;
    //res.redirect("/products", {user: req.session.user});
    res.render("products", {user: req.session.user})
})

sessionRouter.get("/faillogin", (req, res) => {
    res.render("login-error", {})
})

sessionRouter.get("/github", passport.authenticate("github", {scope: ["user:email"]}), async (req, res) => {

}) 

sessionRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/api/session/login"}), async (req, res) => {
    req.session.user = req.user;
    res.render("products", {user: req.session.user});
})

sessionRouter.get("/profile", authMiddleware, (req, res) => {
    res.redirect("/products")
    //res.render("products", {user})
})

sessionRouter.get("/logout", (req, res) => {
    req.session.destroy(error => {
        res.render("login");
    })
})

sessionRouter.get("/restore", (req, res) => {
    res.render("restore-password", {})
})

sessionRouter.post("/restore", async (req, res) => {
    let user = req.body;
    let userFound = await getByEmail(user.email);

    if (!userFound) {
        res.render("register", {})
    } else {
        let newPassword = createHash(user.password);
        let result = await updateUserPassword(user.email, newPassword)
    }

    res.render("login", {});
})

export default sessionRouter;
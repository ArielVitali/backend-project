import { Router } from "express";
import middlewareModules from "../middleware/Access/index.js";

const { publicAccess, privateAccess } = middlewareModules;

const router = Router();

router.get("/signup", publicAccess, (req, res) => {
  res.render("signup.handlebars");
});

router.get("/login", publicAccess, (req, res) => {
  res.render("login.handlebars");
});

router.get("/", privateAccess, (req, res) => {
  res.redirect("/api/products"); //hacer un redirect a products con los datos del usuario
});

router.get("/forgotPassword", (req, res) => {
  res.render("forgotPassword.handlebars");
});

export default router;

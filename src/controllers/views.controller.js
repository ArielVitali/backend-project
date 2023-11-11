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

router.get("/loggerTest/:tipo", (req, res) => {
  try {
    const loggerType = req.params.tipo;
    switch (loggerType) {
      case "fatal":
        req.logger.fatal("logger fatal");
        break;
      case "error":
        req.logger.error("logger error");
        break;

      case "warning":
        req.logger.warning("logger warning");
        break;

      case "info":
        req.logger.info("logger info");
        break;

      case "http":
        req.logger.http("logger http");
        break;

      case "debug":
        req.logger.debug("logger debug");
        break;
      default:
        break;
    }
    res.status(200).json({ message: "succes" });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
});

export default router;

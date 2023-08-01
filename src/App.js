import express from "express";
import morgan from "morgan";
import handlebars from "express-handlebars";
import router from "./router/index.js";
import __dirname from "./Utils.js";

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.use(morgan("dev"));

router(app);

export default app;

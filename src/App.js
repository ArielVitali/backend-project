import express from "express";
import morgan from "morgan";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
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
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://admin:admin@ecommerce.vyfth9f.mongodb.net/sessions?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "loqueQuier4",
    resave: false,
    saveUninitialized: false,
  })
);

router(app);

export default app;

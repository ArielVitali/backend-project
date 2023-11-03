import express from "express";
import morgan from "morgan";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "./router/index.js";
import __dirname from "./Utils.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { dbConfig } from "./config/db.config.js";

const { dbUser, dbPassword, dbHost, dbNameS } = dbConfig;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbNameS}`;

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
      mongoUrl: uri,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "loqueQuier4",
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

router(app);

export default app;

import { Router } from "express";
import ProductManager from "../class/ProductManager.js";
import __dirname from "../Utils.js";

const controllerRealTimeProducts = Router();
const path = __dirname + "/files/products.json";
const productManager = new ProductManager(path);

controllerRealTimeProducts.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts.handlebars", { products });
});

export default controllerRealTimeProducts;

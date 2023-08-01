import { Router } from "express";
import ProductDao from "../dao/Product.dao.js";

const controllerRealTimeProducts = Router();
//const path = __dirname + "/files/products.json";
const productManager = new ProductDao();

controllerRealTimeProducts.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts.handlebars", { products });
});

export default controllerRealTimeProducts;

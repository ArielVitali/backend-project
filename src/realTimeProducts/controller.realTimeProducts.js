import { Router } from "express";
import ProductDao from "../dao/Product.dao.js";

const controllerRealTimeProducts = Router();
const productManager = new ProductDao();

controllerRealTimeProducts.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realTimeProducts.handlebars", { products });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.realTimeProducts.js:14 ~ controllerRealTimeProducts.get ~ error:",
      error
    );
  }
});

export default controllerRealTimeProducts;

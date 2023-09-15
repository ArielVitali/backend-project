import { Router } from "express";
import ProductDao from "../dao/Product.dao.js";
import productMaping from "../Utils/responseMapping/mongoPaginatedResponse.js";
import middlewareModules from "../middleware/index.js";
const { privateAccess } = middlewareModules;

const controllerRealTimeProducts = Router();
const productManager = new ProductDao();

controllerRealTimeProducts.get("/", privateAccess, async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const response = await productManager.getProducts(limit, page);
    const products = await productMaping(response.docs);
    console.log(products);
    res.render("realTimeProducts.handlebars", { products });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.realTimeProducts.js:13 ~ controllerRealTimeProducts.get ~ error:",
      error
    );
  }
});

export default controllerRealTimeProducts;

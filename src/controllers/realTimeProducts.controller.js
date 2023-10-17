import { Router } from "express";
import productService from "../services/products.service.js";
import productMaping from "../Utils/responseMapping/mongoPaginatedResponse.js";
import middlewareModules from "../middleware/index.js";
const { privateAccess } = middlewareModules;

const router = Router();

router.get("/", privateAccess, async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const response = await productService.getProducts(limit, page);
    const products = await productMaping(response.docs);
    res.render("realTimeProducts.handlebars", { products });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.realTimeProducts.js:13 ~ router.get ~ error:",
      error
    );
  }
});

export default router;

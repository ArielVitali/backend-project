import { Router } from "express";
import productService from "../services/products.service.js";
import middlewareModules from "../middleware/Access/index.js";
import productMaping from "../Utils/responseMapping/mongoPaginatedResponse.js";
const { privateAccess } = middlewareModules;

const router = Router();

router.get("/", privateAccess, async (req, res) => {
  try {
    const {
      limit = 10,
      page = 1,
      query,
      sort = "asc",
      category,
      stock,
    } = req.query;

    const queryData = {
      limit,
      page,
      query,
      sort,
      category,
      stock,
    };
    const response = await productService.getProducts(queryData);
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

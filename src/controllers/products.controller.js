import { Router } from "express";
import __dirname from "../Utils.js";
import productMaping from "../Utils/responseMapping/mongoPaginatedResponse.js";
import middlewareModules from "../middleware/index.js";
import productService from "../services/products.service.js";
const { privateAccess } = middlewareModules;

const router = Router();

//get products
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
    const { user } = req.session;

    const products = await productMaping(response.payload);
    res.render("products.handlebars", { products, response, user });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.product.js:76 ~ router.get ~ error:",
      error
    );
  }
});

//get products by id
router.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const response = await productService.getProductById(pid);
    res.json({ response });
  } catch (error) {
    console.log(error);
  }
});

//add product
router.post("/", async (req, res) => {
  try {
    await productService.addProduct(req.body);

    //socketIO
    const products = await productService.getProducts();
    global.io.emit("listOfproducts", products);
    res.json({ products });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.product.js:126 ~ router.post ~ error:",
      error
    );
  }
});

//update product by id
router.put("/:pid", async (req, res) => {
  try {
    const response = await productService.updateProduct(
      req.params.pid,
      req.body
    );
    res.send(response);
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.product.js:137 ~ router.put ~ error:",
      error
    );
  }
});

//delete product by id
router.delete("/:pid", async (req, res) => {
  try {
    const response = await productService.deleteProduct(req.params.pid);

    //socketIO
    global.io.emit("listOfproducts", response);

    res.json({ response, message: `Product deleted succesfully!` });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.product.js:182 ~ router.delete ~ error:",
      error
    );
  }
});

export default router;

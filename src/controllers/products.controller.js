import { Router } from "express";
import __dirname from "../Utils.js";
import productMaping from "../Utils/responseMapping/mongoPaginatedResponse.js";
import middlewareModules from "../middleware/Access/index.js";
import productService from "../services/products.service.js";
import productMock from "../Utils/mocks/productMock.js";
import productError from "../Utils/Errors/Product/product.error.js";
import responses from "../Utils/Responses/index.js";

const { privateAccess, privateAdminAccess } = middlewareModules;
const { success, ServerError, ClientError } = responses;

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
    const response = await productService.getProductsForHome(queryData, req);
    const products = await productMaping(response.payload);
    const { user } = req.session;

    res.render("products.handlebars", { products, response, user });
  } catch (error) {
    ServerError(res, error);
  }
});

//get products by id
router.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const response = await productService.getProductById(pid);
    res.json({ response });
  } catch (error) {
    ServerError(res, error);
  }
});

//add product
router.post("/", privateAdminAccess, async (req, res) => {
  try {
    await productService.addProduct(req.body);

    //socketIO
    const products = await productService.getProducts();
    global.io.emit("listOfproducts", products);
    res.json({ products });
  } catch (error) {
    ServerError(res, error);
    return productError(req.body.pid, req.body);
  }
});

//update product by id
router.put("/:pid", privateAdminAccess, async (req, res) => {
  try {
    const response = await productService.updateProduct(
      req.params.pid,
      req.body
    );
    res.send(response);
  } catch (error) {
    ServerError(res, error);
    return productError(req.body.pid, req.body);
  }
});

//delete product by id
router.delete("/:pid", privateAdminAccess, async (req, res) => {
  try {
    const response = await productService.deleteProduct(req.params.pid);

    //socketIO
    global.io.emit("listOfproducts", response);

    res.json({ response, message: `Product deleted succesfully!` });
  } catch (error) {
    ServerError(res, error);
  }
});

router.get("/mockingproducts", privateAccess, async (req, res) => {
  try {
    const mock = await productMock(10);
    res.json({ mock: mock });
  } catch (error) {
    ServerError(res, error);
  }
});

export default router;

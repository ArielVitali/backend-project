import { Router } from "express";
import __dirname from "../Utils.js";
import ProductDao from "../dao/Product.dao.js";
import productMaping from "../Utils/responseMapping/mongoPaginatedResponse.js";

const controllerProduct = Router();
const productManager = new ProductDao();

//get products
controllerProduct.get("/", async (req, res) => {
  try {
    const {
      limit = 10,
      page = 1,
      query,
      sort = "asc",
      category,
      stock,
    } = req.query;
    const response = await productManager.getProducts(
      limit,
      page,
      query,
      sort,
      category,
      stock
    );

    //const products = await productMaping(response);
    //res.render("index.handlebars", { products });
    //res.json({ products });

    let prevLink = null;
    let nextLink = null;
    let linkMold = req.protocol + "://" + req.get("host") + "/api/products/";

    if (response.hasPrevPage) {
      prevLink =
        req.protocol +
        "://" +
        req.get("host") +
        "/api/products" +
        "?" +
        `page=${response.prevPage}` +
        `&limit=${limit}&sort=${sort}`;
    }
    if (response.hasNextPage) {
      nextLink =
        req.protocol +
        "://" +
        req.get("host") +
        "/api/products" +
        "?" +
        `page=${response.nextPage}` +
        `&limit=${limit}&sort=${sort}`;
    }

    const mappedResponse = {
      status: "success",
      payload: response.docs,
      totalPages: response.totalPages,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      page: response.page,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink,
      linkMold: linkMold,
    };

    const products = await productMaping(mappedResponse.payload);
    res.render("products.handlebars", { products, mappedResponse });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.product.js:74 ~ controllerProduct.get ~ error:",
      error
    );
  }
});

//get products by id
controllerProduct.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const response = await productManager.getProductById(pid);
    const product = await productMaping(response);
    res.json({ product });
  } catch (error) {
    console.log(error);
  }
});

//add product
controllerProduct.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    const productData = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    await productManager.addProduct(productData);

    //socketIO
    const products = await productManager.getProducts();
    global.io.emit("listOfproducts", products);
    res.json({ products });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.product.js:126 ~ controllerProduct.post ~ error:",
      error
    );
  }
});

//update product by id
controllerProduct.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.query;

    const productData = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    const response = await productManager.updateProduct(pid, productData);
    res.send(response);
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.product.js:137 ~ controllerProduct.put ~ error:",
      error
    );
  }
});

//delete product by id
controllerProduct.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const response = await productManager.deleteProduct(pid);
    const deletedProduct = await productMaping(response);

    //socketIO
    const products = await productManager.getProducts();
    global.io.emit("listOfproducts", products);

    res.json({ deletedProduct, message: `Product deleted succesfully!` });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.product.js:182 ~ controllerProduct.delete ~ error:",
      error
    );
  }
});

export default controllerProduct;

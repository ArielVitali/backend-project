import { Router } from "express";
import __dirname from "../Utils.js";
import ProductDao from "../dao/Product.dao.js";

const controllerProduct = Router();
const productManager = new ProductDao();

//get products
controllerProduct.get("/", async (req, res) => {
  try {
    const response = await productManager.getProducts();
    const products = await productMaping(response);
    res.render("index.handlebars", { products });
  } catch (error) {
    console.log(error);
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

    if (!title || !price) {
      return res
        .status(400)
        .json({ error: "Title and price are required fields." });
    }

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
      "🚀 ~ file: controller.product.js:64 ~ controllerProduct.post ~ error:",
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
    const product = await productMaping(response);
    res.json({ product });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.product.js:101 ~ controllerProduct.put ~ error:",
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
      "🚀 ~ file: controller.product.js:121 ~ controllerProduct.delete ~ error:",
      error
    );
  }
});

const productMaping = async (response) => {
  if (Array.isArray(response)) {
    return response.map((product) => ({
      id: product._id,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: product.status,
      stock: product.stock,
      category: product.category,
      thumbnails: product.thumbnails,
    }));
  } else {
    return {
      id: response._id,
      title: response.title,
      description: response.description,
      code: response.code,
      price: response.price,
      status: response.status,
      stock: response.stock,
      category: response.category,
      thumbnails: response.thumbnails,
    };
  }
};

export default controllerProduct;

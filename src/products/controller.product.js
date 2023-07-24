import { Router } from "express";
import ProductManager from "../class/ProductManager.js";

const controllerProduct = Router();
const path = "./files/products.json";
const productManager = new ProductManager(path);

//get products
controllerProduct.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    //res.json(products);
    res.render("home.handlebars", { products });
  } catch (error) {
    console.log(error);
  }
});

//get products by id
controllerProduct.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productManager.getProductById(parseInt(pid));
    res.json(product);
  } catch (error) {
    console.log(error);
  }
});

//add product
controllerProduct.post("/", async (req, res) => {
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

  const result = await productManager.addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  );
  res.json({ message: result });
});

//update product by id
controllerProduct.put("/:pid", async (req, res) => {
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
  const result = await productManager.updateProduct(
    parseInt(pid),
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  );
  res.json({ message: result });
});

//delete product by id
controllerProduct.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const deletedProduct = await productManager.deleteProduct(parseInt(pid));
  res.json({ deletedProduct, message: `Product deleted succesfully!` });
});

controllerProduct.post("/realtimeproducts", (req, res) => {});

export default controllerProduct;

import { Router } from "express";
import ProductManager from "../class/ProductManager.js";
import __dirname from "../Utils.js";

const controllerProduct = Router();
const path = __dirname + "/files/products.json";
const productManager = new ProductManager(path);

//get products
controllerProduct.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    //res.json(products);
    res.render("index.handlebars", { products });
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
  const products = await productManager.getProducts();
  global.io.emit("listOfproducts", products);
  //console.log({ message: result });
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
  const products = await productManager.getProducts();
  global.io.emit("listOfproducts", products);
  res.json({ deletedProduct, message: `Product deleted succesfully!` });
});

export default controllerProduct;

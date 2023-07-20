import { Router } from "express";

const controllerProduct = Router();

//get products
controllerProduct.get("/products", (req, res) => {
  /*
    .
    .
    .
    */
});

//get products by id
controllerProduct.get("/products/:pid", (req, res) => {
  /*
    .
    .
    .
    */
});

//add product
controllerProduct.post("/product", (req, res) => {
  /*
    .
    .
    .
    */
});

//update product by id
controllerProduct.put("/:pid", (req, res) => {
  /*
    .
    .
    .
    */
});

//delete product by id
controllerProduct.delete("/:pid", (req, res) => {
  /*
    .
    .
    .
    */
});

export default controllerProduct;

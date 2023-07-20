import { Router } from "express";

const controllerCart = Router();

//create cart
controllerCart.post("/", (req, res) => {
  /*
    .
    .
    .  
    */
});

//get products from cart id
controllerCart.get("/:cid", (req, res) => {
  /*
    .
    .
    .  
    */
});

//add product by id to cart by id
controllerCart.post("/:cid/product/:pid", (req, res) => {
  /*
    .
    .
    .  
    */
});

export default controllerCart;

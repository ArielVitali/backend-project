import { Router } from "express";
import CartDao from "../dao/Cart.dao.js";

const controllerCart = Router();
//const path = "./files/carts.json";
//const cartManager = new CartManager(path);
const cartManager = new CartDao();

//create cart
controllerCart.post("/", async (req, res) => {
  const { products } = req.body;
  const result = await cartManager.createCart(products);
  res.json({ message: result });
});

//get products from cart id
controllerCart.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManager.getCartById(parseInt(cid));
  res.json(cart);
});

//add product by id to cart by id
controllerCart.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const { quantity } = req.body;

  const result = await cartManager.addProductToCart(
    parseInt(cid),
    parseInt(pid),
    parseInt(quantity)
  );
  res.json(result);
});

export default controllerCart;

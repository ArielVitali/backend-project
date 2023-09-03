import { Router } from "express";
import CartDao from "../dao/Cart.dao.js";

const controllerCart = Router();
const cartManager = new CartDao();

//create cart
controllerCart.post("/", async (req, res) => {
  try {
    const { products } = req.body;
    const result = await cartManager.createCart(products);
    res.json({ message: result });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:16 ~ controllerCart.post ~ error:",
      error
    );
  }
});

//get products from cart id
controllerCart.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    res.json(cart);
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:28 ~ controllerCart.get ~ error:",
      error
    );
  }
});

//add product by id to cart by id
controllerCart.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;

    const result = await cartManager.addProductToCart(cid, pid, quantity);
    res.json(result);
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:45 ~ controllerCart.post ~ error:",
      error
    );
  }
});

export default controllerCart;

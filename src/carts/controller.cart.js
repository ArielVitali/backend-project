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
  const cart = await cartManager.getCartById(cid);
  //res.json(cart);
  res.status(200).render("cart.handlebars", cart);
});

//add product by id to cart by id
controllerCart.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const { quantity } = req.body;

  const result = await cartManager.addProductToCart(cid, pid, quantity);
  res.json(result);
});

//update the entire cart product list
controllerCart.put("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const { products } = req.body;

  //products tiene un formato especifico
  const response = await cartManager.updateCartProductList(cid, products);
  res.json(response);
});

//update the quantity of a product
controllerCart.put("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const { quantity } = req.body;

  const response = await cartManager.updateProductQuantity(cid, pid, quantity);
  res.json(response);
});

//delete from a cart the selected product
controllerCart.delete("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const response = await cartManager.deleteProduct(cid, pid);
  res.json(response);
});

//delete all products from cart
controllerCart.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;

  const response = await cartManager.deleteProducts(cid);
  res.json(response);
});

export default controllerCart;

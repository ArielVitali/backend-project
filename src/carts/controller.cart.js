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
      "🚀 ~ file: controller.cart.js:14 ~ controllerCart.post ~ error:",
      error
    );
  }
});

//get products from cart id
controllerCart.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const response = await cartManager.getCartById(cid);
    const cart = cartMapping(response);

    res.status(200).render("cart.handlebars", cart);
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:30 ~ controllerCart.get ~ error:",
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
      "🚀 ~ file: controller.cart.js:43 ~ controllerCart.post ~ error:",
      error
    );
  }
});

//update the entire cart product list
controllerCart.put("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const { products } = req.body;

    const response = await cartManager.updateCartProductList(cid, products);
    res.json(response);
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:64 ~ controllerCart.put ~ error:",
      error
    );
  }
});

//update the quantity of a product
controllerCart.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;

    const response = await cartManager.updateProductQuantity(
      cid,
      pid,
      quantity
    );
    res.json(response);
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:85 ~ controllerCart.put ~ error:",
      error
    );
  }
});

//delete from cart a selected product
controllerCart.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const response = await cartManager.deleteProduct(cid, pid);
    res.json(response);
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:102 ~ controllerCart.delete ~ error:",
      error
    );
  }
});

//delete all products from cart
controllerCart.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;

    const response = await cartManager.deleteProducts(cid);
    res.json({ response });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:116 ~ controllerCart.delete ~ error:",
      error
    );
  }
});

const cartMapping = (response) => {
  return {
    id: response._id,
    products: response.products.map((productEntry) => ({
      title: productEntry.product.title,
      quantity: productEntry.quantity,
    })),
  };
};

export default controllerCart;

import { Router } from "express";
import cartService from "../services/carts.service.js";
import middlewareModules from "../middleware/index.js";
const { privateAccess } = middlewareModules;

const router = Router();

//create cart
router.post("/", privateAccess, async (req, res) => {
  try {
    const response = await cartService.createCart(req.body);
    res.json({ response });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:14 ~ router.post ~ error:",
      error
    );
  }
});

//get products from cart id
router.get("/:cid", async (req, res) => {
  try {
    const response = await cartService.getCartByIdMapped(req.params.cid);

    res.status(200).render("cart.handlebars", response);
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:30 ~ router.get ~ error:",
      error
    );
  }
});

//add product by id to cart by id
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const response = await cartService.addProductToCart(
      req.params.cid,
      req.params.pid,
      req.body
    );
    res.json({ response });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:43 ~ router.post ~ error:",
      error
    );
  }
});

//update the entire cart product list
router.put("/:cid", async (req, res) => {
  try {
    const response = await cartService.updateCartProductList(
      req.params.cid,
      req.body
    );
    res.json({ response });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:64 ~ router.put ~ error:",
      error
    );
  }
});

//update the quantity of a product
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const response = await cartService.updateProductQuantity(
      req.params.cid,
      req.params.pid,
      req.body
    );
    res.json({ response });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:85 ~ router.put ~ error:",
      error
    );
  }
});

//delete from cart a selected product
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const response = await cartService.deleteProduct(
      req.params.cid,
      req.params.pid
    );
    res.json({ response });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:102 ~ router.delete ~ error:",
      error
    );
  }
});

//delete all products from cart
router.delete("/:cid", async (req, res) => {
  try {
    const response = await cartService.deleteProducts(req.params.cid);
    res.json({ response });
  } catch (error) {
    console.log(
      "🚀 ~ file: controller.cart.js:116 ~ router.delete ~ error:",
      error
    );
  }
});

router.get("/:cid/purchase", async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await cartService.purchaseCart(cid);
    res.json({ response });
  } catch (error) {
    throw error;
  }
});

export default router;

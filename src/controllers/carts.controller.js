import { Router } from "express";
import cartService from "../services/carts.service.js";
import middlewareModules from "../middleware/Access/index.js";
import responses from "../Utils/Responses/index.js";

const { success, ServerError, ClientError } = responses;
const { privateAccess } = middlewareModules;

const router = Router();

//create cart
router.post("/", privateAccess, async (req, res) => {
  try {
    const response = await cartService.createCart(req.body);
    res.json({ response });
  } catch (error) {
    ServerError(res, error);
  }
});

//get products from cart id
router.get("/:cid", async (req, res) => {
  try {
    const response = await cartService.getCartByIdMapped(req.params.cid);

    res.status(200).render("cart.handlebars", response);
  } catch (error) {
    ServerError(res, error);
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
    ServerError(res, error);
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
    ServerError(res, error);
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
    ServerError(res, error);
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
    ServerError(res, error);
  }
});

//delete all products from cart
router.delete("/:cid", async (req, res) => {
  try {
    const response = await cartService.deleteProducts(req.params.cid);
    res.json({ response });
  } catch (error) {
    ServerError(res, error);
  }
});

router.get("/:cid/purchase", async (req, res) => {
  try {
    const { cid } = req.params;
    const response = await cartService.purchaseCart(cid);
    res.json({ response });
  } catch (error) {
    ServerError(res, error);
  }
});

export default router;

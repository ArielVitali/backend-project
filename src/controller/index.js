import controllerProduct from "../products/controller.product.js";
import controllerCart from "../carts/controller.cart.js";

const controller = (app) => {
  app.use("/api/products", controllerProduct);
  app.use("/api/carts", controllerCart);
};

export default controller;

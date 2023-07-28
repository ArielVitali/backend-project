import controllerProduct from "../products/controller.product.js";
import controllerCart from "../carts/controller.cart.js";
import controllerRealTimeProducts from "../realTimeProducts/controller.realTimeProducts.js";

const router = (app) => {
  app.use("/api/products", controllerProduct);
  app.use("/api/carts", controllerCart);
  app.use("/realtimeproducts", controllerRealTimeProducts);
};

export default router;

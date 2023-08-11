import controllerProduct from "../products/controller.product.js";
import controllerCart from "../carts/controller.cart.js";
import controllerRealTimeProducts from "../realTimeProducts/controller.realTimeProducts.js";
import viewsController from "../authViews/controller.viewsController.js";
import authController from "../auth/controller.auth.js";
import usersController from "../users/controller.users.js";

const router = (app) => {
  app.use("/api/products", controllerProduct);
  app.use("/api/carts", controllerCart);
  app.use("/realtimeproducts", controllerRealTimeProducts);
  app.use("/", viewsController);
  app.use("/auth", authController);
  app.use("/api/users", usersController);
};

export default router;

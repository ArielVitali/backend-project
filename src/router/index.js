import controllerProduct from "../controllers/products.controller.js";
import controllerCart from "../controllers/carts.controller.js";
import controllerRealTimeProducts from "../controllers/realTimeProducts.controller.js";
import viewsController from "../controllers/views.controller.js";
import authController from "../controllers/auth.controller.js";
import usersController from "../controllers/users.controller.js";
import sessionController from "../controllers/session.controller.js";

const router = (app) => {
  app.use("/api/products", controllerProduct);
  app.use("/api/carts", controllerCart);
  app.use("/realtimeproducts", controllerRealTimeProducts);
  app.use("/", viewsController);
  app.use("/auth", authController);
  app.use("/api/users", usersController);
  app.use("/api/sessions", sessionController);
};

export default router;

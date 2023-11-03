import { appConfig } from "../config/app.config.js";
import mongoConnect from "../db/mongoDB.js";

const { persistence } = appConfig;

let UserDAO;
let ProductDAO;
let CartDAO;
let TicketDAO;

switch (persistence) {
  case "fs":
    ProductDAO = import("../dao/fs/Product.fs.dao.js");
    CartDAO = import("../dao/fs/Cart.fs.dao.js");
    break;

  case "mongo":
    const mongoImports = await Promise.all([
      import("../dao/mongo/User.mongo.js"),
      import("../dao/mongo/Product.mongo.js"),
      import("../dao/mongo/Cart.mongo.js"),
      import("../dao/mongo/Ticket.mongo.js"),
    ]);
    UserDAO = mongoImports[0].default;
    ProductDAO = mongoImports[1].default;
    CartDAO = mongoImports[2].default;
    TicketDAO = mongoImports[3].default;
    await mongoConnect();
    break;
}

export { UserDAO, ProductDAO, CartDAO, TicketDAO };

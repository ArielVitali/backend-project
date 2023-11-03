import UserRepository from "./User.repository.js";
import ProductRepository from "./Product.repository.js";
import CartRepository from "./Cart.repository.js";
import TicketRepository from "./Ticket.repository.js";
import { UserDAO, ProductDAO, CartDAO, TicketDAO } from "../dao/factory.js";

const UsersRepository = new UserRepository(new UserDAO());
const ProductsRepository = new ProductRepository(new ProductDAO());
const CartsRepository = new CartRepository(new CartDAO());
const TicketsRepository = new TicketRepository(new TicketDAO());

export default {
  UsersRepository,
  ProductsRepository,
  CartsRepository,
  TicketsRepository,
};

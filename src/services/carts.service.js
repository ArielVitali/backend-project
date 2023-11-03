import Store from "../store/carts.store.js";
import cartMapping from "../Utils/responseMapping/cartMapping.js";
import repositories from "../repositories/index.js";
const { UserRepository, ProductsRepository, TicketsRepository } = repositories;

const createCart = async (products) => {
  try {
    const response = await Store.createCart({ products });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

const getCartByIdMapped = async (id) => {
  try {
    const response = await Store.getCartById(id);
    const cart = cartMapping(response);
    return cart;
  } catch (error) {
    return error;
  }
};

const getCartById = async (id) => {
  try {
    const response = await Store.getCartById(id);
    return response;
  } catch (error) {
    return error;
  }
};

const addProductToCart = async (cid, pid, data) => {
  try {
    const { quantity } = data;
    const response = await Store.addProductToCart(cid, pid, quantity);
    return response;
  } catch (error) {
    return error;
  }
};

const updateCartProductList = async (cid, data) => {
  try {
    const { newProducts } = data;
    const response = await Store.updateCartProductList(cid, newProducts);
    return response;
  } catch (error) {
    return error;
  }
};

const updateProductQuantity = async (cid, pid, data) => {
  try {
    const { quantity } = data;
    const response = await Store.updateProductQuantity(cid, pid, quantity);
    return response;
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (cid, pid) => {
  try {
    const response = await Store.deleteProduct(cid, pid);
    return response;
  } catch (error) {
    return error;
  }
};

const deleteProducts = async (cid) => {
  try {
    const response = await Store.deleteProducts(cid);
    return response;
  } catch (error) {
    return error;
  }
};

const purchaseProducts = async (cid) => {
  try {
    const cart = await getCartById(cid);
    if (cart) {
      const productsToPurchase = cart.products;
      const currentUser = await UserRepository.getUserByCartID(cid);

      const productsAvailable = productsToPurchase.filter((product) => {
        product.product.stock >= product.quantity;
      });

      const productsUnavailable = productsToPurchase.filter((product) => {
        product.product.stock < product.quantity;
      });

      if (productsUnavailable) {
        return {
          message: "There are products not available",
          productsUnavailable,
        };
      }

      productsAvailable.forEach(async (p) => {
        if (p) {
          await ProductsRepository.updateProduct(p.product._id, {
            stock:
              p.product.stock - p.quantity < 0
                ? 0
                : p.product.stock - p.quantity,
          });
        }
      });

      const newTicketInfo = {
        purchase_datetime: new Date().toLocaleString(),
        amount: purchaseFilterAvailable.reduce(
          (acc, curr) => acc + curr.product.price * curr.quantity,
          0
        ),
        purchaser: currentUser.email,
      };

      const newTicket = TicketsRepository.createTicket(newTicketInfo);

      return {
        message: "Purchase completed",
        newTicket,
      };
    }
  } catch (error) {
    throw error;
  }
};

export default {
  createCart,
  getCartById,
  getCartByIdMapped,
  addProductToCart,
  updateCartProductList,
  updateProductQuantity,
  deleteProduct,
  deleteProducts,
  purchaseProducts,
};

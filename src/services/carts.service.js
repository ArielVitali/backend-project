import Store from "../store/carts.store.js";
import cartMapping from "../Utils/responseMapping/cartMapping.js";

const createCart = async (products) => {
  try {
    const response = await Store.createCart({ products });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};

const getCartById = async (id) => {
  try {
    const response = await Store.getCartById(id);
    const cart = cartMapping(response);
    return cart;
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

export default {
  createCart,
  getCartById,
  addProductToCart,
  updateCartProductList,
  updateProductQuantity,
  deleteProduct,
  deleteProducts,
};

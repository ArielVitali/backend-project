import CartDao from "../dao/Cart.dao.js";

const Carts = new CartDao();

const createCart = async (products) => {
  try {
    const response = await Carts.createCart(products);
    return response;
  } catch (error) {
    return error;
  }
};

const getCartById = async (id) => {
  try {
    const response = await Carts.getCartById(id);
    return response;
  } catch (error) {
    return error;
  }
};

const addProductToCart = async (cid, pid, quantity) => {
  try {
    const response = await Carts.addProductToCart(cid, pid, quantity);
    return response;
  } catch (error) {
    return error;
  }
};

const updateCartProductList = async (cid, newProducts) => {
  try {
    const response = await Carts.updateCartProductList(cid, newProducts);
    return response;
  } catch (error) {
    return error;
  }
};

const updateProductQuantity = async (cid, pid, quantity) => {
  try {
    const response = await Carts.updateProductQuantity(cid, pid, quantity);
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (cid, pid) => {
  try {
    const response = await Carts.deleteProduct(cid, pid);
    return response;
  } catch (error) {
    return error;
  }
};

const deleteProducts = async (cid) => {
  try {
    const response = await Carts.deleteProducts(cid);
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

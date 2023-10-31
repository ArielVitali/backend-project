import repositories from "../repositories/index.js";
const { CartsRepository } = repositories;

const createCart = async (products) => {
  try {
    const response = await CartsRepository.createCart(products);
    return response;
  } catch (error) {
    return error;
  }
};

const getCartById = async (id) => {
  try {
    const response = await CartsRepository.getCartById(id);
    return response;
  } catch (error) {
    return error;
  }
};

const addProductToCart = async (cid, pid, quantity) => {
  try {
    const response = await CartsRepository.addProductToCart(cid, pid, quantity);
    return response;
  } catch (error) {
    return error;
  }
};

const updateCartProductList = async (cid, newProducts) => {
  try {
    const response = await CartsRepository.updateCartProductList(
      cid,
      newProducts
    );
    return response;
  } catch (error) {
    return error;
  }
};

const updateProductQuantity = async (cid, pid, quantity) => {
  try {
    const response = await CartsRepository.updateProductQuantity(
      cid,
      pid,
      quantity
    );
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (cid, pid) => {
  try {
    const response = await CartsRepository.deleteProduct(cid, pid);
    return response;
  } catch (error) {
    return error;
  }
};

const deleteProducts = async (cid) => {
  try {
    const response = await CartsRepository.deleteProducts(cid);
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

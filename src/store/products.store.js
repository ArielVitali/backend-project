import repositories from "../repositories/index.js";
const { ProductsRepository } = repositories;

const addProduct = async (productData) => {
  try {
    const response = await ProductsRepository.addProduct(productData);
    return response;
  } catch (error) {
    return error;
  }
};

const getProducts = async (queryData) => {
  try {
    const response = await ProductsRepository.getProducts(queryData);
    return response;
  } catch (error) {
    return error;
  }
};

const getProductById = async (id) => {
  try {
    const response = await ProductsRepository.getProductById(id);
    return response;
  } catch (error) {
    return error;
  }
};

const updateProduct = async (pid, data) => {
  try {
    const response = await ProductsRepository.updateProduct(pid, data);

    return response;
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await ProductsRepository.deleteProduct(id);
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

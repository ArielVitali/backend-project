import ProductDao from "../dao/Product.dao.js";

const Products = new ProductDao();

const addProduct = async (productData) => {
  try {
    const response = await Products.addProduct(productData);
    return response;
  } catch (error) {
    return error;
  }
};

const getProducts = async (data) => {
  try {
    const response = await Products.getProducts(data);
    return response;
  } catch (error) {
    return error;
  }
};

const getProductById = async (id) => {
  try {
    const response = await Products.getProductById(id);
    return response;
  } catch (error) {
    return error;
  }
};

const updateProduct = async (pid, data) => {
  try {
    const response = await Products.updateProduct(pid, data);

    return response;
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await Products.deleteProduct(id);
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

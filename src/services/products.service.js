import Store from "../store/products.store.js";
import productMaping from "../Utils/responseMapping/mongoPaginatedResponse.js";

const addProduct = async (data) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = data;

    const productData = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };
    const response = await Store.addProduct(productData);
    return response;
  } catch (error) {
    return error;
  }
};

const getProducts = async (data) => {
  try {
    const response = await Store.getProducts(data);

    let prevLink = null;
    let nextLink = null;
    let linkMold = req.protocol + "://" + req.get("host") + "/api/products/";

    if (response.hasPrevPage) {
      prevLink =
        req.protocol +
        "://" +
        req.get("host") +
        "/api/products" +
        "?" +
        `page=${response.prevPage}` +
        `&limit=${limit}&sort=${sort}`;
    }
    if (response.hasNextPage) {
      nextLink =
        req.protocol +
        "://" +
        req.get("host") +
        "/api/products" +
        "?" +
        `page=${response.nextPage}` +
        `&limit=${limit}&sort=${sort}`;
    }

    const mappedResponse = {
      status: "success",
      payload: response.docs,
      totalPages: response.totalPages,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      page: response.page,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink,
      linkMold: linkMold,
    };

    return mappedResponse;
  } catch (error) {
    return error;
  }
};

const getProductById = async (id) => {
  try {
    const response = await Store.getProductById(id);
    const product = await productMaping(response);
    return product;
  } catch (error) {
    return error;
  }
};

const updateProduct = async (pid, data) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = data;

    const productData = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    const response = await Store.updateProduct(pid, productData);

    return response;
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await Store.deleteProduct(id);
    const deletedProduct = await productMaping(response);
    return deletedProduct;
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
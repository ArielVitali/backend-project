import repositories from "../repositories/index.js";
const { ProductsRepository } = repositories;

class ProductService {
  async addProduct(productData) {
    try {
      const response = await ProductsRepository.addProduct(productData);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getProducts(queryData) {
    try {
      const response = await ProductsRepository.getProducts(queryData);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const response = await ProductsRepository.getProductById(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(pid, data) {
    try {
      const response = await ProductsRepository.updateProduct(pid, data);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductsRepository.deleteProduct(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new ProductService();

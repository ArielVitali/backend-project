import UserDTO from "../DTOs/User.dto.js";

class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async addProduct(productData) {
    try {
      const data = new UserDTO(productData); /// <--- This is the line that changed
      const response = await this.dao.addProduct(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(queryData) {
    try {
      const response = await this.dao.getProducts(queryData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const response = await this.dao.getProductById(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(pid, data) {
    try {
      const response = await this.dao.updateProduct(pid, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const response = await this.dao.deleteProduct(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductRepository;

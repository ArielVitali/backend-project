import repositories from "../repositories/index.js";
const { CartsRepository } = repositories;

class CartService {
  async createCart(products) {
    try {
      const response = await CartsRepository.createCart(products);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getCartById(id) {
    try {
      const response = await CartsRepository.getCartById(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async addProductToCart(cid, pid, quantity) {
    try {
      const response = await CartsRepository.addProductToCart(
        cid,
        pid,
        quantity
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateCartProductList(cid, newProducts) {
    try {
      const response = await CartsRepository.updateCartProductList(
        cid,
        newProducts
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const response = await CartsRepository.updateProductQuantity(
        cid,
        pid,
        quantity
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(cid, pid) {
    try {
      const response = await CartsRepository.deleteProduct(cid, pid);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteProducts(cid) {
    try {
      const response = await CartsRepository.deleteProducts(cid);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new CartService();

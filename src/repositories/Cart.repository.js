class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createCart(data) {
    try {
      const response = await this.dao.createCart(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const response = await this.dao.getCartById(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid, quantity) {
    try {
      const response = await this.dao.addProductToCart(cid, pid, quantity);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateCartProductList(cid, newProducts) {
    try {
      const response = await this.dao.updateCartProductList(cid, newProducts);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const response = await this.dao.updateProductQuantity(cid, pid, quantity);
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(cid, pid) {
    try {
      const response = await this.dao.deleteProduct(cid, pid);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteProducts(cid) {
    try {
      const response = await this.dao.deleteProducts(cid);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default CartRepository;

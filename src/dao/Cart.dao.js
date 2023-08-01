import cartModel from "./models/Cart.models.js";

class CartDao {
  /* add new cart */
  async createCart(products) {
    try {
      const response = await cartModel.create(products);
      return response;
    } catch (error) {
      return error;
    }
  }

  /* get cart by cid */
  async getCartById(id) {
    try {
      const response = await cartModel.findById(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  /* add product to cart */
  async addProductToCart(cid, pid, quantity) {
    try {
      const cart = cartModel.findById(cid);

      if (cart) {
        const product = cart.products.map((product) => product.id === pid);
        product
          ? (product.quantity += quantity)
          : cart.products.push({ id: pid, quantity });
        await cart.save;
      }
    } catch (error) {
      return error;
    }
  }
}

export default CartDao;

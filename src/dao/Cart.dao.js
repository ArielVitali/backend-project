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
      const response = await cartModel
        .findById(id)
        .populate("products.product");
      return response;
    } catch (error) {
      return error;
    }
  }

  /* add product to cart */
  async addProductToCart(cid, pid, quantity) {
    try {
      const cart = await cartModel.findById(cid);
      if (cart) {
        const product = cart.products.find(
          (product) => product.product.toString() === pid
        );
        if (product) {
          product.quantity += quantity;
        } else {
          cart.products.push({ product: pid, quantity: quantity });
        }
        await cart.save();
      }
      return cart;
    } catch (error) {
      return error;
    }
  }

  /* updates cart product list */
  async updateCartProductList(cid, products) {
    try {
      const cart = await cartModel.findById(cid);
      if (cart) {
        //deberia checkear que la estructura de products es correcta
        //mirar grabacion 4:52:12
        cart.products = products;
        cart.save();
      }
    } catch (error) {
      return error;
    }
  }

  /* updates cart product quantity */
  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await cartModel.findById(cid);
      if (cart) {
        const product = cart.products.find(
          (product) => product.product.toString() === pid
        );
        if (product) {
          product.quantity = quantity;
        }
        cart.save();
      }
    } catch (error) {
      return error;
    }
  }

  /* deletes product from cart */
  async deleteProduct(cid, pid) {
    try {
      const cart = await cartModel.findById(cid);
      if (cart) {
        cart.products.findByIdAndDelete(pid);
        cart.save();
      }
    } catch (error) {
      return error;
    }
  }

  /* deletes product list of cart */
  async deleteProducts(cid) {
    try {
      const cart = await cartModel.findById(cid);
      if (cart) {
        cart.products = [];
        cart.save();
      }
    } catch (error) {
      return error;
    }
  }
}

export default CartDao;

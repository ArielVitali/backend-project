import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async addCart(products) {
    try {
      let carts = [];

      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        carts = JSON.parse(data);
      }

      const id =
        carts.length > 0 ? Math.max(...carts.map((cart) => cart.id)) + 1 : 1;

      const cart = {
        id,
        products: [],
      };

      carts.push(cart);

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      throw new Error("Failed to add product: " + error.message);
    } finally {
      return `Cart added succesfully!`;
    }
  }

  async getCartById(id) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      const cart = carts.find((cart) => cart.id === id);
      if (cart) {
        return cart;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid, quantity) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      const cartIndex = carts.findIndex((cart) => cart.id === cid);
      const cart = carts[cartIndex];
      console.log(cart);
      if (cart !== -1) {
        const productIndex = cart.products.findIndex(
          (product) => product.id === pid
        );
        console.log(productIndex);
        if (productIndex !== -1) {
          const product = cart.products[productIndex];
          console.log(product);

          product.quantity += quantity;
        } else {
          const product = {
            id: pid,
            quantity,
          };
          cart.products.push(product);
        }
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      throw new Error("Failed to add product: " + error.message);
    } finally {
      return `Product added succesfully!`;
    }
  }
}

export default CartManager;

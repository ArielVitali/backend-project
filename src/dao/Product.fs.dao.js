import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  ) {
    try {
      let products = [];

      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(data);
      }

      const id =
        products.length > 0
          ? Math.max(...products.map((product) => product.id)) + 1
          : 1;

      const product = {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      };

      products.push(product);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );

      console.log("El producto se cargó satisfactoriamente");
    } catch (error) {
      throw new Error("Failed to add product: " + error.message);
    } finally {
      return `Product ${title} added succesfully!`;
    }
  }

  async getProducts() {
    try {
      await fs.promises.access(this.path);
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      const product = products.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  ) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        const product = products[productIndex];
        product.title = title ? title : product.title;
        product.description = description ? description : product.description;
        product.code = code ? code : product.code;
        product.price = price ? price : product.price;
        product.status = status ? status : product.status;
        product.stock = stock ? stock : product.stock;
        product.category = category ? category : product.category;
        product.thumbnails = thumbnails ? thumbnails : product.thumbnails;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      throw new Error("Failed to update product: " + error.message);
    } finally {
      return `Product ${title} updated succesfully!`;
    }
  }

  async deleteProduct(id) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      const productIndex = products.findIndex((product) => product.id === id);
      console.log(productIndex);
      if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1)[0];
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
        return deletedProduct;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      throw new Error("Failed to delete product: " + error.message);
    }
  }
}

export default ProductManager;

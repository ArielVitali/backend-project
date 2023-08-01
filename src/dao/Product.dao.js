import productModel from "./models/Product.models.js";

class ProductDao {
  /* add new product */
  async addProduct(productData) {
    try {
      const response = await productModel.create(productData);
      return response;
    } catch (error) {
      return error;
    }
  }

  /* get all products */
  async getProducts() {
    try {
      const response = await productModel.find();
      return response;
    } catch (error) {
      return error;
    }
  }

  /* get product by id */
  async getProductById(id) {
    try {
      const response = await productModel.findById(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  /* update product */
  async updateProduct(id, productData) {
    try {
      const response = await productModel.updateOne(
        { _id: id },
        { $set: productData }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /* delete product */
  async deleteProduct(id) {
    try {
      const response = await productModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default ProductDao;

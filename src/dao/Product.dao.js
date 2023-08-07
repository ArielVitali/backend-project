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
  async getProducts(limit = 10, page = 1, query, sort, category, stock) {
    try {
      const options = {
        limit: parseInt(limit, 10),
        page: parseInt(page, 10),
      };

      //sort setting
      if (sort) {
        const sortOrder = sort.toLowerCase() === "asc" ? 1 : -1;
        options.sort = { price: sortOrder };
      }

      //query setting
      if (query) {
        const queryParts = query.split(":"); // Split the query at ":" to get field and value
        if (queryParts.length === 2) {
          const field = queryParts[0].trim();
          const value = queryParts[1].trim();

          const queryRegex = new RegExp(value, "i"); // Use regex with 'i' for case-insensitive matching
          query = {
            [field]: queryRegex,
          };
        }
      }

      // category setting
      if (category) {
        const categoryRegex = new RegExp(category, "i");
        query.category = categoryRegex;
      }

      // stock setting
      if (stock) {
        const stockValue = parseInt(stock, 10);
        query.stock = { $gte: stockValue };
      }

      // Perform the pagination using mongoose-paginate-v2
      const response = await productModel.paginate(query, options);
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
      console.log(id, productData);
      const response = await productModel.updateOne(
        { _id: id },
        { $set: productData }
      );
      console.log(response);
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

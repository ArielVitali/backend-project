import { Router } from "express";
import __dirname from "../Utils.js";
import ProductDao from "../dao/Product.dao.js";

const controllerProduct = Router();
//const path = __dirname + "/files/products.json";
const productManager = new ProductDao();

//get products
controllerProduct.get("/", async (req, res) => {
  try {
    const {
      limit = 10,
      page = 1,
      query,
      sort = "asc",
      category,
      stock,
    } = req.query;
    const response = await productManager.getProducts(
      limit,
      page,
      query,
      sort,
      category,
      stock
    );

    //const products = await productMaping(response);
    //res.render("index.handlebars", { products });
    //res.json({ products });

    let prevLink = null;
    let nextLink = null;
    let linkMold = req.protocol + "://" + req.get("host") + "/api/products/";

    if (response.hasPrevPage) {
      prevLink =
        req.protocol +
        "://" +
        req.get("host") +
        "/api/products" +
        "?" +
        `page=${response.prevPage}` +
        `&limit=${limit}&sort=${sort}`;
    }
    if (response.hasNextPage) {
      nextLink =
        req.protocol +
        "://" +
        req.get("host") +
        "/api/products" +
        "?" +
        `page=${response.nextPage}` +
        `&limit=${limit}&sort=${sort}`;
    }

    const mappedResponse = {
      status: "success",
      payload: response.docs,
      totalPages: response.totalPages,
      prevPage: response.prevPage,
      nextPage: response.nextPage,
      page: response.page,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink,
      linkMold: linkMold,
    };

    const products = await productMaping(mappedResponse.payload);
    res.render("products.handlebars", { products, mappedResponse });
  } catch (error) {
    console.log(error);
  }
});

//get products by id
controllerProduct.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const response = await productManager.getProductById(pid);
    const product = await productMaping(response);
    res.json({ product });
  } catch (error) {
    console.log(error);
  }
});

//add product
controllerProduct.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  const productData = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };

  const response = await productManager.addProduct(productData);
  //const product = await productMaping(response);

  //socketIO
  const products = await productManager.getProducts();
  global.io.emit("listOfproducts", products);
  res.json({ products });
});

//update product by id
controllerProduct.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.query;

  const productData = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };

  const response = await productManager.updateProduct(pid, productData);
  //const product = await productMaping(response);
  res.send(response);
});

//delete product by id
controllerProduct.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const response = await productManager.deleteProduct(pid);
  const deletedProduct = await productMaping(response);

  //socketIO
  const products = await productManager.getProducts();
  global.io.emit("listOfproducts", products);

  res.json({ deletedProduct, message: `Product deleted succesfully!` });
});

const productMaping = async (response) => {
  if (Array.isArray(response)) {
    return response.map((product) => ({
      id: product._id,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: product.status,
      stock: product.stock,
      category: product.category,
      thumbnails: product.thumbnails,
    }));
  } else {
    return {
      id: response._id,
      title: response.title,
      description: response.description,
      code: response.code,
      price: response.price,
      status: response.status,
      stock: response.stock,
      category: response.category,
      thumbnails: response.thumbnails,
    };
  }
};

export default controllerProduct;

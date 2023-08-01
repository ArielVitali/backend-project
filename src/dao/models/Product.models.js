import mongoose from "mongoose";

/* collection name */
const productCollection = "products";

/* schema */
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: Number,
  category: String,
  thumbnails: [String],
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;

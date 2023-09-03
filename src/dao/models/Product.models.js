import mongoose from "mongoose";

/* collection name */
const productCollection = "products";

/* schema */
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  code: String,
  price: { type: Number, required: true },
  status: Boolean,
  stock: Number,
  category: String,
  thumbnails: [String],
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;

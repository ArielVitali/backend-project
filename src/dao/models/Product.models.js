import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
  thumbnails: {
    type: Array,
    default: [],
  },
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);

export default productModel;

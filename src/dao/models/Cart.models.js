import mongoose from "mongoose";

/* collection name */
const cartCollection = "carts";

/* schema */
const cartSchema = new mongoose.Schema({
  products: [{ id: String, quantity: Number }],
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;

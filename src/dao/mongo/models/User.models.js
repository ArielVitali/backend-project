import mongoose from "mongoose";
import cartModel from "./Cart.models.js";

/* collection name */
const userCollection = "user";

/* schema */
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["admin", "user", "premium"],
    default: "user",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },
});

userSchema.pre("save", async function (next) {
  try {
    const newCart = await cartModel.create({});
    console.log(newCart);
    this.cart = newCart._id;
  } catch (error) {
    next(error);
  }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;

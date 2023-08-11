import mongoose from "mongoose";

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
    enum: ["admin", "user"],
    default: "user",
  },
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;

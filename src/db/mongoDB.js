import mongoose from "mongoose";

const uri =
  "mongodb+srv://admin:admin@ecommerce.vyfth9f.mongodb.net/?retryWrites=true&w=majority";

const mongoDBconnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(uri);
    console.log("db connected!");
  } catch (error) {
    console.log(`Error al conectar ${error}`);
  }
};

export default mongoDBconnect;

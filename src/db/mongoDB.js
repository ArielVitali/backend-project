import mongoose from "mongoose";
import { dbConfig } from "../config/db.config.js";

const { dbUser, dbPassword, dbHost, dbName } = dbConfig;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;

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

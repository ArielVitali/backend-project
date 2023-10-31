import mongoose from "mongoose";
import uuid from "uuid";

/* collection name */
const ticketCollection = "tickets";

/* schema */
const ticketSchema = new mongoose.Schema({
  code: { type: String, default: uuid.v1() },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: Number,
  purchaser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;

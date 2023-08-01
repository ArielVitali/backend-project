import mongoose from "mongoose";

/* collection name */
const messageCollection = "messages";

/* schema */
const messageSchema = new mongoose.Schema({
  messages: [
    {
      email: String,
      message: String,
    },
  ],
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export default messageModel;

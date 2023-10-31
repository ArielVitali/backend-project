import { Server } from "socket.io";
import middlewareModules from "../middleware/index.js";

const { publicAccessOnlyUsers } = middlewareModules;
const messages = [];

const socketIO = (httpServer) => {
  global.io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`New client with id: ${socket.id}`);

    socket.on("newUser", (user) => {
      socket.broadcast.emit("newUserConnected", user);
      socket.emit("allChats", messages);
    });

    socket.on("chatFromClient", (data) => {
      messages.push(data);
      io.emit("messageForChat", data);
    });
  });
};

export default socketIO;

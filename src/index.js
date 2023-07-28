import app from "./App.js";
import { Server } from "socket.io";
const PORT = 8080;
const messages = [];

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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

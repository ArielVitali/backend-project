import app from "./App.js";
import { Server } from "socket.io";
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`New client with id: ${socket.id}`);
});

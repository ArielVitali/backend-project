import app from "./App.js";
import { appConfig } from "./config/app.config.js";
import socketIO from "./socketIO/index.js";

const { port } = appConfig;

const httpServer = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

socketIO(httpServer);

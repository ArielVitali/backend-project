import { config } from "dotenv";

config();

export const appConfig = {
  persistence: process.env.PERSISTANCE || "mongo",
  port: process.env.PORT || "8080",
};

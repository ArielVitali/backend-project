import { config } from "dotenv";

config();

export const loggerConfig = {
  environment: process.env.ENV,
};

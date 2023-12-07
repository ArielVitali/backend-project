import { config } from "dotenv";

config();

export const emailConfig = {
  emailService: process.env.EMAIL_SERVICE,
  emailPort: process.env.EMAIL_PORT,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
};

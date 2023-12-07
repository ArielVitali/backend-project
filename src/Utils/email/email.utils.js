import nodemailer from "nodemailer";
import { emailConfig } from "../../config/email.config.js";

const { emailService, emailPort, emailUser, emailPass } = emailConfig;

export const transport = nodemailer.createTransport({
  service: emailService,
  port: emailPort,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

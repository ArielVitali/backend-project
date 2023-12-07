import { transport } from "../Utils/email/email.utils.js";
import { emailConfig } from "../config/email.config.js";
const { emailUser } = emailConfig;

class NodemailerAdapter {
  constructor() {}

  async sendEmail(newUserInfo, notifyForNewUser) {
    try {
      const mailOptions = {
        from: emailUser,
        to: newUserInfo.email,
        subject: notifyForNewUser.subject,
        html: notifyForNewUser.message,
      };

      await transport.sendMail(mailOptions);
      return "Email enviado";
    } catch (error) {
      throw error;
    }
  }
}

export default new NodemailerAdapter();

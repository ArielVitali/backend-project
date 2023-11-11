import { loggerConfig } from "../../config/logger.config.js";
const { environment } = loggerConfig;

let logger;

switch (environment) {
  case "development":
    logger = (await import("../Logger/dev.logger.js")).default;
    break;
  case "production":
    logger = (await import("../Logger/prod.logger.js")).default;
    break;
  default:
    logger = (await import("../Logger/dev.logger.js")).default;
    break;
}

export default logger;

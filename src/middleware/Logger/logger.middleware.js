import logger from "../../Utils/Logger/factory.logger.js";

const loggerMiddleware = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleString()}`
  );
  next();
};

export default loggerMiddleware;

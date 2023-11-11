import winston from "winston";

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "gray",
  },
};

const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevels.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: `${process.cwd()}/src/Utils/Logger/files/errors.log`,
      level: "error",
      format: winston.format.simple(),
    }),
  ],
});

export default logger;

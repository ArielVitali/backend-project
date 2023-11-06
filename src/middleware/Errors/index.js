import enumErrors from "../../Utils/Errors/enumErrors.js";

const errorHandler = (error, req, res, next) => {
  console.log(error.cause);

  switch (error.code) {
    case enumErrors.INVALID_TYPES_ERROR:
      res.json({ status: "error", error: error.name });
      break;
    case enumErrors.DATABASE_ERROR:
      res.json({ status: "error", error: error.name });
      break;
    case enumErrors.ROUTING_ERROR:
      res.json({ status: "error", error: error.name });
      break;

    default:
      res.json({ status: "error", error: "Error desconocido" });

      break;
  }

  next();
};

export default errorHandler;

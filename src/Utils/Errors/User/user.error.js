import CustomError from "../CustomError.js";
import enumErrors from "../enumErrors.js";
import generateErrorInfo from "../infoError.js";

const userError = (userInfo) => {
  CustomError.createError({
    name: "Error al crear el usuario",
    cause: generateErrorInfo(enumErrors.INVALID_TYPES_ERROR, userInfo),
    message: "Error por datos no válidos",
    code: enumErrors.INVALID_TYPES_ERROR,
  });
};

export default userError;

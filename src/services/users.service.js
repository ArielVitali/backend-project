import Store from "../Store/users.Store.js";
import cryptPassword from "../Utils/bcrypt/cryptPassword.js";
import validateAdminUser from "../Utils/bcrypt/validate.js";

const addUser = async (userData) => {
  try {
    const { first_name, last_name, email, age, password } = userData;

    const hashedPassword = await cryptPassword.createHash(password);

    const newUserInfo = async () => {
      if (validateAdminUser(email)) {
        return {
          first_name,
          last_name,
          email,
          age,
          password: hashedPassword,
          role: "admin",
        };
      } else {
        return {
          first_name,
          last_name,
          email,
          age,
          password: hashedPassword,
        };
      }
    };

    const response = await Store.addUser(await newUserInfo());
    return response;
  } catch (error) {
    return error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const response = await Store.getUserByEmail(email);
    return response;
  } catch (error) {
    return error;
  }
};

const getUserById = async (id) => {
  try {
    const response = await Store.getUserById(id);
    return response;
  } catch (error) {
    return error;
  }
};

const patchUserPassword = async (data) => {
  try {
    const { email, password } = data;

    const passwordHashed = cryptPassword.createHash(password);

    const response = await Store.patchUserPassword(email, passwordHashed);
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  addUser,
  getUserByEmail,
  getUserById,
  patchUserPassword,
};

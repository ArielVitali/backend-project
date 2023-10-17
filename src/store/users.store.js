import UserDao from "../dao/User.dao.js";

const Users = new UserDao();

const addUser = async (userData) => {
  try {
    const response = await Users.addUser(userData);
    return response;
  } catch (error) {
    return error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const response = await Users.getUserByEmail(email);

    return response;
  } catch (error) {
    return error;
  }
};

const getCartById = async (id) => {
  try {
    const response = await Users.getUserById(id);
    return response;
  } catch (error) {
    return error;
  }
};

const patchUserPassword = async (email, password) => {
  try {
    const response = await Users.patchUserPassword(email, password);
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  addUser,
  getUserByEmail,
  getCartById,
  patchUserPassword,
};

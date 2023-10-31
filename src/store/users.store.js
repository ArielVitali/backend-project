import repositories from "../repositories/index.js";
const { UsersRepository } = repositories;

const addUser = async (userData) => {
  try {
    const response = await UsersRepository.addUser(userData);
    return response;
  } catch (error) {
    return error;
  }
};

const getUserByEmail = async (email) => {
  try {
    console.log(UsersRepository);
    const response = await UsersRepository.getUserByEmail(email);

    return response;
  } catch (error) {
    return error;
  }
};

const getUserById = async (id) => {
  try {
    const response = await UsersRepository.getUserById(id);
    return response;
  } catch (error) {
    return error;
  }
};

const patchUserPassword = async (email, password) => {
  try {
    const response = await UsersRepository.patchUserPassword(email, password);
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

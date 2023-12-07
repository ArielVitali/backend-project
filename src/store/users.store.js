import repositories from "../repositories/index.js";
const { UsersRepository } = repositories;

class UserService {
  async addUser(userData) {
    try {
      const response = await UsersRepository.addUser(userData);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getUserByEmail(email) {
    try {
      const response = await UsersRepository.getUserByEmail(email);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getUserById(id) {
    try {
      const response = await UsersRepository.getUserById(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async patchUserPassword(email, password) {
    try {
      const response = await UsersRepository.patchUserPassword(email, password);
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateRole(email, newRole) {
    try {
      const response = await UsersRepository.updateRole(email, newRole);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new UserService();

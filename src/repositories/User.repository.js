class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async addUser(data) {
    try {
      const response = await this.dao.addUser(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      console.log("llegue al repository");
      const response = await this.dao.getUserByEmail(email);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const response = await this.dao.getUserById(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserByCartID(id) {
    try {
      const response = await this.dao.getUserByCartID(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async patchUserPassword(email, password) {
    try {
      const response = await this.dao.patchUserPassword(email, password);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepository;

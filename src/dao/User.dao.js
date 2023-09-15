import userModel from "../dao/models/User.models.js";

class UserDao {
  // add new user
  async addUser(userData) {
    try {
      const response = await userModel.create(userData);
      return response;
    } catch (error) {
      return error;
    }
  }

  //get user by email
  async getUserByEmail(email) {
    try {
      const response = await userModel.findOne({ email });
      return response;
    } catch (error) {
      return error;
    }
  }

  //patch user creds
  async patchUserPassword(email, password) {
    try {
      const response = await userModel.updateOne({ email }, { password });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default UserDao;
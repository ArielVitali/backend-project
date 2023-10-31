import UserDTO from "../DTOs/User.dto.js";

const getUser = async (user) => {
  try {
    const userInfo = new UserDTO(user);

    return userInfo.getUser();
  } catch (error) {
    throw error;
  }
};

export default {
  getUser,
};

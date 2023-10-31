class UserDTO {
  constructor(user) {
    console.log(user);
    (this.first_name = user.first_name),
      (this.last_name = user.last_name),
      (this.age = user.age),
      (this.email = user.email);
  }

  async getUser() {
    try {
      return {
        first_name: this.first_name,
        last_name: this.last_name,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default UserDTO;

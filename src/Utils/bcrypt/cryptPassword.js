import bcrypt from "bcrypt";

const createHash = (password) => {
  const salt = bcrypt.genSaltSync(10); // 10 is the number of rounds
  const passwordHashed = bcrypt.hashSync(password, salt);

  return passwordHashed;
};

const isValidPasswordMethod = (password, user) => {
  const isValid = bcrypt.compareSync(password, user.password);
  return isValid;
};

export default { createHash, isValidPasswordMethod };

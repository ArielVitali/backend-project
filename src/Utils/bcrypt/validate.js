const validateAdminUser = (user) => {
  if (user === "adminCoder@coder.com") {
    return true;
  } else {
    return false;
  }
};

export default validateAdminUser;

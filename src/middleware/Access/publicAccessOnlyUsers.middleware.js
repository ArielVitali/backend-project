function publicAccessOnlyUsers(req, res, next) {
  console.log(req.session);
  //si la persona ya tiene una sesion lo mando a profile
  if (req.session.user.role === "user");
  next();
}

export default publicAccessOnlyUsers;

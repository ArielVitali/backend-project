function privateAccess(req, res, next) {
  //si la persona no tiene una session lo mando al signup
  if (!req.session.user) return res.redirect("/login");
  next();
}

export default privateAccess;

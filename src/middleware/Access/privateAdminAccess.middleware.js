function privateAdminAccess(req, res, next) {
  //si la persona no tiene una session admin lo mando al signup
  if (req.session.user.role != "admin") return res.redirect("/api/products");
  next();
}

export default privateAdminAccess;

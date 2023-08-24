function publicAccess(req, res, next) {
  //si la persona ya tiene una sesion lo mando a profile
  if (req.session.user) return res.redirect("/api/products");
  next();
}

export default publicAccess;

function premiumAccess(req, res, next) {
  //si la persona ya tiene una sesion lo mando a profile
  if (req.session.user.role === "premium") return res.redirect("/api/products");
  next();
}

export default premiumAccess;

import { Router } from "express";
import userService from "../services/users.service.js";
import passport from "passport";

const router = Router();

//login auth
router.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/failLogin" }),
  async (req, res) => {
    try {
      if (!req.user) return res.status(400).json({ error: "Creds invalidas" });

      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
      };

      res.send({ message: "Login successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/failLogin", (req, res) => {
  res.json({ error: "fallo el login" });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    //en el caso de que todo vaya bien se redirige a la githubcallback
  }
);

router.get(
  "/githubcallback",
  passport.authenticate("github"),
  async (req, res) => {
    try {
      req.session.user = req.user;
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  }
);

//logout auth
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });
  });
  res.redirect("/login");
});

//forgot pass auth | HACER UNA STRATEGY PARA ESTO
router.patch("/forgotPassword", async (req, res) => {
  try {
    await userService.patchUserPassword(req.body);

    res.json({ message: "contrasena actualizada" });
  } catch (error) {
    console.log(error);
  }
});

export default router;

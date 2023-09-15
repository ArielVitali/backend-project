import { Router } from "express";
import UserDao from "../dao/User.dao.js";
import cryptPassword from "../Utils/bcrypt/cryptPassword.js";

const router = Router();
const userManager = new UserDao();

//login auth
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userManager.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "El user y password no coinciden" });
    }

    const isValidPassword = cryptPassword.isValidPasswordMethod(password, user);

    if (!isValidPassword) {
      return res.status(400).json({ error: "El user y password no coinciden" });
    }

    req.session.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    res.json({ message: "Sesion iniciada" });
    //res.redirect("/"); intentar redirigir a products pero no funciono. Me tira un error.
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//logout auth
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });
  });
  res.redirect("/login");
});

//forgot pass auth
router.patch("/forgotPassword", async (req, res) => {
  try {
    const { email, password } = req.body;

    const passwordHashed = cryptPassword.createHash(password);

    await userManager.patchUserPassword(email, passwordHashed);

    res.json({ message: "contrasena actualizada" });
  } catch (error) {
    console.log(error);
  }
});

export default router;

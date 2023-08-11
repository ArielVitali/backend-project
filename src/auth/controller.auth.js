import { Router } from "express";
import UserDao from "../dao/User.dao.js";

const router = Router();
const userManager = new UserDao();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userManager.getUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(400).json({ error: "El user y password no coinciden" });
    }

    req.session.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
    res.json({ message: "Sesion iniciada" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });
  });
  res.redirect("/login");
});

export default router;

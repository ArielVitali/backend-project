import { Router } from "express";
import passport from "passport";

const router = Router();

//signup of new user
router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/failRegister" }),
  async (req, res) => {
    try {
      res.send({ message: "Signup successfully" });
    } catch (error) {
      //si no manejo este error se cae el server
      if (error.code === 11000)
        return res.status(400).json({ error: "El usuario ya existe" });
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

router.get("/failRegister", async (req, res) => {
  console.log("Fallo el registro");
  res.send("Fallo el registro");
});

export default router;

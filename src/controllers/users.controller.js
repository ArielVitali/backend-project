import { Router } from "express";
import passport from "passport";
import usersService from "../services/users.service.js";

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

router.get("/premium/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await usersService.getUserByEmail(email);
    console.log(user.role);
    if (user.role == "USER") {
      await usersService.updateRole(email, "PREMIUM");
      res.send({ message: "Usuario actualizado" });
    } else if (user.role == "PREMIUM") {
      await userBD.updateRole(email, "USER");
      res.send({ message: "Usuario actualizado" });
    } else {
      res.send({ message: "Usuario No actualizado" });
    }
  } catch (error) {
    res.send(`something went wrong ${error}`);
  }
});

router.get("/failRegister", async (req, res) => {
  console.log("Fallo el registro");
  res.send("Fallo el registro");
});

export default router;

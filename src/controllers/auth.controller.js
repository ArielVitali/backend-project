import { Router } from "express";
import userService from "../services/users.service.js";
import passport from "passport";
import nodemailerAdapter from "../Adapters/nodemailer.adapter.js";
import cryptPassword from "../Utils/bcrypt/cryptPassword.js";

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

router.post("/passwordReset", async (req, res) => {
  try {
    console.log("llego acaaaaaa");
    const expirationTime = new Date().getTime() + 3600000;
    let linkMold = req.protocol + "://" + req.get("host");
    const url = linkMold + `/passwordReset/${expirationTime}`;
    const email = { email: req.body.user };
    req.session.destroy;
    req.session.expirationTime = expirationTime;
    req.session.email = email;
    const mensaje = {
      message: `<div> <h1>Hola!</h1> <h2>Este es el link para recuperar tu contreseña</h2> <h3> ${url}</h3> </div>`,
      subject: "Recuperacion  de contraseña",
    };
    console.log("llego aca");
    const emailSend = await nodemailerAdapter.sendEmail(email, mensaje);
    console.log(emailSend);
    res.json({ emailSend });
  } catch (error) {
    res.send(`something went wrong ${error}`);
  }
});

router.post("/passwordUpdate", async (req, res) => {
  try {
    const pw1 = req.body.newPaswword1;
    const pw2 = req.body.newPaswword2;
    const email = req.session.email.email;
    const user = await userService.getUserByEmail(email);
    if (pw1 === pw2) {
      if (cryptPassword.isValidPasswordMethod(pw1, user)) {
        console.log("contraseña igual a la anterior");
        res.json({
          mesagge: "Contraseña igual a la anterior, usar una nueva.",
        });
      } else {
        await userService.updatePassword(email, cryptPassword.createHash(pw1));
        res.json({ mesagge: "Contraseña actualizada" });
      }
    } else {
      res.json({ mesagge: "Contraseñas no coinciden." });
    }
  } catch (error) {
    res.send(`something went wrong ${error}`);
  }
});

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

export default router;

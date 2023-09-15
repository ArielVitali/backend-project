import { Router } from "express";
import UserDao from "../dao/User.dao.js";
import cryptPassword from "../Utils/bcrypt/cryptPassword.js";

const router = Router();
const userManager = new UserDao();

//signup of new user
router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, age, email, password } = req.body;

    const passwordHashed = cryptPassword.createHash(password);

    const newUserInfo = {
      first_name,
      last_name,
      age,
      email,
      password: passwordHashed,
    };

    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      newUserInfo.role = "admin";
    }

    const newUser = await userManager.addUser(newUserInfo);
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
});

export default router;

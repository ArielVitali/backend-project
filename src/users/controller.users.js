import { Router } from "express";
import UserDao from "../dao/User.dao.js";

const router = Router();
const userManager = new UserDao();

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, age, email, password } = req.body;

    const newUserInfo = {
      first_name,
      last_name,
      age,
      email,
      password,
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

import { Router } from "express";
import middlewareModules from "../middleware/Access/index.js";
import sessionService from "../services/session.service.js";

const { getUser } = sessionService;
const { privateAccess } = middlewareModules;
const router = Router();

router.get("/current", privateAccess, async (req, res) => {
  try {
    const userInfo = await getUser(req.session.user);
    res.json({ user: userInfo });
  } catch (error) {
    throw error;
  }
});

export default router;

import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
export default router;

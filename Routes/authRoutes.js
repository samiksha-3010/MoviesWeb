import express from "express";
import { getCurrentUser, Login, Register } from "../Controolers/User.Controolers.js";

const router = express.Router();

router.post("/register", Register)
router.post("/login", Login)
router.get("/getCurrentUser", getCurrentUser)

export default router;

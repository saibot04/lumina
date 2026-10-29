import { Router } from "express";
import { registro, login, logout, yo } from "../controllers/auth.controller.js";
import { requiereSesion } from "../middlewares/requiereSesion.js";

const router = Router();

router.post("/registro", registro);
router.post("/login", login);
router.post("/logout", requiereSesion, logout);
router.get("/yo", requiereSesion, yo);

export default router;
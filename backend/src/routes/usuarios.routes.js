import { Router } from "express";
import {
verPerfil,
editarPerfil,
cambiarPassword,
} from "../controllers/usuarios.controller.js";
import { requiereSesion } from "../middlewares/requiereSesion.js";

const router = Router();

// Todo lo de este archivo exige sesión
router.use(requiereSesion);

router.get("/yo", verPerfil);
router.patch("/yo", editarPerfil);
router.put("/yo/password", cambiarPassword);

export default router;
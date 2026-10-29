import { Router } from "express";
import { listar, detalle } from "../controllers/peliculas.controller.js";

const router = Router();

router.get("/", listar);
router.get("/:id", detalle);

export default router;
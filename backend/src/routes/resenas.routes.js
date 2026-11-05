import { Router } from "express";
import {
publicar,
editar,
eliminar,
miResena,
misResenas,
estadoDeshacer,
deshacer,
} from "../controllers/resenas.controller.js";
import { requiereSesion } from "../middlewares/requiereSesion.js";

const router = Router();

router.get("/peliculas/:id/resenas/mia", requiereSesion, miResena);
router.post("/peliculas/:id/resenas", requiereSesion, publicar);
router.patch("/peliculas/:id/resenas/mia", requiereSesion, editar);
router.delete("/peliculas/:id/resenas/mia", requiereSesion, eliminar);

router.get("/resenas/mias", requiereSesion, misResenas);
router.get("/resenas/deshacer", requiereSesion, estadoDeshacer);
router.post("/resenas/deshacer", requiereSesion, deshacer);

export default router;
import Comando from "./Comando.js";
import * as Resena from "../models/resena.model.js";
import { ErrorNegocio } from "../utils/errores.js";

export default class EliminarResenaCommand extends Comando {
get tipo() {
    return "eliminar";
}

async ejecutar(q) {
    this.antes = await Resena.eliminar(this.usuarioId, this.peliculaId, q);
    if (!this.antes) {
    throw new ErrorNegocio(404, "Todavía no reseñaste esta película.");
    }

    this.despues = null;
    return null;
}

// Deshacer una eliminación = volver a crear la reseña tal como estaba
async deshacer(q) {
    if (!this.antes) return;
    await Resena.insertar(
    {
        usuarioId: this.usuarioId,
        peliculaId: this.peliculaId,
        puntuacion: this.antes.puntuacion,
        texto: this.antes.texto,
        creadoEn: this.antes.creadoEn,
    },
    q
    );
}
}
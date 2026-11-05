import Comando from "./Comando.js";
import * as Resena from "../models/resena.model.js";
import { ErrorNegocio } from "../utils/errores.js";

export default class EditarResenaCommand extends Comando {
constructor({ puntuacion, texto, ...resto }) {
    super(resto);
    this.puntuacion = puntuacion;
    this.texto = texto;
}

get tipo() {
    return "editar";
}

async ejecutar(q) {
    this.antes = await Resena.buscar(this.usuarioId, this.peliculaId, q);
    if (!this.antes) {
    throw new ErrorNegocio(404, "Todavía no reseñaste esta película.");
    }

    this.despues = await Resena.actualizar(
    this.usuarioId,
    this.peliculaId,
    { puntuacion: this.puntuacion, texto: this.texto },
    q
    );
    return this.despues;
}

// Deshacer una edición = volver a los valores de antes
async deshacer(q) {
    if (!this.antes) return;
    await Resena.actualizar(
    this.usuarioId,
    this.peliculaId,
    { puntuacion: this.antes.puntuacion, texto: this.antes.texto },
    q
    );
}
}
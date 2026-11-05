import Comando from "./Comando.js";
import * as Resena from "../models/resena.model.js";
import { ErrorNegocio } from "../utils/errores.js";

export default class PublicarResenaCommand extends Comando {
constructor({ puntuacion, texto, ...resto }) {
    super(resto);
    this.puntuacion = puntuacion;
    this.texto = texto;
}

get tipo() {
    return "publicar";
}

async ejecutar(q) {
    const existente = await Resena.buscar(this.usuarioId, this.peliculaId, q);
    if (existente) {
    throw new ErrorNegocio(409, "Ya reseñaste esta película. Podés editar tu reseña.");
    }

    this.antes = null;
    this.despues = await Resena.insertar(
    {
        usuarioId: this.usuarioId,
        peliculaId: this.peliculaId,
        puntuacion: this.puntuacion,
        texto: this.texto,
    },
    q
    );
    return this.despues;
}

// Deshacer una publicación = borrar la reseña que se había creado
async deshacer(q) {
    await Resena.eliminar(this.usuarioId, this.peliculaId, q);
}
}
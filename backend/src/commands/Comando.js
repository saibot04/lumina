export default class Comando {
constructor({ usuarioId, peliculaId, antes = null, despues = null }) {
    this.usuarioId = usuarioId;
    this.peliculaId = peliculaId;
    this.antes = antes; // cómo estaba la reseña antes de ejecutar
    this.despues = despues; // cómo quedó después
}

get tipo() {
    throw new Error("Cada comando define su tipo");
}

async ejecutar() {
    throw new Error("Cada comando implementa ejecutar");
}

async deshacer() {
    throw new Error("Cada comando implementa deshacer");
}
}
import * as Resena from "../models/resena.model.js";
import * as Historial from "../commands/HistorialComandos.js";
import PublicarResenaCommand from "../commands/PublicarResenaCommand.js";
import EditarResenaCommand from "../commands/EditarResenaCommand.js";
import EliminarResenaCommand from "../commands/EliminarResenaCommand.js";
import { ErrorNegocio } from "../utils/errores.js";

function idPelicula(req) {
const id = Number(req.params.id);
if (!Number.isInteger(id) || id < 1) {
    throw new ErrorNegocio(404, "Película no encontrada");
}
return id;
}

async function verificarPelicula(id) {
if (!(await Resena.existePelicula(id))) {
    throw new ErrorNegocio(404, "Película no encontrada");
}
}

// HU-08 y HU-09: puntuación de 0,5 a 5 en saltos de 0,5; texto opcional con tope
function leerDatos(body) {
const puntuacion = Number(body.puntuacion);
const texto = String(body.texto ?? "").trim();
const errores = {};

if (
    !Number.isFinite(puntuacion) ||
    puntuacion < 0.5 ||
    puntuacion > 5 ||
    (puntuacion * 2) % 1 !== 0
) {
    errores.puntuacion = "La puntuación va de 0,5 a 5, en saltos de 0,5.";
}
if (texto.length > 500) {
    errores.texto = "La reseña puede tener hasta 500 caracteres.";
}

return { puntuacion, texto, errores };
}

export async function publicar(req, res) {
const peliculaId = idPelicula(req);
const { puntuacion, texto, errores } = leerDatos(req.body ?? {});
if (Object.keys(errores).length > 0) {
    return res.status(400).json({ errores });
}
await verificarPelicula(peliculaId);

const resena = await Historial.ejecutar(
    new PublicarResenaCommand({ usuarioId: req.usuario.id, peliculaId, puntuacion, texto })
);
res.status(201).json(resena);
}

export async function editar(req, res) {
const peliculaId = idPelicula(req);
const { puntuacion, texto, errores } = leerDatos(req.body ?? {});
if (Object.keys(errores).length > 0) {
    return res.status(400).json({ errores });
}

const resena = await Historial.ejecutar(
    new EditarResenaCommand({ usuarioId: req.usuario.id, peliculaId, puntuacion, texto })
);
res.json(resena);
}

export async function eliminar(req, res) {
const peliculaId = idPelicula(req);
await Historial.ejecutar(
    new EliminarResenaCommand({ usuarioId: req.usuario.id, peliculaId })
);
res.status(204).end();
}

export async function miResena(req, res) {
const peliculaId = idPelicula(req);
res.json(await Resena.buscar(req.usuario.id, peliculaId));
}

export async function misResenas(req, res) {
res.json(await Resena.deUsuario(req.usuario.id));
}

// HU-11: sirve para habilitar o deshabilitar el botón "Deshacer"
export async function estadoDeshacer(req, res) {
const ultimo = await Historial.ultimoPendiente(req.usuario.id);
res.json({
    puedeDeshacer: Boolean(ultimo),
    ultima: ultimo
    ? {
        tipo: ultimo.tipo,
        peliculaId: String(ultimo.pelicula_id),
        titulo: ultimo.titulo,
        }
    : null,
});
}

export async function deshacer(req, res) {
const resultado = await Historial.deshacerUltimo(req.usuario.id);
if (!resultado) {
    return res.status(409).json({ error: "No hay acciones para deshacer." });
}
res.json(resultado);
}
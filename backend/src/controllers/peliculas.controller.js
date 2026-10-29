import * as Pelicula from "../models/pelicula.model.js";

export async function listar(req, res) {
const genero = req.query.genero || null;
const pagina = Math.max(parseInt(req.query.pagina) || 1, 1);
const limite = Math.min(Math.max(parseInt(req.query.limite) || 12, 1), 50);

const { datos, total } = await Pelicula.listar({ genero, pagina, limite });

res.json({
    datos,
    pagina,
    limite,
    total,
    totalPaginas: Math.ceil(total / limite),
});
}

export async function detalle(req, res) {
const id = Number(req.params.id);

if (!Number.isInteger(id) || id < 1) {
    return res.status(404).json({ error: "Película no encontrada" });
}

const pelicula = await Pelicula.obtenerPorId(id);

if (!pelicula) {
    return res.status(404).json({ error: "Película no encontrada" });
}

res.json(pelicula);
}
import { query } from "../config/db.js";

const COLUMNAS = "id, usuario_id, pelicula_id, puntuacion, texto, creado_en";

function formatear(fila) {
if (!fila) return null;
return {
    id: fila.id,
    usuarioId: fila.usuario_id,
    peliculaId: fila.pelicula_id,
    puntuacion: Number(fila.puntuacion),
    texto: fila.texto ?? "",
    creadoEn: fila.creado_en,
};
}

export async function existePelicula(id, q = query) {
const r = await q("SELECT 1 FROM peliculas WHERE id = $1", [id]);
return r.rows.length > 0;
}

export async function buscar(usuarioId, peliculaId, q = query) {
const r = await q(
    `SELECT ${COLUMNAS} FROM resenas WHERE usuario_id = $1 AND pelicula_id = $2`,
    [usuarioId, peliculaId]
);
return formatear(r.rows[0]);
}

export async function insertar(
{ usuarioId, peliculaId, puntuacion, texto, creadoEn },
q = query
) {
const r = await q(
    `INSERT INTO resenas (usuario_id, pelicula_id, puntuacion, texto, creado_en)
    VALUES ($1, $2, $3, $4, COALESCE($5::timestamptz, NOW()))
    RETURNING ${COLUMNAS}`,
    [usuarioId, peliculaId, puntuacion, texto || null, creadoEn ?? null]
);
return formatear(r.rows[0]);
}

export async function actualizar(
usuarioId,
peliculaId,
{ puntuacion, texto },
q = query
) {
const r = await q(
    `UPDATE resenas SET puntuacion = $3, texto = $4
    WHERE usuario_id = $1 AND pelicula_id = $2
    RETURNING ${COLUMNAS}`,
    [usuarioId, peliculaId, puntuacion, texto || null]
);
return formatear(r.rows[0]);
}

export async function eliminar(usuarioId, peliculaId, q = query) {
const r = await q(
    `DELETE FROM resenas WHERE usuario_id = $1 AND pelicula_id = $2
    RETURNING ${COLUMNAS}`,
    [usuarioId, peliculaId]
);
return formatear(r.rows[0]);
}

export async function deUsuario(usuarioId) {
const r = await query(
    `SELECT r.id, r.pelicula_id, p.titulo, p.poster, r.puntuacion, r.texto, r.creado_en
    FROM resenas r JOIN peliculas p ON p.id = r.pelicula_id
    WHERE r.usuario_id = $1
    ORDER BY r.creado_en DESC`,
    [usuarioId]
);
return r.rows.map((f) => ({
    id: f.id,
    peliculaId: String(f.pelicula_id),
    titulo: f.titulo,
    poster: f.poster,
    puntuacion: Number(f.puntuacion),
    texto: f.texto ?? "",
    fecha: f.creado_en.toISOString().slice(0, 10),
}));
}
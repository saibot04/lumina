import { query } from "../config/db.js";

// $1 = slug del género (o null para no filtrar)
const FILTRO_GENERO = `
($1::text IS NULL OR EXISTS (
    SELECT 1 FROM pelicula_genero pg
    JOIN generos g ON g.id = pg.genero_id
    WHERE pg.pelicula_id = p.id AND g.slug = $1
))`;

export async function listar({ genero, pagina, limite }) {
const offset = (pagina - 1) * limite;

const [lista, conteo] = await Promise.all([
    query(
    `SELECT p.id, p.titulo, p.anio, p.duracion, p.sinopsis, p.poster,
        COALESCE((
        SELECT ARRAY_AGG(g.nombre ORDER BY g.nombre)
        FROM pelicula_genero pg JOIN generos g ON g.id = pg.genero_id
        WHERE pg.pelicula_id = p.id
        ), '{}') AS generos,
        (SELECT ROUND(AVG(r.puntuacion), 1) FROM resenas r WHERE r.pelicula_id = p.id) AS promedio,
        (SELECT COUNT(*) FROM resenas r WHERE r.pelicula_id = p.id)::int AS votos
    FROM peliculas p
    WHERE ${FILTRO_GENERO}
    ORDER BY p.id
    LIMIT $2 OFFSET $3`,
    [genero, limite, offset]
    ),
    query(`SELECT COUNT(*)::int AS total FROM peliculas p WHERE ${FILTRO_GENERO}`, [genero]),
]);

return {
    datos: lista.rows.map((f) => ({
    id: String(f.id),
    title: f.titulo,
    year: f.anio,
    duration: f.duracion,
    synopsis: f.sinopsis,
    poster: f.poster,
    genres: f.generos,
    rating: f.promedio === null ? undefined : Number(f.promedio),
    votes: f.votos,
    })),
    total: conteo.rows[0].total,
};
}

export async function obtenerPorId(id) {
const pelicula = await query("SELECT * FROM peliculas WHERE id = $1", [id]);
if (pelicula.rows.length === 0) return null;
const p = pelicula.rows[0];

const [generos, elenco, resenas] = await Promise.all([
    query(
    `SELECT g.nombre FROM pelicula_genero pg
    JOIN generos g ON g.id = pg.genero_id
    WHERE pg.pelicula_id = $1 ORDER BY g.nombre`,
    [id]
    ),
    query(
    `SELECT pe.nombre, e.personaje FROM elenco e
    JOIN personas pe ON pe.id = e.persona_id
    WHERE e.pelicula_id = $1 AND e.rol = 'actor' ORDER BY e.id`,
    [id]
    ),
    query(
    `SELECT u.nombre_usuario AS usuario, r.puntuacion, r.texto, r.creado_en
    FROM resenas r JOIN usuarios u ON u.id = r.usuario_id
    WHERE r.pelicula_id = $1 ORDER BY r.creado_en DESC`,
    [id]
    ),
]);

return {
    id: String(p.id),
    title: p.titulo,
    year: p.anio,
    duration: p.duracion,
    synopsis: p.sinopsis,
    poster: p.poster,
    backdrop: p.backdrop,
    trailerKey: p.trailer_key,
    genres: generos.rows.map((g) => g.nombre),
    cast: elenco.rows.map((c) => ({ nombre: c.nombre, personaje: c.personaje ?? "" })),
    reviews: resenas.rows.map((r) => ({
    usuario: r.usuario,
    puntuacion: Number(r.puntuacion),
    texto: r.texto ?? "",
    fecha: r.creado_en.toISOString().slice(0, 10),
    })),
};
}
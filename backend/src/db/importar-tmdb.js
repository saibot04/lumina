import "dotenv/config";
import pg from "pg";

const token = process.env.TMDB_TOKEN;

if (!token) {
console.error("Falta TMDB_TOKEN en el .env");
process.exit(1);
}

const esClaveCorta = token.length < 60;
const IMG = "https://image.tmdb.org/t/p";

async function tmdb(ruta, params = {}) {
const url = new URL(`https://api.themoviedb.org/3${ruta}`);
for (const [clave, valor] of Object.entries(params)) {
    url.searchParams.set(clave, valor);
}
if (esClaveCorta) url.searchParams.set("api_key", token);

const res = await fetch(url, {
    headers: esClaveCorta ? {} : { Authorization: `Bearer ${token}` },
});
if (!res.ok) throw new Error(`TMDB respondió ${res.status} en ${ruta}`);
return res.json();
}

const pausa = (ms) => new Promise((resolver) => setTimeout(resolver, ms));

// Busca la película por título y año; acepta un año de diferencia
async function buscarId(titulo, anio) {
const intentos = [{ query: titulo, year: anio }, { query: titulo }];

for (const params of intentos) {
    const datos = await tmdb("/search/movie", { ...params, language: "es-ES" });
    const coincidencia = datos.results.find((r) => {
    const anioTmdb = Number(r.release_date?.slice(0, 4));
    return Math.abs(anioTmdb - anio) <= 1;
    });
    if (coincidencia) return coincidencia.id;
}
return null;
}

// Prefiere tráiler en español, después en inglés, después cualquiera
function elegirTrailer(videos) {
const trailers = videos.filter((v) => v.site === "YouTube" && v.type === "Trailer");
const elegido =
    trailers.find((v) => v.iso_639_1 === "es") ??
    trailers.find((v) => v.iso_639_1 === "en") ??
    trailers[0];
return elegido?.key ?? null;
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

try {
const { rows: peliculas } = await client.query(
    "SELECT id, titulo, anio FROM peliculas ORDER BY id"
);

let completadas = 0;
const sinDatos = [];

for (const p of peliculas) {
    try {
    const tmdbId = await buscarId(p.titulo, p.anio);

    if (!tmdbId) {
        sinDatos.push(p.titulo);
        console.log(`- ${p.titulo}: sin coincidencia en TMDB`);
        continue;
    }

    const d = await tmdb(`/movie/${tmdbId}`, {
        language: "es-ES",
        append_to_response: "videos,credits",
        include_video_language: "es,en",
    });

    const poster = d.poster_path ? `${IMG}/w500${d.poster_path}` : null;
    const backdrop = d.backdrop_path ? `${IMG}/w1280${d.backdrop_path}` : null;
    const trailer = elegirTrailer(d.videos?.results ?? []);

    await client.query("BEGIN");

    await client.query(
        `UPDATE peliculas
        SET tmdb_id = $1,
            sinopsis = COALESCE(NULLIF($2::text, ''), sinopsis),
            duracion = COALESCE(NULLIF($3::int, 0), duracion),
            poster = $4,
            backdrop = $5,
            trailer_key = $6
        WHERE id = $7`,
        [tmdbId, d.overview, d.runtime ?? 0, poster, backdrop, trailer, p.id]
    );

    // Se vuelve a armar el elenco, así el script se puede correr más de una vez
    await client.query("DELETE FROM elenco WHERE pelicula_id = $1", [p.id]);

    const directores = (d.credits?.crew ?? [])
        .filter((c) => c.job === "Director")
        .slice(0, 2)
        .map((c) => ({ nombre: c.name, foto: c.profile_path, rol: "director", personaje: null }));

    const actores = (d.credits?.cast ?? []).slice(0, 8).map((c) => ({
        nombre: c.name,
        foto: c.profile_path,
        rol: "actor",
        personaje: c.character ? c.character.slice(0, 100) : null,
    }));

    for (const persona of [...directores, ...actores]) {
        const nombre = persona.nombre.slice(0, 100);
        const foto = persona.foto ? `${IMG}/w185${persona.foto}` : null;

        const existente = await client.query(
        "SELECT id FROM personas WHERE nombre = $1",
        [nombre]
        );

        let personaId = existente.rows[0]?.id;

        if (personaId) {
        await client.query(
            "UPDATE personas SET foto = COALESCE(foto, $1) WHERE id = $2",
            [foto, personaId]
        );
        } else {
        const nueva = await client.query(
            "INSERT INTO personas (nombre, foto) VALUES ($1, $2) RETURNING id",
            [nombre, foto]
        );
        personaId = nueva.rows[0].id;
        }

        await client.query(
        `INSERT INTO elenco (pelicula_id, persona_id, rol, personaje)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT DO NOTHING`,
        [p.id, personaId, persona.rol, persona.personaje]
        );
    }

    await client.query("COMMIT");
    completadas++;
    console.log(`✓ ${p.titulo}${trailer ? "" : " (sin tráiler)"}`);
    } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    sinDatos.push(p.titulo);
    console.error(`✗ ${p.titulo}: ${error.message}`);
    }

    await pausa(300); // para no pasarse del límite de pedidos
}

console.log(`\nListo: ${completadas} de ${peliculas.length} películas completadas.`);
if (sinDatos.length > 0) {
    console.log("Sin completar:", sinDatos.join(", "));
}
} finally {
await client.end();
}
import { query, transaccion } from "../config/db.js";
import { crearComando } from "./index.js";

/** Ejecuta un comando y deja constancia en el historial, todo en una transacción. */
export async function ejecutar(comando) {
return transaccion(async (q) => {
    const resultado = await comando.ejecutar(q);

    await q(
    `INSERT INTO comandos_resena (usuario_id, pelicula_id, tipo, antes, despues)
    VALUES ($1, $2, $3, $4::jsonb, $5::jsonb)`,
    [
        comando.usuarioId,
        comando.peliculaId,
        comando.tipo,
        JSON.stringify(comando.antes),
        JSON.stringify(comando.despues),
    ]
    );

    return resultado;
});
}

/** La última acción del usuario que todavía no fue deshecha (o null). */
export async function ultimoPendiente(usuarioId) {
const r = await query(
    `SELECT c.id, c.tipo, c.pelicula_id, p.titulo
    FROM comandos_resena c JOIN peliculas p ON p.id = c.pelicula_id
    WHERE c.usuario_id = $1 AND c.deshecho_en IS NULL
    ORDER BY c.id DESC LIMIT 1`,
    [usuarioId]
);
return r.rows[0] ?? null;
}

/** Deshace la última acción pendiente del usuario. Devuelve null si no hay ninguna. */
export async function deshacerUltimo(usuarioId) {
return transaccion(async (q) => {
    // FOR UPDATE evita que dos pedidos simultáneos deshagan la misma acción
    const r = await q(
    `SELECT c.id, c.tipo, c.pelicula_id, c.antes, c.despues, p.titulo
    FROM comandos_resena c JOIN peliculas p ON p.id = c.pelicula_id
    WHERE c.usuario_id = $1 AND c.deshecho_en IS NULL
    ORDER BY c.id DESC LIMIT 1
    FOR UPDATE OF c`,
    [usuarioId]
    );

    const registro = r.rows[0];
    if (!registro) return null;

    const comando = crearComando(registro.tipo, {
    usuarioId,
    peliculaId: registro.pelicula_id,
    antes: registro.antes,
    despues: registro.despues,
    });

    await comando.deshacer(q);
    await q("UPDATE comandos_resena SET deshecho_en = NOW() WHERE id = $1", [
    registro.id,
    ]);

    return {
    tipo: registro.tipo,
    peliculaId: String(registro.pelicula_id),
    titulo: registro.titulo,
    };
});
}
import { query } from "../config/db.js";

export async function crear({ nombreUsuario, email, passwordHash }) {
const resultado = await query(
    `INSERT INTO usuarios (nombre_usuario, email, password_hash, rol)
    VALUES ($1, $2, $3, 'usuario')
    RETURNING id, nombre_usuario, email, rol`,
    [nombreUsuario, email, passwordHash]
);
return resultado.rows[0];
}

export async function buscarPorEmail(email) {
const resultado = await query(
    `SELECT id, nombre_usuario, email, rol, password_hash
    FROM usuarios WHERE email = $1`,
    [email]
);
return resultado.rows[0] ?? null;
}

const COLUMNAS_PERFIL =
    "id, nombre_usuario, email, rol, nombre_mostrado, bio, creado_en";

export async function buscarPorId(id) {
const resultado = await query(
    `SELECT ${COLUMNAS_PERFIL} FROM usuarios WHERE id = $1`,
    [id]
);
return resultado.rows[0] ?? null;
}

export async function estadisticas(id) {
const resultado = await query(
    `SELECT
    (SELECT COUNT(*) FROM vistas  WHERE usuario_id = $1)::int AS vistas,
    (SELECT COUNT(*) FROM resenas WHERE usuario_id = $1)::int AS resenas`,
    [id]
);
return resultado.rows[0];
}

export async function actualizarPerfil(
id,
{ nombreUsuario, email, nombreMostrado, bio }
) {
const resultado = await query(
    `UPDATE usuarios
    SET nombre_usuario = $2, email = $3, nombre_mostrado = $4, bio = $5
    WHERE id = $1
    RETURNING ${COLUMNAS_PERFIL}`,
    [id, nombreUsuario, email, nombreMostrado, bio]
);
return resultado.rows[0];
}

export async function obtenerHash(id) {
const resultado = await query(
    "SELECT password_hash FROM usuarios WHERE id = $1",
    [id]
);
return resultado.rows[0]?.password_hash ?? null;
}

export async function cambiarPasswordHash(id, passwordHash) {
await query("UPDATE usuarios SET password_hash = $2 WHERE id = $1", [
    id,
    passwordHash,
]);
}
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
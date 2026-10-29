import crypto from "node:crypto";
import { query } from "../config/db.js";

const hashear = (token) =>
crypto.createHash("sha256").update(token).digest("hex");

export async function crear(usuarioId) {
const token = crypto.randomBytes(32).toString("hex");
await query(
    `INSERT INTO sesiones (token_hash, usuario_id, expira_en)
    VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
    [hashear(token), usuarioId]
);
return token;
}

export async function usuarioDeToken(token) {
const resultado = await query(
    `SELECT u.id, u.nombre_usuario, u.email, u.rol
    FROM sesiones s JOIN usuarios u ON u.id = s.usuario_id
    WHERE s.token_hash = $1 AND s.expira_en > NOW()`,
    [hashear(token)]
);
return resultado.rows[0] ?? null;
}

export async function eliminar(token) {
await query("DELETE FROM sesiones WHERE token_hash = $1", [hashear(token)]);
}
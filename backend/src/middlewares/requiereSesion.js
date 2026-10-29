import * as Sesion from "../models/sesion.model.js";

export async function requiereSesion(req, res, next) {
const encabezado = req.headers.authorization ?? "";
const token = encabezado.startsWith("Bearer ") ? encabezado.slice(7) : null;
const usuario = token ? await Sesion.usuarioDeToken(token) : null;

if (!usuario) {
    return res.status(401).json({ error: "Necesitás iniciar sesión." });
}

req.usuario = usuario;
req.token = token;
next();
}
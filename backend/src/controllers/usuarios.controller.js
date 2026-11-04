import bcrypt from "bcryptjs";
import * as Usuario from "../models/usuario.model.js";
import * as Sesion from "../models/sesion.model.js";
import {
errorNombreUsuario,
errorEmail,
errorPassword,
} from "../utils/validaciones.js";

function formatear(u, estadisticas) {
return {
    id: String(u.id),
    nombreUsuario: u.nombre_usuario,
    email: u.email,
    rol: u.rol,
    nombreMostrado: u.nombre_mostrado ?? "",
    bio: u.bio ?? "",
    miembroDesde: u.creado_en.toISOString().slice(0, 10),
    ...(estadisticas && { estadisticas }),
};
}

export async function verPerfil(req, res) {
const usuario = await Usuario.buscarPorId(req.usuario.id);
const estadisticas = await Usuario.estadisticas(req.usuario.id);
res.json(formatear(usuario, estadisticas));
}

// Edición parcial: los campos que no llegan se mantienen como están
export async function editarPerfil(req, res) {
const body = req.body ?? {};
const actual = await Usuario.buscarPorId(req.usuario.id);

const nombreUsuario =
    body.nombreUsuario !== undefined
    ? String(body.nombreUsuario).trim()
    : actual.nombre_usuario;
const email =
    body.email !== undefined
    ? String(body.email).trim().toLowerCase()
    : actual.email;
const nombreMostrado =
    body.nombreMostrado !== undefined
    ? String(body.nombreMostrado).trim()
    : (actual.nombre_mostrado ?? "");
const bio =
    body.bio !== undefined ? String(body.bio).trim() : (actual.bio ?? "");

const errores = {};
const eUsuario = errorNombreUsuario(nombreUsuario);
const eEmail = errorEmail(email);
if (eUsuario) errores.nombreUsuario = eUsuario;
if (eEmail) errores.email = eEmail;
if (nombreMostrado.length > 60) {
    errores.nombreMostrado = "El nombre puede tener hasta 60 caracteres.";
}
if (bio.length > 300) {
    errores.bio = "La bio puede tener hasta 300 caracteres.";
}
if (Object.keys(errores).length > 0) {
    return res.status(400).json({ errores });
}

try {
    const actualizado = await Usuario.actualizarPerfil(req.usuario.id, {
    nombreUsuario,
    email,
    nombreMostrado: nombreMostrado || null,
    bio: bio || null,
    });
    res.json(formatear(actualizado));
} catch (error) {
    if (error.code === "23505") {
    const esEmail = error.constraint?.includes("email");
    return res.status(409).json({
        errores: esEmail
        ? { email: "Ya existe una cuenta con ese email." }
        : { nombreUsuario: "Ese nombre de usuario ya está en uso." },
    });
    }
    throw error;
}
}

export async function cambiarPassword(req, res) {
const body = req.body ?? {};
const actual = String(body.actual ?? "");
const nueva = String(body.nueva ?? "");

const errores = {};
const hash = await Usuario.obtenerHash(req.usuario.id);

if (!(await bcrypt.compare(actual, hash))) {
    errores.actual = "La contraseña actual no es correcta.";
}

const eNueva = errorPassword(nueva);
if (eNueva) {
    errores.nueva = eNueva;
} else if (nueva === actual) {
    errores.nueva = "La nueva contraseña debe ser distinta de la actual.";
}

if (Object.keys(errores).length > 0) {
    return res.status(400).json({ errores });
}

await Usuario.cambiarPasswordHash(req.usuario.id, await bcrypt.hash(nueva, 10));
await Sesion.cerrarOtras(req.usuario.id, req.token);
res.status(204).end();
}
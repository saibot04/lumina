import bcrypt from "bcryptjs";
import { errorNombreUsuario, errorEmail, errorPassword } from "../utils/validaciones.js";
import * as Usuario from "../models/usuario.model.js";
import * as Sesion from "../models/sesion.model.js";

// Se compara contra este hash cuando el email no existe, para que
// la respuesta tarde lo mismo y no revele qué emails están registrados.
const HASH_FALSO = bcrypt.hashSync("no-existe", 10);

function datosPublicos(u) {
return {
    id: String(u.id),
    nombreUsuario: u.nombre_usuario,
    email: u.email,
    rol: u.rol,
};
}

function validarRegistro({ nombreUsuario, email, password }) {
const errores = {};
const eUsuario = errorNombreUsuario(nombreUsuario);
const eEmail = errorEmail(email);
const ePassword = errorPassword(password);
if (eUsuario) errores.nombreUsuario = eUsuario;
if (eEmail) errores.email = eEmail;
if (ePassword) errores.password = ePassword;
return errores;
}

export async function registro(req, res) {
const body = req.body ?? {};
const nombreUsuario = String(body.nombreUsuario ?? "").trim();
const email = String(body.email ?? "").trim().toLowerCase();
const password = String(body.password ?? "");

const errores = validarRegistro({ nombreUsuario, email, password });
if (Object.keys(errores).length > 0) {
    return res.status(400).json({ errores });
}

try {
    const passwordHash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.crear({ nombreUsuario, email, passwordHash });
    res.status(201).json({ usuario: datosPublicos(usuario) });
} catch (error) {
    // 23505 = valor repetido en una columna UNIQUE
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

export async function login(req, res) {
const body = req.body ?? {};
const email = String(body.email ?? "").trim().toLowerCase();
const password = String(body.password ?? "");

const usuario = await Usuario.buscarPorEmail(email);
const valido = await bcrypt.compare(
    password,
    usuario?.password_hash ?? HASH_FALSO
);

if (!usuario || !valido) {
    return res.status(401).json({ error: "Email o contraseña incorrectos." });
}

const token = await Sesion.crear(usuario.id);
res.json({ token, usuario: datosPublicos(usuario) });
}

export async function logout(req, res) {
await Sesion.eliminar(req.token);
res.status(204).end();
}

export function yo(req, res) {
res.json(datosPublicos(req.usuario));
}
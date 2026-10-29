"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL ?? "http://localhost:4000";
const COOKIE = "lumina_session";

export type ResultadoRegistro =
    | { ok: true }
    | { ok: false; errores?: Record<string, string>; error?: string };

export type ResultadoLogin =
    | { ok: true; usuario: { nombreUsuario: string; email: string; rol: string } }
    | { ok: false; error: string };

async function llamarApi(ruta: string, cuerpo: unknown) {
    try {
        const res = await fetch(`${API_URL}${ruta}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cuerpo),
            cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        return { ok: res.ok, data };
    } catch {
        return { ok: false, data: null };
    }
}

export async function registrar(datos: {
    nombreUsuario: string;
    email: string;
    password: string;
}): Promise<ResultadoRegistro> {
    const { ok, data } = await llamarApi("/api/auth/registro", datos);

    if (data === null) {
        return { ok: false, error: "No se pudo conectar con el servidor. Probá de nuevo." };
    }
    if (!ok) {
        return {
            ok: false,
            errores: data.errores,
            error: data.errores ? undefined : (data.error ?? "No se pudo crear la cuenta."),
        };
    }
    return { ok: true };
}

export async function iniciarSesion(datos: {
    email: string;
    password: string;
}): Promise<ResultadoLogin> {
    const { ok, data } = await llamarApi("/api/auth/login", datos);

    if (data === null) {
        return { ok: false, error: "No se pudo conectar con el servidor. Probá de nuevo." };
    }
    if (!ok) {
        return { ok: false, error: data.error ?? "Email o contraseña incorrectos." };
    }

    // El token queda en una cookie httpOnly: el JavaScript del navegador no puede leerla
    const almacen = await cookies();
    almacen.set(COOKIE, data.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 días, igual que en el back
    });

    return {
        ok: true,
        usuario: {
            nombreUsuario: data.usuario.nombreUsuario,
            email: data.usuario.email,
            rol: data.usuario.rol,
        },
    };
}

export async function cerrarSesion() {
    const almacen = await cookies();
    const token = almacen.get(COOKIE)?.value;

    if (token) {
        // Se invalida la sesión en el back (HU-02) y después se borra la cookie
        await fetch(`${API_URL}/api/auth/logout`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        }).catch(() => {});
    }

    almacen.delete(COOKIE);
    redirect("/");
}
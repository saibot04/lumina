"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export type ResultadoPerfil =
    | { ok: true }
    | { ok: false; errores?: Record<string, string>; error?: string };

async function llamar(ruta: string, metodo: string, cuerpo: unknown) {
    const token = (await cookies()).get("lumina_session")?.value;
    if (!token) return { status: 401, data: null };

    try {
        const res = await fetch(`${API_URL}${ruta}`, {
            method: metodo,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cuerpo),
            cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        return { status: res.status, data };
    } catch {
        return { status: 0, data: null };
    }
}

function resultado(status: number, data: { errores?: Record<string, string>; error?: string } | null): ResultadoPerfil {
    if (status === 401) return { ok: false, error: "Tu sesión expiró. Volvé a iniciar sesión." };
    if (status === 0) return { ok: false, error: "No se pudo conectar con el servidor." };
    if (status >= 400) {
        return { ok: false, errores: data?.errores, error: data?.errores ? undefined : (data?.error ?? "No se pudo guardar.") };
    }
    return { ok: true };
}

export async function actualizarPerfil(datos: {
    nombreUsuario?: string;
    email?: string;
    nombreMostrado?: string;
    bio?: string;
}): Promise<ResultadoPerfil> {
    const { status, data } = await llamar("/api/usuarios/yo", "PATCH", datos);
    const r = resultado(status, data);
    // Se refresca todo para que el header y las pantallas muestren los datos nuevos
    if (r.ok) revalidatePath("/", "layout");
    return r;
}

export async function cambiarPassword(datos: {
    actual: string;
    nueva: string;
}): Promise<ResultadoPerfil> {
    const { status, data } = await llamar("/api/usuarios/yo/password", "PUT", datos);
    return resultado(status, data);
}
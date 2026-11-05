"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export type ResultadoResena =
    | { ok: true }
    | { ok: false; errores?: Record<string, string>; error?: string };

type Respuesta = { errores?: Record<string, string>; error?: string } | null;

async function llamar(ruta: string, metodo: string, cuerpo?: unknown) {
    const token = (await cookies()).get("lumina_session")?.value;
    if (!token) return { status: 401, data: null as Respuesta };

    try {
        const res = await fetch(`${API_URL}${ruta}`, {
            method: metodo,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: cuerpo === undefined ? undefined : JSON.stringify(cuerpo),
            cache: "no-store",
        });
        const data = (await res.json().catch(() => ({}))) as Respuesta;
        return { status: res.status, data };
    } catch {
        return { status: 0, data: null as Respuesta };
    }
}

function resultado(status: number, data: Respuesta): ResultadoResena {
    if (status === 401) return { ok: false, error: "Necesitás iniciar sesión para reseñar." };
    if (status === 0) return { ok: false, error: "No se pudo conectar con el servidor." };
    if (status >= 400) {
        return {
            ok: false,
            errores: data?.errores,
            error: data?.errores ? undefined : (data?.error ?? "No se pudo guardar la reseña."),
        };
    }
    return { ok: true };
}

export async function publicarResena(
    peliculaId: string,
    datos: { puntuacion: number; texto: string }
): Promise<ResultadoResena> {
    const { status, data } = await llamar(`/api/peliculas/${peliculaId}/resenas`, "POST", datos);
    const r = resultado(status, data);
    if (r.ok) revalidatePath("/", "layout");
    return r;
}

export async function editarResena(
    peliculaId: string,
    datos: { puntuacion: number; texto: string }
): Promise<ResultadoResena> {
    const { status, data } = await llamar(`/api/peliculas/${peliculaId}/resenas/mia`, "PATCH", datos);
    const r = resultado(status, data);
    if (r.ok) revalidatePath("/", "layout");
    return r;
}

export async function eliminarResena(peliculaId: string): Promise<ResultadoResena> {
    const { status, data } = await llamar(`/api/peliculas/${peliculaId}/resenas/mia`, "DELETE");
    const r = resultado(status, data);
    if (r.ok) revalidatePath("/", "layout");
    return r;
}

export async function deshacerResena(): Promise<ResultadoResena> {
    const { status, data } = await llamar("/api/resenas/deshacer", "POST");
    const r = resultado(status, data);
    // Se refresca todo: no sabemos de antemano en qué película cae el cambio
    if (r.ok) revalidatePath("/", "layout");
    return r;
}
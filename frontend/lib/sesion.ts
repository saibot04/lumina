import { cookies } from "next/headers";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export type UsuarioSesion = {
    id: string;
    nombreUsuario: string;
    email: string;
    rol: string;
};

/** Devuelve el usuario de la sesión actual, o null si no hay sesión válida. */
export async function obtenerUsuario(): Promise<UsuarioSesion | null> {
    const token = (await cookies()).get("lumina_session")?.value;
    if (!token) {
        console.log("obtenerUsuario: no hay cookie lumina_session");
        return null;
    }

    try {
        const res = await fetch(`${API_URL}/api/auth/yo`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        if (!res.ok) {
            console.error(`obtenerUsuario: el back respondió ${res.status}`);
            return null;
        }
        return res.json();
    } catch (error) {
        console.error("obtenerUsuario: no se pudo conectar con el back", error);
        return null;
    }
}
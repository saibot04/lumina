import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export type UsuarioSesion = {
    id: string;
    nombreUsuario: string;
    email: string;
    rol: string;
};

export type Perfil = UsuarioSesion & {
    nombreMostrado: string;
    bio: string;
    miembroDesde: string;
    estadisticas: { vistas: number; resenas: number };
};

async function tokenDeSesion() {
    return (await cookies()).get("lumina_session")?.value;
}

/** Pide un dato al back con el token de la sesión. Devuelve null si no hay sesión válida. */
async function pedirConSesion<T>(ruta: string): Promise<T | null> {
    const token = await tokenDeSesion();
    if (!token) return null;

    try {
        const res = await fetch(`${API_URL}${ruta}`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        // 401 = sesión vencida o cerrada: es un caso normal, no un error
        if (res.status === 401) return null;
        if (!res.ok) {
            console.error(`sesion: ${ruta} respondió ${res.status}`);
            return null;
        }
        return res.json();
    } catch (error) {
        console.error(`sesion: no se pudo conectar con el back (${API_URL})`, error);
        return null;
    }
}

/** Devuelve el usuario de la sesión actual, o null si no hay sesión válida. */
export async function obtenerUsuario(): Promise<UsuarioSesion | null> {
    return pedirConSesion<UsuarioSesion>("/api/auth/yo");
}

/** Para páginas privadas: sin sesión, manda al login. */
export async function requerirUsuario(): Promise<UsuarioSesion> {
    const usuario = await obtenerUsuario();
    if (!usuario) redirect("/login");
    return usuario;
}

/** Datos completos del perfil, con estadísticas. */
export async function obtenerPerfil(): Promise<Perfil | null> {
    return pedirConSesion<Perfil>("/api/usuarios/yo");
}

export type MiResena = {
    puntuacion: number;
    texto: string;
    creadoEn: string;
} | null;

export type EstadoDeshacer = {
    puedeDeshacer: boolean;
    ultima: { tipo: string; peliculaId: string; titulo: string } | null;
};

/** Mi reseña de una película (null si no hay sesión o todavía no reseñé). */
export async function obtenerMiResena(peliculaId: string): Promise<MiResena> {
    return pedirConSesion<NonNullable<MiResena>>(`/api/peliculas/${peliculaId}/resenas/mia`);
}

/** Para habilitar o deshabilitar el botón "Deshacer". */
export async function obtenerEstadoDeshacer(): Promise<EstadoDeshacer | null> {
    return pedirConSesion<EstadoDeshacer>("/api/resenas/deshacer");
}
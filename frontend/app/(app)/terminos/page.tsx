import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Términos y condiciones | Lumina",
};

const SECCIONES: { titulo: string; parrafos: string[] }[] = [
    {
        titulo: "1. Qué es Lumina",
        parrafos: [
            "Lumina es un proyecto académico de Programación Orientada a Objetos: una plataforma para descubrir películas, puntuarlas y compartir reseñas. No es un servicio comercial.",
            "Al registrarte o usar la plataforma, aceptás estos términos. Si no estás de acuerdo, no la uses.",
        ],
    },
    {
        titulo: "2. Tu cuenta",
        parrafos: [
            "Para publicar reseñas necesitás una cuenta. Sos responsable de mantener tu contraseña en secreto y de lo que se haga con tu cuenta.",
            "Tus datos personales son tu nombre de usuario, tu email y tu contraseña. La contraseña se guarda cifrada (nunca en texto plano) y usamos una cookie de sesión para mantenerte conectado.",
            "Podés editar tus datos desde la sección Cuenta cuando quieras.",
        ],
    },
    {
        titulo: "3. Reseñas y contenido de los usuarios",
        parrafos: [
            "Las reseñas son públicas y las ve cualquier visitante. Sos responsable de lo que escribís.",
            "No está permitido publicar contenido ofensivo, discriminatorio, ilegal o que suplante a otra persona. Los administradores pueden ocultar o eliminar reseñas que incumplan estas reglas.",
        ],
    },
    {
        titulo: "4. Información de películas y TMDB",
        parrafos: [
            "Los datos de las películas (títulos, sinopsis, pósters, fondos, tráilers, elenco) provienen de TMDB y se usan con fines educativos y no comerciales.",
            "This product uses the TMDB API but is not endorsed or certified by TMDB.",
            "Las imágenes y los datos pertenecen a sus respectivos titulares. Lumina no reclama ningún derecho sobre ellos.",
        ],
    },
    {
        titulo: "5. Uso adecuado",
        parrafos: [
            "No intentes dañar el servicio, acceder a cuentas ajenas ni extraer datos de forma masiva.",
            "Al ser un proyecto de estudio, el servicio puede tener errores, cortes o cambios sin aviso, y los datos de prueba pueden borrarse.",
        ],
    },
    {
        titulo: "6. Cambios en estos términos",
        parrafos: [
            "Podemos actualizar estos términos. La versión vigente es siempre la que aparece en esta página.",
        ],
    },
    {
        titulo: "7. Contacto",
        parrafos: [
            "Si tenés dudas o querés que borremos tu cuenta, escribinos a cualquiera de los mails que figuran en el pie de página.",
        ],
    },
];

export default function Terminos() {
    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold sm:text-4xl">
                    Términos y condiciones
                </h1>
                <p className="text-sm text-muted">
                    Última actualización: noviembre de 2026
                </p>
            </header>

            {SECCIONES.map((s) => (
                <section
                    key={s.titulo}
                    className="rounded-lg border border-white/10 bg-surface p-4 sm:p-6"
                >
                    <h2 className="mb-3 border-l-2 border-primary pl-3 text-sm font-semibold uppercase tracking-wider text-foreground">
                        {s.titulo}
                    </h2>
                    <div className="space-y-3">
                        {s.parrafos.map((p) => (
                            <p key={p} className="text-sm leading-relaxed text-muted">
                                {p}
                            </p>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
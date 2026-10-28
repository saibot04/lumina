import Link from "next/link";
import { notFound } from "next/navigation";
import { actividadDePelicula, getMovie, slugify } from "@/lib/movies";
import AccionesPelicula from "@/components/AccionesPelicula";
import ResumenCalificaciones from "@/components/ResumenCalificaciones";
import TuResena from "@/components/TuResena";
import ActividadAmigos from "@/components/ActividadAmigos";
import ResenaCard from "@/components/ResenaCard";

function Titulo({ children }: { children: React.ReactNode }) {
return (
    <h3 className="mb-3 border-l-2 border-primary pl-3 text-sm font-semibold uppercase tracking-wider">
    {children}
    </h3>
);
}

export default async function Pelicula({
params,
}: {
params: Promise<{ id: string }>;
}) {
const { id } = await params;
const movie = getMovie(id);

if (!movie) notFound();

// HU-12: de la más reciente a la más antigua
const reviews = [...(movie.reviews ?? [])].sort((a, b) =>
    b.fecha.localeCompare(a.fecha)
);
const amigos = actividadDePelicula(movie.id);

return (
    <div className="mx-auto max-w-5xl space-y-8">
    {/* Imagen + portada + datos */}
    <section>
        <div
        className="h-48 w-full rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-950 bg-cover bg-center md:h-72"
        style={movie.backdrop ? { backgroundImage: `url(${movie.backdrop})` } : undefined}
        role="img"
        aria-label={`Imagen de ${movie.title}`}
        />

        <div className="relative -mt-12 flex flex-col gap-6 px-4 sm:flex-row sm:items-end md:-mt-20 md:px-8">
        <div
            className="aspect-[2/3] w-32 shrink-0 rounded-md border border-white/20 bg-gradient-to-br from-neutral-700 to-neutral-900 bg-cover bg-center shadow-xl md:w-44"
            style={movie.poster ? { backgroundImage: `url(${movie.poster})` } : undefined}
            role="img"
            aria-label={`Portada de ${movie.title}`}
        />

        <div className="flex-1 space-y-3 pb-1">
            <h1 className="text-3xl font-bold md:text-4xl">
            {movie.title}
            {movie.year && (
                <span className="ml-3 text-lg font-normal text-muted">{movie.year}</span>
            )}
            </h1>

            {movie.genres && movie.genres.length > 0 && (
            <p className="text-sm text-muted">
                {movie.genres.map((g, i) => (
                <span key={g}>
                    {i > 0 && " · "}
                    <Link href={`/categoria/${slugify(g)}`} className="hover:text-primary">
                    {g}
                    </Link>
                </span>
                ))}
            </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
            {movie.trailer ? (
                <a
                href={movie.trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-white/20 px-4 py-1.5 text-sm transition hover:border-primary hover:text-primary"
                >
                ▶ Trailer
                </a>
            ) : (
                <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded border border-white/10 px-4 py-1.5 text-sm text-muted opacity-50"
                >
                ▶ Trailer
                </span>
            )}
            {movie.duration && (
                <span className="text-sm text-muted">{movie.duration} min</span>
            )}
            </div>
        </div>

        <AccionesPelicula />
        </div>
    </section>

    {/* Descripción */}
    <section className="rounded-lg border border-white/10 p-5 text-sm leading-relaxed text-muted">
        {movie.synopsis ?? "Sinopsis no disponible."}
    </section>

    {/* Elenco (lo pide HU-04; no está en el boceto) */}
    <section>
        <h2 className="mb-3 text-lg font-semibold">Elenco</h2>
        {movie.cast && movie.cast.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2">
            {movie.cast.map((c) => (
            <li key={`${c.nombre}-${c.personaje}`} className="rounded bg-field px-4 py-3 text-sm">
                <p className="font-medium">{c.nombre}</p>
                <p className="text-xs text-muted">como {c.personaje}</p>
            </li>
            ))}
        </ul>
        ) : (
        <p className="text-sm text-muted">Elenco no disponible.</p>
        )}
    </section>

    {/* Reviews */}
    <section className="rounded-xl border border-white/10 p-5 sm:p-6">
        <h2 className="mb-6 text-center text-xl font-semibold">Reviews</h2>

        <div className="space-y-8">
        <div>
            <Titulo>Calificaciones</Titulo>
            <ResumenCalificaciones reviews={reviews} />
        </div>

        <div>
            <Titulo>Tu calificación</Titulo>
            <TuResena />
        </div>

        <div>
            <Titulo>Actividad de amigos</Titulo>
            <ActividadAmigos actividad={amigos} />
        </div>

        <div>
            <Titulo>Reseñas de la comunidad</Titulo>
            {reviews.length > 0 ? (
            <ul className="space-y-3">
                {reviews.map((r, i) => (
                <ResenaCard key={`${r.usuario}-${i}`} resena={r} />
                ))}
            </ul>
            ) : (
            <p className="text-sm text-muted">
                Todavía no hay reseñas para esta película.
            </p>
            )}
        </div>
        </div>
    </section>
    </div>
);
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovie, slugify } from "@/lib/movies";

function formatoPuntuacion(n: number) {
return n.toFixed(1).replace(".", ",");
}

export default async function Pelicula({
params,
}: {
params: Promise<{ id: string }>;
}) {
const { id } = await params;
const movie = getMovie(id);

if (!movie) notFound();

const reviews = movie.reviews ?? [];
const promedio =
    reviews.length > 0
    ? reviews.reduce((suma, r) => suma + r.puntuacion, 0) / reviews.length
    : (movie.rating ?? null);

const detalles = [
    movie.year ? String(movie.year) : null,
    movie.duration ? `${movie.duration} min` : null,
].filter(Boolean);

return (
    <div className="mx-auto max-w-5xl space-y-10">
    <section className="grid gap-8 md:grid-cols-[240px_1fr]">
        {/* Póster */}
        <div
        className="aspect-[2/3] w-full max-w-[240px] rounded-lg bg-gradient-to-br from-neutral-700 to-neutral-900 bg-cover bg-center"
        style={movie.poster ? { backgroundImage: `url(${movie.poster})` } : undefined}
        role="img"
        aria-label={`Póster de ${movie.title}`}
        />

        <div className="space-y-4">
        <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            {detalles.length > 0 && (
            <p className="mt-1 text-sm text-muted">{detalles.join(" · ")}</p>
            )}
        </div>

        {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
            {movie.genres.map((g) => (
                <Link
                key={g}
                href={`/categoria/${slugify(g)}`}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted transition hover:border-primary hover:text-primary"
                >
                {g}
                </Link>
            ))}
            </div>
        )}

        <p className="text-sm text-primary">
            {promedio !== null
            ? `★ ${formatoPuntuacion(promedio)}${
                reviews.length > 0 ? ` (${reviews.length} reseñas)` : ""
                }`
            : "Sin puntuaciones todavía"}
        </p>

        <p className="max-w-2xl text-sm leading-relaxed text-muted">
            {movie.synopsis ?? "Sinopsis no disponible."}
        </p>

        <div className="flex gap-3 pt-2">
            <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-black transition hover:opacity-90">
            Ver ahora
            </button>
            <button className="rounded-lg border border-white/20 px-6 py-2.5 text-sm transition hover:border-primary hover:text-primary">
            + Mi lista
            </button>
        </div>
        </div>
    </section>

    {/* Elenco */}
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

    {/* Reseñas */}
    <section>
        <h2 className="mb-3 text-lg font-semibold">Reseñas</h2>
        {reviews.length > 0 ? (
        <ul className="space-y-3">
            {reviews.map((r, i) => (
            <li key={i} className="rounded bg-field px-4 py-3 text-sm">
                <div className="flex items-center justify-between">
                <p className="font-medium">{r.usuario}</p>
                <p className="text-primary">★ {formatoPuntuacion(r.puntuacion)}</p>
                </div>
                <p className="mt-1 text-muted">{r.texto}</p>
                <p className="mt-2 text-xs text-muted/70">{r.fecha}</p>
            </li>
            ))}
        </ul>
        ) : (
        <p className="text-sm text-muted">Todavía no hay reseñas para esta película.</p>
        )}
    </section>
    </div>
);
}
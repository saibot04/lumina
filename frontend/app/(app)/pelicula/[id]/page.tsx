import Link from "next/link";
import { notFound } from "next/navigation";
import { actividadDePelicula, getMovie, slugify } from "@/lib/movies";
import AccionesPelicula from "@/components/AccionesPelicula";
import ResumenCalificaciones from "@/components/ResumenCalificaciones";
import TuResena from "@/components/TuResena";
import ActividadAmigos from "@/components/ActividadAmigos";
import DetallesPelicula from "@/components/DetallesPelicula";
import ResenaCard from "@/components/ResenaCard";
import BotonVolver from "@/components/BotonVolver";

function Titulo({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 border-l-2 border-primary pl-3 text-sm font-semibold uppercase tracking-wider text-foreground">
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

  // TODO (backend): traer la película desde la API en vez del arreglo estático
  const movie = getMovie(id);

  if (!movie) notFound();

  // HU-12: de la más reciente a la más antigua
  const reviews = [...(movie.reviews ?? [])].sort((a, b) =>
    b.fecha.localeCompare(a.fecha)
  );
  // TODO (backend): la actividad de amigos viene de la API
  const amigos = actividadDePelicula(movie.id);

  return (
    <div className="mx-auto max-w-5xl space-y-6 md:space-y-8">
      <BotonVolver />

      {/* Imagen + portada + datos */}
      <section>
        <div
          className="h-48 w-full rounded-lg border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-950 bg-cover bg-center md:h-72"
          style={movie.backdrop ? { backgroundImage: `url(${movie.backdrop})` } : undefined}
          role="img"
          aria-label={`Imagen de ${movie.title}`}
        />

        <div className="relative z-10 -mt-12 flex flex-col gap-4 px-4 md:-mt-20 md:px-8">
          <div className="flex min-w-0 items-end gap-4">
            <div
              className="aspect-[2/3] w-24 shrink-0 rounded-md border border-white/20 bg-gradient-to-br from-neutral-700 to-neutral-900 bg-cover bg-center shadow-xl sm:w-32 md:w-44"
              style={movie.poster ? { backgroundImage: `url(${movie.poster})` } : undefined}
              role="img"
              aria-label={`Portada de ${movie.title}`}
            />

            <div className="min-w-0 flex-1 space-y-3 pb-1">
              {/* Título de la película más grande */}
              <h1 className="text-4xl font-bold sm:text-5xl md:text-7xl">
                {movie.title}
                {movie.year && (
                  <span className="ml-2 text-lg font-normal text-muted sm:ml-3 sm:text-xl">
                    {movie.year}
                  </span>
                )}
              </h1>

              {movie.genres && movie.genres.length > 0 && (
                <p className="text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
                  {movie.genres.map((g, i) => (
                    <span key={g}>
                      {i > 0 && " · "}
                      <Link
                        href={`/categoria/${slugify(g)}`}
                        className="[@media(hover:hover)]:hover:underline"
                      >
                        {g}
                      </Link>
                    </span>
                  ))}
                </p>
              )}

              <p className="text-xs uppercase tracking-wider text-muted sm:text-sm">
                {movie.director ? (
                  <>
                    Dirigida por <span className="text-foreground">{movie.director}</span>
                  </>
                ) : (
                  "Dirección no disponible"
                )}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {/* TODO (backend): Cambiar a etiqueta <a> con href={movie.trailer} cuando la BD esté lista */}
                <button
                  type="button"
                  aria-disabled="true"
                  aria-label={`Tráiler de ${movie.title} no disponible momentáneamente`}
                  className="inline-flex min-h-10 cursor-not-allowed items-center gap-2 rounded border border-primary bg-primary px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-black opacity-70 focus-visible:outline-none"
                >
                  ▶ Trailer
                </button>
                
                {movie.duration && (
                  <span className="text-sm text-muted">{movie.duration} min</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <AccionesPelicula />
          </div>
        </div>
      </section>

      {/* Sinopsis */}
      <section className="rounded-lg border border-white/10 bg-surface p-4 sm:p-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
          Sinopsis de la película
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          {movie.synopsis ?? "Sinopsis no disponible."}
        </p>
      </section>

      {/* Calificaciones */}
      <section className="rounded-lg border border-white/10 bg-surface p-4 sm:p-6">
        <Titulo>Calificaciones</Titulo>
        <ResumenCalificaciones reviews={reviews} />
      </section>

      {/* Tu calificación */}
      <section className="rounded-lg border border-white/10 bg-surface p-4 sm:p-6">
        <Titulo>Tu calificación</Titulo>
        <TuResena />
      </section>

      {/* Actividad de amigos */}
      <section className="rounded-lg border border-white/10 bg-surface p-4 sm:p-6">
        <Titulo>Actividad de amigos</Titulo>
        <ActividadAmigos actividad={amigos} />
      </section>

      {/* Cast / Equipo / Detalles */}
      <section className="rounded-lg border border-white/10 bg-surface p-4 sm:p-6">
        <DetallesPelicula
          cast={movie.cast}
          equipo={movie.equipo}
          pais={movie.pais}
          presupuesto={movie.presupuesto}
          ingresos={movie.ingresos}
        />
      </section>

      {/* Reseñas de la comunidad */}
      <section className="rounded-lg border border-white/10 bg-surface p-4 sm:p-6">
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
      </section>
    </div>
  );
}
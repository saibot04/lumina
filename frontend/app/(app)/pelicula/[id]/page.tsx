import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPelicula, slugify } from "@/lib/movies";
import MovieInteractions from "@/components/MovieInteractions";
import BotonVolver from "@/components/BotonVolver";
import MovieActions from "@/components/MovieActions";

export default async function PeliculaPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const movie = await fetchPelicula(id);

    if (!movie) notFound();

    const reviews = movie.reviews ?? [];
    const promedio =
        reviews.length > 0
            ? reviews.reduce((suma, r) => suma + r.puntuacion, 0) / reviews.length
            : (movie.rating ?? null);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pb-32">
            
            {/* 1. BANNER DE FONDO */}
            <div className="relative w-full h-[200px] md:h-[320px] bg-neutral-900 overflow-hidden">
                {movie.backdrop ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-60"
                        style={{ backgroundImage: `url(${movie.backdrop})` }}
                    />
                ) : (
                    movie.poster && (
                        <div
                            className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-30 scale-105"
                            style={{ backgroundImage: `url(${movie.poster})` }}
                        />
                    )
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

                <div className="absolute top-4 left-4 md:left-8 z-10">
                    <BotonVolver />
                </div>
            </div>

            {/* 2. CONTENIDO PRINCIPAL */}
            <div className="max-w-5xl mx-auto px-6 -mt-20 md:-mt-32 relative z-10 space-y-12">
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Póster flotante */}
                    <div 
                        className="w-48 sm:w-64 aspect-[2/3] rounded-xl bg-neutral-800 bg-cover bg-center shadow-2xl border border-white/10 shrink-0 mx-auto md:mx-0"
                        style={movie.poster ? { backgroundImage: `url(${movie.poster})` } : undefined}
                    />

                    {/* Columna derecha: Título, metadatos, botones interactivos Y DESCRIPCIÓN */}
                    <div className="space-y-6 flex-1 pt-2">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{movie.title}</h1>
                            
                            {/* Año y Director */}
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                                <span className="font-medium text-gray-200">
                                    {movie.year ?? "Año no disponible"}
                                </span>
                                <span>•</span>
                                <span>
                                    Directed by <strong className="text-white font-medium">{movie.director ?? "Director no especificado"}</strong>
                                </span>
                            </div>
                        </div>

                        {/* Géneros */}
                        {movie.genres && movie.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((g) => (
                                    <Link
                                        key={g}
                                        href={`/categoria/${slugify(g)}`}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 transition hover:border-[#fccb30] hover:text-[#fccb30]"
                                    >
                                        {g}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Componente interactivo para los botones (Tráiler, Me gusta, Watchlist) */}
                        <MovieActions movie={movie} />

                        {/* Descripción / Sinopsis */}
                        <div className="pt-2">
                            <p className="text-sm leading-relaxed text-gray-300">
                                {movie.synopsis ?? "No hay información ni sinopsis disponible todavía. Se rellenará automáticamente al conectar la base de datos."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. CALIFICACIONES Y RESEÑAS */}
                <div className="pt-8 border-t border-white/10">
                    <MovieInteractions reviews={reviews} promedio={promedio} />
                </div>

            </div>
        </main>
    );
}
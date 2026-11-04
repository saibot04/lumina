import { Suspense } from "react";
import Link from "next/link";
import PosterCard from "@/components/PosterCard";
import { EstadoVacio } from "@/components/SeccionesInicio";
import { GENEROS, fetchPeliculas, slugify } from "@/lib/movies";

// Ubicación: app/(app)/generos/page.tsx

type Props = { searchParams: Promise<{ generos?: string }> };

const SLUGS_VALIDOS = GENEROS.map(slugify);

function hrefCon(slugs: string[]) {
    return slugs.length ? `/generos?generos=${slugs.join(",")}` : "/generos";
}

async function Contenido({ searchParams }: Props) {
    const { generos } = await searchParams;

    // Géneros elegidos (viven en la URL: /generos?generos=terror,drama)
    const seleccionados = Array.from(
        new Set((generos ?? "").split(",").filter((s) => SLUGS_VALIDOS.includes(s)))
    );
    const nombres = GENEROS.filter((g) => seleccionados.includes(slugify(g)));

    const resultado = seleccionados.length
        ? await fetchPeliculas({ generos: seleccionados, limite: 30 })
        : null;

    return (
        <>
            <div className="space-y-3">
            <ul className="flex flex-wrap gap-2">
                {GENEROS.map((g) => {
                    const slug = slugify(g);
                    const activo = seleccionados.includes(slug);
                    // Si ya está elegido, el clic lo saca; si no, lo suma.
                    const siguiente = activo
                        ? seleccionados.filter((s) => s !== slug)
                        : [...seleccionados, slug];

                    return (
                        <li key={g}>
                            <Link
                                href={hrefCon(siguiente)}
                                scroll={false}
                                aria-current={activo ? "true" : undefined}
                                className={`block rounded-full border px-4 py-2 text-sm transition ${
                                    activo
                                        ? "border-primary bg-primary text-black font-medium"
                                        : "border-white/10 text-muted hover:border-primary hover:text-primary"
                                }`}
                            >
                                {g}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {seleccionados.length > 0 && (
                <Link
                    href="/generos"
                    scroll={false}
                    className="inline-block text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:text-primary"
                >
                    Limpiar selección
                </Link>
            )}
            </div>

            <section aria-live="polite" className="space-y-4">
                {!resultado ? (
                    <EstadoVacio mensaje="Elegí uno o más géneros para ver las películas." />
                ) : (
                    <>
                        <h2 className="text-lg font-semibold tracking-wide md:text-xl">
                            <span className="text-primary">{nombres.join(" + ")}</span>
                            {resultado.datos.length > 0 && (
                                <span className="ml-2 text-sm font-normal text-muted">
                                    ({resultado.total})
                                </span>
                            )}
                        </h2>

                        {resultado.datos.length === 0 ? (
                            <EstadoVacio mensaje="No se encuentran resultados para esa combinación de géneros." />
                        ) : (
                            <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-6">
                                {resultado.datos.map((m) => (
                                    <PosterCard
                                        key={m.id}
                                        id={m.id}
                                        title={m.title}
                                        poster={m.poster}
                                        className="w-full"
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
        </>
    );
}

export default function Generos({ searchParams }: Props) {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold md:text-3xl">Géneros</h1>

            <Suspense fallback={<p className="text-sm text-muted">Cargando...</p>}>
                <Contenido searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
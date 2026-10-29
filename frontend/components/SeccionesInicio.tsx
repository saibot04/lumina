"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import PosterCard from "./PosterCard";
import { slugify } from "@/lib/movies";
import type { ActividadAmigo, Movie, TipoActividad } from "@/lib/movies";

/* ------------------------------ Estado vacío ------------------------------ */

export function EstadoVacio({
    mensaje,
    className = "",
}: {
    mensaje: string;
    className?: string;
}) {
    return (
        <div
            className={`rounded-lg border border-dashed border-white/10 bg-surface/40 px-6 py-10 text-center text-sm text-muted ${className}`}
        >
            {mensaje}
        </div>
    );
}

/* --------------------------- Fila con desplazamiento ---------------------- */

type FilaPeliculasProps = {
    titulo: string;
    peliculas: Movie[];
    /** Muestra la posición (1, 2, 3...) superpuesta al póster. */
    numerada?: boolean;
    /** Parte del título que se pinta en amarillo. */
    acento?: string;
    /** Línea decorativa amarilla bajo el título. */
    linea?: boolean;
    mensajeVacio?: string;
};

export function FilaPeliculas({
    titulo,
    peliculas,
    numerada = false,
    acento,
    linea = false,
    mensajeVacio,
}: FilaPeliculasProps) {
    const pista = useRef<HTMLUListElement>(null);

    const desplazar = (direccion: 1 | -1) => {
        pista.current?.scrollBy({ left: direccion * 480, behavior: "smooth" });
    };

    const id = `fila-${slugify(acento ? `${acento} ${titulo}` : titulo)}`;
    const ancho = numerada ? "w-32 sm:w-36 lg:w-40" : "w-28 sm:w-32 lg:w-36";

    return (
        <section aria-labelledby={id}>
            <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                    <h2
                        id={id}
                        className={
                            acento
                                ? "text-2xl font-bold tracking-wide md:text-3xl"
                                : "text-lg font-semibold tracking-wide md:text-xl"
                        }
                    >
                        {acento && <span className="text-primary">{acento} </span>}
                        {titulo}
                    </h2>

                    {linea && (
                        <span
                            aria-hidden="true"
                            className="mt-1.5 block h-0.5 w-10 rounded-full bg-primary"
                        />
                    )}
                </div>

                {peliculas.length > 0 && (
                    <div className="hidden items-center gap-1 sm:flex">
                        <button
                            type="button"
                            onClick={() => desplazar(-1)}
                            aria-label={`Desplazar ${titulo} a la izquierda`}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-sm text-muted transition hover:bg-white/10 hover:text-primary"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={() => desplazar(1)}
                            aria-label={`Desplazar ${titulo} a la derecha`}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-sm text-muted transition hover:bg-white/10 hover:text-primary"
                        >
                            ›
                        </button>
                    </div>
                )}
            </div>

            {peliculas.length === 0 ? (
                <EstadoVacio
                    mensaje={mensajeVacio ?? `Todavía no hay películas en ${titulo}.`}
                />
            ) : (
                <ul
                    ref={pista}
                    className={`flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                        numerada ? "pl-4" : ""
                    }`}
                >
                    {peliculas.map((m, i) => (
                        <li key={m.id}>
                            <PosterCard
                                id={m.id}
                                title={m.title}
                                poster={m.poster}
                                rank={numerada ? i + 1 : undefined}
                                className={ancho}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

/* --------------------------- Carrusel destacado --------------------------- */

export function HeroDestacado({ peliculas }: { peliculas: Movie[] }) {
    const [indice, setIndice] = useState(0);

    if (peliculas.length === 0) {
        return <EstadoVacio mensaje="Todavía no hay películas destacadas." />;
    }

    const actual = peliculas[Math.min(indice, peliculas.length - 1)];
    const meta = [actual.year, actual.genres?.join(" · ")]
        .filter(Boolean)
        .join(" • ");
    const hayVarias = peliculas.length > 1;

    const mover = (paso: number) =>
        setIndice((i) => (i + paso + peliculas.length) % peliculas.length);

    return (
        <section
            aria-label="Películas destacadas"
            aria-roledescription="carrusel"
            className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-r from-neutral-800 to-neutral-900"
        >
            <div className="flex min-h-[320px] flex-col items-start gap-3 p-8 md:min-h-[400px] md:p-12">
                <h1 className="text-4xl font-bold md:text-5xl">{actual.title}</h1>

                {/* Año • género. Se rellenará con los datos de la base de datos. */}
                {meta && (
                    <p className="text-xs uppercase tracking-wider text-muted">
                        {meta}
                    </p>
                )}

                {actual.synopsis && (
                    <p className="max-w-md text-sm text-muted">{actual.synopsis}</p>
                )}

                <Link
                    href={`/pelicula/${actual.id}`}
                    className="mt-2 rounded bg-primary px-5 py-2 text-sm font-medium text-black transition hover:brightness-110"
                >
                    Ver ahora
                </Link>
            </div>

            {hayVarias && (
                <>
                    <div className="absolute bottom-6 left-8 flex items-center gap-2 md:left-12">
                        {peliculas.map((p, i) => (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => setIndice(i)}
                                aria-label={`Ir a ${p.title}`}
                                aria-current={i === indice}
                                className={`h-1.5 rounded-full transition-all ${
                                    i === indice
                                        ? "w-6 bg-primary"
                                        : "w-1.5 bg-white/30 hover:bg-white/60"
                                }`}
                            />
                        ))}
                    </div>

                    <div className="absolute bottom-5 right-8 flex items-center gap-2 md:right-12">
                        <button
                            type="button"
                            onClick={() => mover(-1)}
                            aria-label="Película destacada anterior"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-lg leading-none text-white transition hover:bg-black/80"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            onClick={() => mover(1)}
                            aria-label="Película destacada siguiente"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-lg leading-none text-white transition hover:bg-black/80"
                        >
                            ›
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}

/* --------------------------- Actividad de amigos -------------------------- */

const ETIQUETAS: Record<TipoActividad, string> = {
    califico: "calificó",
    vio: "vio",
    guardo: "guardó en su lista",
    meGusta: "le gustó",
};

export function ActividadAmigos({
    actividades = [],
}: {
    actividades?: ActividadAmigo[];
}) {
    return (
        <section aria-labelledby="actividad-amigos">
            <h2
                id="actividad-amigos"
                className="mb-3 text-base font-semibold tracking-wide md:text-lg"
            >
                Actividad nueva de amigos
            </h2>

            {actividades.length === 0 ? (
                <EstadoVacio mensaje="Todavía no hay actividad de tus amigos." />
            ) : (
                <ul className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {actividades.map((a) => (
                        <li key={a.id} className="w-32 shrink-0">
                            <PosterCard
                                id={a.pelicula.id}
                                title={a.pelicula.titulo}
                                className="w-full"
                            />

                            <p className="mt-2 truncate text-xs">
                                <span className="text-muted">{a.usuario.nombre}</span>{" "}
                                {ETIQUETAS[a.tipo]}
                            </p>

                            {a.calificacion !== undefined && (
                                <p
                                    className="text-xs tracking-widest text-primary"
                                    aria-label={`${a.calificacion} de 5 estrellas`}
                                >
                                    {"★".repeat(a.calificacion)}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
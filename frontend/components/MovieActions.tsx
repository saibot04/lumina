"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

type ItemWatchlist = {
    id: string | number;
    title: string;
    subtitle: string;
    poster: string;
};

function leerWatchlist(): ItemWatchlist[] {
    try {
        return JSON.parse(localStorage.getItem("lumina_watchlist") || "[]");
    } catch {
        return [];
    }
}

function suscribir(avisar: () => void) {
    window.addEventListener("storage", avisar);
    return () => window.removeEventListener("storage", avisar);
}

interface MovieActionsProps {
    movie: {
        id: string | number;
        title: string;
        year?: number;
        director?: string;
        poster?: string;
        trailerKey?: string;
    };
}

export default function MovieActions({ movie }: MovieActionsProps) {
    const [viendoTrailer, setViendoTrailer] = useState(false);

    // Lee la watchlist del navegador sin usar setState dentro de un efecto
    const enWatchlist = useSyncExternalStore(
        suscribir,
        () => leerWatchlist().some((p) => String(p.id) === String(movie.id)),
        () => false
    );

    // Cerrar el reproductor con Escape
    useEffect(() => {
        if (!viendoTrailer) return;
        const alPulsar = (e: KeyboardEvent) => {
            if (e.key === "Escape") setViendoTrailer(false);
        };
        document.addEventListener("keydown", alPulsar);
        return () => document.removeEventListener("keydown", alPulsar);
    }, [viendoTrailer]);

    const toggleWatchlist = () => {
        const guardada = leerWatchlist();

        if (enWatchlist) {
            const actualizada = guardada.filter((p) => String(p.id) !== String(movie.id));
            localStorage.setItem("lumina_watchlist", JSON.stringify(actualizada));
            window.dispatchEvent(new Event("storage"));
            alert(`"${movie.title}" fue eliminada de tu Watchlist.`);
        } else {
            const nuevaPeli: ItemWatchlist = {
                id: movie.id,
                title: movie.title,
                subtitle: `${movie.director || "Director desconocido"}, ${movie.year || "2026"}`,
                poster: movie.poster || "",
            };
            localStorage.setItem("lumina_watchlist", JSON.stringify([...guardada, nuevaPeli]));
            window.dispatchEvent(new Event("storage"));
            alert(`¡"${movie.title}" se agregó a tu Watchlist (Mi lista)!`);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-4">
            <button
                type="button"
                onClick={() => setViendoTrailer(true)}
                disabled={!movie.trailerKey}
                title={movie.trailerKey ? undefined : "Tráiler no disponible"}
                className="rounded-xl bg-[#fccb30] text-black px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
            >
                ▶ Tráiler
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-xs uppercase tracking-wider transition hover:border-[#fccb30] hover:text-[#fccb30]">
                🤍 Me gusta
            </button>
            <button
                onClick={toggleWatchlist}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs uppercase tracking-wider transition cursor-pointer ${
                    enWatchlist
                        ? "border-red-500/50 text-red-400 bg-red-500/10 hover:bg-red-500/20"
                        : "border-white/20 text-white bg-white/5 hover:border-[#fccb30] hover:text-[#fccb30]"
                }`}
            >
                {enWatchlist ? "✓ En Watchlist (Quitar)" : "🕒 Watchlist"}
            </button>

            {viendoTrailer && movie.trailerKey && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Tráiler de ${movie.title}`}
                >
                    <button
                        type="button"
                        onClick={() => setViendoTrailer(false)}
                        aria-label="Cerrar tráiler"
                        className="absolute inset-0 cursor-default"
                    />
                    <div className="relative w-full max-w-4xl">
                        <button
                            type="button"
                            onClick={() => setViendoTrailer(false)}
                            className="mb-2 ml-auto block text-sm text-gray-300 transition hover:text-white"
                        >
                            ✕ Cerrar
                        </button>
                        <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
                            <iframe
                                src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1`}
                                title={`Tráiler de ${movie.title}`}
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                                className="h-full w-full"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
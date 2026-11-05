"use client";

import { useState, useSyncExternalStore } from "react";

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

export default function AccionesPelicula({
    movie,
}: {
    movie: {
        id: string | number;
        title: string;
        year?: number;
        director?: string;
        poster?: string;
    };
}) {
    // "Me gusta" sigue siendo visual: todavía no tiene tabla en la base
    const [meGusta, setMeGusta] = useState(false);

    // La watchlist se lee del navegador, igual que Mi lista
    const enLista = useSyncExternalStore(
        suscribir,
        () => leerWatchlist().some((p) => String(p.id) === String(movie.id)),
        () => false
    );

    const alternarLista = () => {
        const guardada = leerWatchlist();

        const actualizada = enLista
            ? guardada.filter((p) => String(p.id) !== String(movie.id))
            : [
                  ...guardada,
                  {
                      id: movie.id,
                      title: movie.title,
                      subtitle: `${movie.director || "Director desconocido"}, ${movie.year || ""}`,
                      poster: movie.poster || "",
                  },
              ];

        localStorage.setItem("lumina_watchlist", JSON.stringify(actualizada));
        window.dispatchEvent(new Event("storage"));
    };

    const base =
        "flex h-14 w-20 flex-col items-center justify-center gap-1 rounded border text-[11px] transition";
    const activo = "border-primary text-primary";
    const inactivo = "border-white/20 text-muted hover:border-primary hover:text-primary";

    return (
        <div className="flex gap-3">
            <button
                type="button"
                onClick={() => setMeGusta((v) => !v)}
                aria-pressed={meGusta}
                className={`${base} ${meGusta ? activo : inactivo}`}
            >
                <span className="text-lg leading-none">{meGusta ? "♥" : "♡"}</span>
                Me gusta
            </button>

            <button
                type="button"
                onClick={alternarLista}
                aria-pressed={enLista}
                className={`${base} ${enLista ? activo : inactivo}`}
            >
                <span className="text-lg leading-none">{enLista ? "✓" : "◷"}</span>
                Watchlist
            </button>
        </div>
    );
}
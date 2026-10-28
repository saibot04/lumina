"use client";

import { useState, useEffect } from "react";

interface MovieActionsProps {
    movie: {
        id: string | number;
        title: string;
        year?: number;
        director?: string;
        poster?: string;
    };
}

export default function MovieActions({ movie }: MovieActionsProps) {
    const [enWatchlist, setEnWatchlist] = useState(false);

    useEffect(() => {
        const watchlistGuardada = JSON.parse(localStorage.getItem("lumina_watchlist") || "[]");
        const existe = watchlistGuardada.some((p: any) => String(p.id) === String(movie.id));
        setEnWatchlist(existe);
    }, [movie.id]);

    const toggleWatchlist = () => {
        const watchlistGuardada = JSON.parse(localStorage.getItem("lumina_watchlist") || "[]");

        if (enWatchlist) {
            // La sacamos de la lista
            const actualizada = watchlistGuardada.filter((p: any) => String(p.id) !== String(movie.id));
            localStorage.setItem("lumina_watchlist", JSON.stringify(actualizada));
            setEnWatchlist(false);
            window.dispatchEvent(new Event("storage"));
            alert(`"${movie.title}" fue eliminada de tu Watchlist.`);
        } else {
            // La agregamos a la lista
            const nuevaPeli = {
                id: movie.id,
                title: movie.title,
                subtitle: `${movie.director || "Director desconocido"}, ${movie.year || "2026"}`,
                poster: movie.poster || ""
            };
            const actualizada = [...watchlistGuardada, nuevaPeli];
            localStorage.setItem("lumina_watchlist", JSON.stringify(actualizada));
            setEnWatchlist(true);
            window.dispatchEvent(new Event("storage"));
            alert(`¡"${movie.title}" se agregó a tu Watchlist (Mi lista)!`);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-4">
            <button className="rounded-xl bg-[#fccb30] text-black px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition hover:brightness-110">
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
        </div>
    );
}
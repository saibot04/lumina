"use client";

import { useState } from "react";

const base =
  "flex h-14 w-20 flex-col items-center justify-center gap-1 rounded border text-[11px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const inactivo =
  "border-primary bg-transparent text-primary [@media(hover:hover)]:hover:bg-primary [@media(hover:hover)]:hover:text-black focus-visible:bg-primary focus-visible:text-black";
const activo = "border-primary bg-primary text-black";

export default function AccionesPelicula() {
const [meGusta, setMeGusta] = useState(false);
const [enLista, setEnLista] = useState(false);

// TODO (backend): persistir me gusta / watchlist

return (
    <div className="flex gap-3">
    <button
        type="button"
        onClick={() => setMeGusta((v) => !v)}
        aria-pressed={meGusta}
        aria-label={meGusta ? "Quitar me gusta" : "Me gusta"}
        className={`${base} ${meGusta ? activo : inactivo}`}
    >
        <span className="text-lg leading-none">{meGusta ? "♥" : "♡"}</span>
        Me gusta
    </button>

    <button
        type="button"
        onClick={() => setEnLista((v) => !v)}
        aria-pressed={enLista}
        aria-label={enLista ? "Quitar de watchlist" : "Agregar a watchlist"}
        className={`${base} ${enLista ? activo : inactivo}`}
    >
        <span className="text-lg leading-none">{enLista ? "✓" : "◷"}</span>
        Watchlist
    </button>
    </div>
);
}
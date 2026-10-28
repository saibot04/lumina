"use client";

import { useState } from "react";

export default function AccionesPelicula() {
const [meGusta, setMeGusta] = useState(false);
const [enLista, setEnLista] = useState(false);

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
        onClick={() => setEnLista((v) => !v)}
        aria-pressed={enLista}
        className={`${base} ${enLista ? activo : inactivo}`}
    >
        <span className="text-lg leading-none">{enLista ? "✓" : "◷"}</span>
        Watchlist
    </button>
    </div>
);
}
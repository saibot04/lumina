"use client";

import { useState } from "react";
import type { Resena } from "@/lib/movies";
import Estrellas from "./Estrellas";

function formatearFecha(iso: string) {
const [anio, mes, dia] = iso.split("-");
return `${dia}/${mes}/${anio}`;
}

export default function ResenaCard({ resena }: { resena: Resena }) {
const [meGusta, setMeGusta] = useState(false);
const likes = (resena.likes ?? 0) + (meGusta ? 1 : 0);

return (
    <li className="rounded-lg border border-white/10 p-4">
    <div className="flex items-start gap-3">
        <div
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-field text-sm font-medium"
        aria-hidden="true"
        >
        {resena.usuario.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium">{resena.usuario}</span>
            <Estrellas valor={resena.puntuacion} tamano="h-3.5 w-3.5" />
            <span className="text-xs text-muted">· {formatearFecha(resena.fecha)}</span>
        </div>
        {resena.texto && <p className="mt-2 text-sm text-muted">{resena.texto}</p>}
        </div>
    </div>

    <div className="mt-3 flex gap-5 border-t border-white/10 pt-3 text-xs text-muted">
        <button type="button" className="transition hover:text-primary">
        Responder
        </button>
        <button
        type="button"
        onClick={() => setMeGusta((v) => !v)}
        aria-pressed={meGusta}
        className={`transition hover:text-primary ${meGusta ? "text-primary" : ""}`}
        >
        {meGusta ? "♥" : "♡"} Me gusta{likes > 0 ? ` (${likes})` : ""}
        </button>
    </div>
    </li>
);
}
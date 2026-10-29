"use client";

import { useEffect, useRef, useState } from "react";
import type { Resena } from "@/lib/movies";
import Estrellas from "./Estrellas";

const PASOS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const coma = (n: number) => String(n).replace(".", ",");

export default function ResumenCalificaciones({ reviews }: { reviews: Resena[] }) {
const [activa, setActiva] = useState<number | null>(null);
const contenedor = useRef<HTMLDivElement>(null);

const total = reviews.length;
const promedio =
    total > 0 ? reviews.reduce((suma, r) => suma + r.puntuacion, 0) / total : null;
const cuentas = PASOS.map((p) => reviews.filter((r) => r.puntuacion === p).length);
const maximo = Math.max(...cuentas, 1);

useEffect(() => {
    if (activa === null) return;
    function cerrar(e: PointerEvent) {
    if (contenedor.current && !contenedor.current.contains(e.target as Node)) {
        setActiva(null);
    }
    }
    document.addEventListener("pointerdown", cerrar);
    return () => document.removeEventListener("pointerdown", cerrar);
}, [activa]);

return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8">
    <div className="shrink-0 sm:border-r sm:border-white/10 sm:pr-8">
        <p className="text-4xl font-bold leading-none">
        {promedio !== null ? coma(Number(promedio.toFixed(1))) : "–"}
        <span className="text-base font-normal text-muted"> / 5</span>
        </p>
        <div className="mt-2">
        <Estrellas valor={promedio ?? 0} tamano="h-4 w-4" />
        </div>
        <p className="mt-1 text-xs text-muted">
        Basado en {total} {total === 1 ? "voto" : "votos"}
        </p>
    </div>

    <div className="min-w-0 flex-1" ref={contenedor}>
        <p className="mb-2 text-right text-[10px] uppercase tracking-wider text-muted">
        {total} {total === 1 ? "voto" : "votos"}
        </p>

        <div role="group" aria-label="Distribución de calificaciones">
        <div className="flex h-24 items-end gap-1 border-b border-dashed border-white/10">
            {cuentas.map((c, i) => {
            const altura = Math.max((c / maximo) * 100, 6);
            const seleccionada = activa === i;
            const alineacion =
                i === 0
                ? "left-0"
                : i === PASOS.length - 1
                ? "right-0"
                : "left-1/2 -translate-x-1/2";

            return (
                <div key={PASOS[i]} className="relative flex h-full flex-1 items-end">
                {seleccionada && (
                    <span
                    role="status"
                    className={`absolute z-10 whitespace-nowrap rounded border border-white/10 bg-background px-2 py-1 text-[10px] text-foreground shadow-lg ${alineacion}`}
                    style={{ bottom: `calc(${altura}% + 6px)` }}
                    >
                    {c} {c === 1 ? "persona" : "personas"} · {coma(PASOS[i])} ★
                    </span>
                )}
                <button
                    type="button"
                    onClick={() => setActiva(i)}
                    onMouseEnter={() => setActiva(i)}
                    onMouseLeave={() => setActiva(null)}
                    onFocus={() => setActiva(i)}
                    onBlur={() => setActiva(null)}
                    aria-label={`${coma(PASOS[i])} estrellas: ${c} ${c === 1 ? "persona" : "personas"}`}
                    className="flex h-full w-full items-end rounded-t focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <span
                    className={`w-full rounded-t transition-colors duration-150 ${
                        seleccionada ? "bg-primary" : "bg-white/15"
                    }`}
                    style={{ height: `${altura}%` }}
                    />
                </button>
                </div>
            );
            })}
        </div>

        <div className="mt-1 flex gap-1" aria-hidden="true">
            {PASOS.map((p) => (
            <span key={p} className="flex-1 text-center text-[10px] text-muted">
                {coma(p)}
            </span>
            ))}
        </div>
        </div>
    </div>
    </div>
);
}
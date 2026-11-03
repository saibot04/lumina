"use client";

import { useId, useRef, useState } from "react";
import type { Miembro, MiembroEquipo } from "@/lib/movies";

type Pestana = "cast" | "equipo" | "detalles";

const PESTANAS: { id: Pestana; etiqueta: string }[] = [
{ id: "cast", etiqueta: "Cast" },
{ id: "equipo", etiqueta: "Equipo" },
{ id: "detalles", etiqueta: "Detalles" },
];

const dinero = new Intl.NumberFormat("es-AR", {
style: "currency",
currency: "USD",
maximumFractionDigits: 0,
});

export default function DetallesPelicula({
cast,
equipo,
pais,
presupuesto,
ingresos,
}: {
cast?: Miembro[];
equipo?: MiembroEquipo[];
pais?: string;
presupuesto?: number;
ingresos?: number;
}) {
const [activa, setActiva] = useState<Pestana>("detalles");
const refs = useRef<Record<Pestana, HTMLButtonElement | null>>({
    cast: null,
    equipo: null,
    detalles: null,
});
const base = useId();

function moverFoco(destino: Pestana) {
    setActiva(destino);
    refs.current[destino]?.focus();
}

function alTeclear(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    moverFoco(PESTANAS[(i + 1) % PESTANAS.length].id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    moverFoco(PESTANAS[(i - 1 + PESTANAS.length) % PESTANAS.length].id);
    } else if (e.key === "Home") {
    e.preventDefault();
    moverFoco(PESTANAS[0].id);
    } else if (e.key === "End") {
    e.preventDefault();
    moverFoco(PESTANAS[PESTANAS.length - 1].id);
    }
}

return (
    <div className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-6">
    <div
        role="tablist"
        aria-label="Información de la película"
        className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0"
    >
        {PESTANAS.map((p, i) => (
        <button
            key={p.id}
            ref={(el) => {
            refs.current[p.id] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${p.id}`}
            aria-selected={activa === p.id}
            aria-controls={`${base}-panel-${p.id}`}
            tabIndex={activa === p.id ? 0 : -1}
            onClick={() => setActiva(p.id)}
            onKeyDown={(e) => alTeclear(e, i)}
            className={`shrink-0 rounded px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            activa === p.id
                ? "bg-primary text-black"
                : "bg-field text-foreground [@media(hover:hover)]:hover:bg-field/70"
            }`}
        >
            {p.etiqueta}
        </button>
        ))}
    </div>

    <div
        role="tabpanel"
        id={`${base}-panel-${activa}`}
        aria-labelledby={`${base}-tab-${activa}`}
        tabIndex={0}
        className="min-w-0 focus-visible:outline-none"
    >
        {activa === "cast" && (
        <>
            {cast && cast.length > 0 ? (
            <ul className="space-y-2">
                {cast.map((c) => (
                <li
                    key={`${c.nombre}-${c.personaje}`}
                    className="rounded-lg bg-field/50 px-4 py-3 text-sm"
                >
                    <p className="font-medium">{c.nombre}</p>
                    <p className="text-xs text-muted">como {c.personaje}</p>
                </li>
                ))}
            </ul>
            ) : (
            <p className="text-sm text-muted">Elenco no disponible.</p>
            )}
        </>
        )}

        {activa === "equipo" && (
        <>
            {equipo && equipo.length > 0 ? (
            <ul className="space-y-2">
                {/* TODO (backend): el equipo llega desde la API, ya viene con nombre y puesto */}
                {equipo.map((m) => (
                <li
                    key={`${m.nombre}-${m.puesto}`}
                    className="rounded-lg bg-field/50 px-4 py-3 text-sm"
                >
                    <span className="font-medium">{m.nombre}</span>
                    <span className="text-muted"> — {m.puesto}</span>
                </li>
                ))}
            </ul>
            ) : (
            <p className="text-sm text-muted">Equipo no disponible.</p>
            )}
        </>
        )}

        {activa === "detalles" && (
        <div className="grid gap-3 sm:grid-cols-3">
            {/* TODO (backend): país, presupuesto e ingresos vienen de la API */}
            <div className="rounded-lg bg-field px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-muted">País</p>
            <p className="mt-1 text-sm">{pais ?? "No disponible"}</p>
            </div>
            <div className="rounded-lg bg-field px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-muted">Presupuesto</p>
            <p className="mt-1 text-sm">
                {presupuesto !== undefined ? dinero.format(presupuesto) : "No disponible"}
            </p>
            </div>
            <div className="rounded-lg bg-field px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-muted">Ingresos</p>
            <p className="mt-1 text-sm">
                {ingresos !== undefined ? dinero.format(ingresos) : "No disponible"}
            </p>
            </div>
        </div>
        )}
    </div>
    </div>
);
}
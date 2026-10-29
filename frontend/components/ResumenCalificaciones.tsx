"use client";

import { useEffect, useRef, useState } from "react";
import type { Resena } from "@/lib/movies";
import Estrellas from "./Estrellas";

const PASOS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const coma = (n: number) => String(n).replace(".", ",");

export default function ResumenCalificaciones({ reviews }: { reviews: Resena[] }) {
  const [activa, setActiva] = useState<number | null>(null);
  const grafico = useRef<HTMLDivElement>(null);

  const total = reviews.length;
  const promedio =
    total > 0 ? reviews.reduce((suma, r) => suma + r.puntuacion, 0) / total : null;
  const cuentas = PASOS.map((p) => reviews.filter((r) => r.puntuacion === p).length);
  const maximo = Math.max(...cuentas, 1);

  // En móvil: tocar fuera del gráfico cierra el tooltip
  useEffect(() => {
    if (activa === null) return;
    function cerrar(e: PointerEvent) {
      if (grafico.current && !grafico.current.contains(e.target as Node)) {
        setActiva(null);
      }
    }
    document.addEventListener("pointerdown", cerrar);
    return () => document.removeEventListener("pointerdown", cerrar);
  }, [activa]);

  return (
    <section className="flex min-h-[340px] w-full flex-col rounded-xl border border-white/10 bg-surface p-6 sm:min-h-[400px] sm:p-8 lg:p-10">
      {/* Cabecera: solo la cantidad de votos, a la derecha */}
      <div className="mb-8 flex items-center justify-end sm:mb-10">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted sm:text-xs">
          {total} {total === 1 ? "voto" : "votos"}
        </span>
      </div>

      {/* flex-1 hace que el contenido ocupe todo el alto de la tarjeta */}
      <div className="flex flex-1 flex-col justify-center gap-10 md:flex-row md:items-end md:gap-16">
        {/* Izquierda: promedio + estrellas + votos */}
        {/* Izquierda: promedio + estrellas + votos */}
          <div className="flex shrink-0 flex-col items-start md:-translate-y-9">
          <div className="flex items-baseline font-bold">
            <span className="text-6xl tracking-tighter text-white sm:text-7xl">
              {promedio !== null ? promedio.toFixed(1).replace(".", ",") : "0,0"}
            </span>
            <span className="ml-6 -translate-y-4 text-xl font-normal text-muted sm:ml-10 sm:-translate-y-4">/ 5 </span>
          </div>

          <div className="mt-3">
            <Estrellas valor={promedio ?? 0} tamano="h-6 w-6" />
          </div>

          <p className="mt-3 text-xs text-muted sm:text-sm">
            Basado en {total} {total === 1 ? "voto" : "votos"}
          </p>
        </div>

        {/* Derecha: gráfico de barras */}
        <div className="min-w-0 flex-1 md:pr-10 lg:pr-16" ref={grafico}>
          <div role="group" aria-label="Distribución de calificaciones">
            {/* Barras */}
            <div className="relative flex h-44 items-end gap-1.5 border-b border-white/10 sm:h-56 sm:gap-2.5">
              {/* Línea horizontal de referencia */}
              <div
                className="pointer-events-none absolute left-0 top-1/2 z-0 w-full border-t border-dashed border-white/15"
                aria-hidden="true"
              />

              {cuentas.map((c, i) => {
                const altura = Math.max((c / maximo) * 100, 4);
                const seleccionada = activa === i;

                const alineacion =
                  i === 0
                    ? "left-0"
                    : i === PASOS.length - 1
                    ? "right-0"
                    : "left-1/2 -translate-x-1/2";

                return (
                  <div
                    key={PASOS[i]}
                    className="relative z-10 flex h-full flex-1 flex-col items-center justify-end"
                  >
                    {seleccionada && (
                      <span
                        role="status"
                        className={`absolute z-20 whitespace-nowrap rounded border border-white/10 bg-neutral-900 px-2 py-1 text-[10px] text-white shadow-lg sm:text-xs ${alineacion}`}
                        style={{ bottom: `calc(${altura}% + 8px)` }}
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
                      aria-label={`${coma(PASOS[i])} estrellas: ${c} ${
                        c === 1 ? "persona" : "personas"
                      }`}
                      className="flex h-full w-full items-end focus-visible:outline-none"
                    >
                      <span
                        className={`w-full rounded-t-sm transition-colors duration-150 ${
                          seleccionada ? "bg-primary" : "bg-white/15"
                        }`}
                        style={{ height: `${altura}%` }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Eje X */}
            <div className="mt-3 flex gap-1.5 sm:gap-2.5" aria-hidden="true">
              {PASOS.map((p) => (
                <span
                  key={p}
                  className="flex-1 text-center text-[10px] font-medium text-muted sm:text-xs"
                >
                  {p === 5 ? "5 ★" : coma(p)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
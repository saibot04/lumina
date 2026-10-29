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
    <div className="relative flex flex-col gap-8 pt-2 md:flex-row md:items-end md:justify-between">
      {/* Etiqueta [N] VOTOS arriba a la derecha (estilo del diseño) */}
      <div className="absolute right-0 top-[-36px] text-[10px] font-medium uppercase tracking-wider text-muted sm:top-[-48px] sm:text-xs">
        {total} {total === 1 ? "voto" : "votos"}
      </div>

      {/* Lado Izquierdo: Promedio y estrellas */}
      <div className="flex min-w-[150px] shrink-0 flex-col items-start">
        <div className="flex items-baseline gap-1 font-bold">
          <span className="text-6xl tracking-tighter text-white">
            {promedio !== null ? coma(Number(promedio.toFixed(1))) : "–"}
          </span>
          <span className="text-lg font-normal text-muted">/ 5</span>
        </div>
        
        <div className="mt-2 text-primary">
          <Estrellas valor={promedio ?? 0} tamano="h-5 w-5" />
        </div>
        
        <p className="mt-2 text-xs text-muted">
          Basado en {total} {total === 1 ? "voto" : "votos"}
        </p>
      </div>

      {/* Lado Derecho: Gráfico interactivo */}
      <div className="relative mt-6 w-full max-w-md flex-1 md:mt-0" ref={contenedor}>
        
        {/* Línea horizontal tenue en el medio del gráfico (detrás de las barras) */}
        <div 
          className="absolute left-0 top-[60%] -z-10 h-[1px] w-full bg-white/5" 
          aria-hidden="true" 
        />

        <div role="group" aria-label="Distribución de calificaciones">
          {/* Contenedor de barras */}
          <div className="flex h-32 items-end justify-between gap-1 border-b border-white/10 pb-2">
            {cuentas.map((c, i) => {
              // Altura mínima visual para que se note la barra aunque sea 0
              const altura = Math.max((c / maximo) * 100, 4);
              const seleccionada = activa === i;
              
              // Evita que el tooltip se salga de la pantalla en los bordes
              const alineacion =
                i === 0
                  ? "left-0"
                  : i === PASOS.length - 1
                  ? "right-0"
                  : "left-1/2 -translate-x-1/2";

              return (
                <div key={PASOS[i]} className="relative flex h-full flex-1 flex-col items-center justify-end">
                  
                  {/* Tooltip flotante */}
                  {seleccionada && (
                    <span
                      role="status"
                      className={`absolute z-10 whitespace-nowrap rounded border border-white/10 bg-neutral-900 px-2 py-1 text-[10px] text-white shadow-lg ${alineacion}`}
                      style={{ bottom: `calc(${altura}% + 10px)` }}
                    >
                      {c} {c === 1 ? "persona" : "personas"} · {coma(PASOS[i])} ★
                    </span>
                  )}

                  {/* Botón interactivo (barra) */}
                  <button
                    type="button"
                    onClick={() => setActiva(i)}
                    onMouseEnter={() => setActiva(i)}
                    onMouseLeave={() => setActiva(null)}
                    onFocus={() => setActiva(i)}
                    onBlur={() => setActiva(null)}
                    aria-label={`${coma(PASOS[i])} estrellas: ${c} ${c === 1 ? "persona" : "personas"}`}
                    className="group flex h-full w-full max-w-[24px] items-end focus-visible:outline-none"
                  >
                    <span
                      className={`w-full rounded-t-sm transition-colors duration-150 ${
                        seleccionada 
                          ? "bg-primary" 
                          : "bg-white/15 group-hover:bg-primary/80"
                      }`}
                      style={{ height: `${altura}%` }}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Eje X (Valores) */}
          <div className="mt-2 flex justify-between px-1" aria-hidden="true">
            {PASOS.map((p) => (
              <span key={p} className="flex-1 text-center text-[10px] font-medium text-muted">
                {p === 5 ? "5 ★" : coma(p)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
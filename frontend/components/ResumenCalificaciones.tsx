import type { Resena } from "@/lib/movies";
import Estrella from "./Estrella";
import Estrellas from "./Estrellas";

const PASOS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export default function ResumenCalificaciones({ reviews }: { reviews: Resena[] }) {
const total = reviews.length;
const promedio =
    total > 0 ? reviews.reduce((suma, r) => suma + r.puntuacion, 0) / total : null;
const cuentas = PASOS.map((p) => reviews.filter((r) => r.puntuacion === p).length);
const maximo = Math.max(...cuentas, 1);

return (
    <div className="flex flex-wrap items-end gap-6">
    <div className="border-r border-white/10 pr-6">
        <p className="text-3xl font-bold">
        {promedio !== null ? promedio.toFixed(1).replace(".", ",") : "–"}
        <span className="text-base font-normal text-muted"> / 5</span>
        </p>
        <p className="text-xs text-muted">
        {total} {total === 1 ? "voto" : "votos"}
        </p>
    </div>

    <div className="flex min-w-[220px] flex-1 items-end gap-3">
        <Estrella tamano="h-4 w-4" />
        <div
        className="flex h-16 flex-1 items-end gap-1"
        role="img"
        aria-label="Distribución de calificaciones"
        >
        {cuentas.map((c, i) => (
            <div
            key={PASOS[i]}
            title={`${PASOS[i]} estrellas: ${c}`}
            className={`flex-1 rounded-t ${c === 0 ? "bg-white/10" : "bg-primary/70"}`}
            style={{ height: `${Math.max((c / maximo) * 100, 6)}%` }}
            />
        ))}
        </div>
        <Estrellas valor={5} tamano="h-4 w-4" />
    </div>
    </div>
);
}
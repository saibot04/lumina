import type { ActividadAmigo, TipoActividad } from "@/lib/movies";
import Estrellas from "./Estrellas";

const TEXTO: Record<TipoActividad, string> = {
califico: "calificó",
vio: "la vio",
guardo: "la guardó",
meGusta: "le dio me gusta",
};

export default function ActividadAmigos({ actividad }: { actividad: ActividadAmigo[] }) {
if (actividad.length === 0) {
    return (
    <p className="text-sm text-muted">
        Ningún amigo interactuó con esta película todavía.
    </p>
    );
}

return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
    {actividad.map((a) => (
        <li
        key={a.id}
        className="flex items-center gap-3 rounded-lg border border-white/10 bg-field/40 px-3 py-2"
        >
        <div
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-field bg-cover bg-center text-sm font-medium"
            style={
            a.usuario.avatar
                ? { backgroundImage: `url(${a.usuario.avatar})` }
                : undefined
            }
            aria-hidden="true"
        >
            {a.usuario.avatar ? "" : a.usuario.nombre.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
            <p className="truncate text-sm font-medium">{a.usuario.nombre}</p>
            {a.tipo === "califico" && a.calificacion !== undefined ? (
            <div className="mt-1">
                <Estrellas valor={a.calificacion} tamano="h-3 w-3" />
            </div>
            ) : (
            <p className="text-xs text-muted">{TEXTO[a.tipo]}</p>
            )}
        </div>
        </li>
    ))}
    </ul>
);
}
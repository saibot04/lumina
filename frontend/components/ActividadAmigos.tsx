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
    <ul className="flex flex-wrap gap-6">
    {actividad.map((a) => (
        <li key={a.id} className="flex flex-col items-center gap-1 text-center">
        <div
            className="grid h-10 w-10 place-items-center rounded-full bg-field bg-cover bg-center text-sm font-medium"
            style={
            a.usuario.avatar
                ? { backgroundImage: `url(${a.usuario.avatar})` }
                : undefined
            }
            aria-hidden="true"
        >
            {a.usuario.avatar ? "" : a.usuario.nombre.charAt(0).toUpperCase()}
        </div>
        <p className="text-xs">{a.usuario.nombre}</p>
        {a.tipo === "califico" && a.calificacion !== undefined ? (
            <Estrellas valor={a.calificacion} tamano="h-3 w-3" />
        ) : (
            <p className="text-[11px] text-muted">{TEXTO[a.tipo]}</p>
        )}
        </li>
    ))}
    </ul>
);
}
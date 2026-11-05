"use client";

import { useState } from "react";
import Link from "next/link";
import type { MiResena } from "@/lib/sesion";
import {
    publicarResena,
    editarResena,
    eliminarResena,
    deshacerResena,
} from "@/app/auth/resena-actions";

interface Review {
    usuario: string;
    puntuacion: number;
    texto: string;
    fecha: string;
}

interface MovieInteractionsProps {
    peliculaId: string;
    reviews: Review[];
    /** Nombre de usuario de quien está mirando la página (null si no inició sesión). */
    usuarioActual: string | null;
    /** La reseña de este usuario en esta película (null si todavía no reseñó). */
    miResena: MiResena;
    puedeDeshacer: boolean;
}

const LIMITE = 500;
const PASOS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

function estrellasTexto(n: number) {
    return "★".repeat(Math.floor(n)) + (n % 1 ? "½" : "");
}

function coma(n: number) {
    return String(n).replace(".", ",");
}

function formatearFecha(iso: string) {
    const [anio, mes, dia] = iso.split("-");
    return `${dia}/${mes}/${anio}`;
}

/** Cinco estrellas que se pueden elegir de a media (HU-08: de 0,5 a 5). */
function SelectorEstrellas({
    valor,
    onCambio,
}: {
    valor: number;
    onCambio: (n: number) => void;
}) {
    const [hover, setHover] = useState<number | null>(null);
    const mostrado = hover ?? valor;

    return (
        <div className="flex text-3xl" onMouseLeave={() => setHover(null)}>
            {[1, 2, 3, 4, 5].map((n) => {
                const llena = Math.min(1, Math.max(0, mostrado - (n - 1)));
                return (
                    <span key={n} className="relative inline-block leading-none text-gray-700">
                        ★
                        <span
                            aria-hidden="true"
                            className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-[#fccb30]"
                            style={{ width: `${llena * 100}%` }}
                        >
                            ★
                        </span>
                        <button
                            type="button"
                            aria-label={`${coma(n - 0.5)} estrellas`}
                            onMouseEnter={() => setHover(n - 0.5)}
                            onClick={() => onCambio(n - 0.5)}
                            className="absolute inset-y-0 left-0 w-1/2 cursor-pointer"
                        />
                        <button
                            type="button"
                            aria-label={`${n} estrellas`}
                            onMouseEnter={() => setHover(n)}
                            onClick={() => onCambio(n)}
                            className="absolute inset-y-0 right-0 w-1/2 cursor-pointer"
                        />
                    </span>
                );
            })}
        </div>
    );
}

export default function MovieInteractions({
    peliculaId,
    reviews,
    usuarioActual,
    miResena,
    puedeDeshacer,
}: MovieInteractionsProps) {
    const [valor, setValor] = useState(0);
    const [texto, setTexto] = useState("");
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState("");
    const [trabajando, setTrabajando] = useState(false);

    // El promedio y el gráfico salen de las reseñas guardadas
    const total = reviews.length;
    const promedio =
        total > 0 ? reviews.reduce((suma, r) => suma + r.puntuacion, 0) / total : null;
    const cuentas = PASOS.map((p) => reviews.filter((r) => r.puntuacion === p).length);
    const maximo = Math.max(...cuentas, 1);

    const mostrarFormulario = !miResena || editando;

    const guardar = async (e: React.FormEvent) => {
        e.preventDefault();
        if (valor === 0) {
            setError("Elegí una puntuación.");
            return;
        }

        setTrabajando(true);
        setError("");
        const datos = { puntuacion: valor, texto: texto.trim() };
        const r = miResena
            ? await editarResena(peliculaId, datos)
            : await publicarResena(peliculaId, datos);
        setTrabajando(false);

        if (!r.ok) {
            setError(r.errores?.puntuacion ?? r.errores?.texto ?? r.error ?? "No se pudo guardar.");
            return;
        }
        setEditando(false);
        setValor(0);
        setTexto("");
    };

    const empezarEdicion = () => {
        if (!miResena) return;
        setValor(miResena.puntuacion);
        setTexto(miResena.texto);
        setError("");
        setEditando(true);
    };

    const cancelarEdicion = () => {
        setEditando(false);
        setError("");
    };

    const quitar = async () => {
        // HU-10: se pide confirmación antes de eliminar
        if (!window.confirm("¿Eliminar tu reseña de esta película?")) return;

        setTrabajando(true);
        setError("");
        const r = await eliminarResena(peliculaId);
        setTrabajando(false);

        if (!r.ok) {
            setError(r.error ?? "No se pudo eliminar la reseña.");
            return;
        }
        setEditando(false);
        setValor(0);
        setTexto("");
    };

    const deshacer = async () => {
        setTrabajando(true);
        setError("");
        const r = await deshacerResena();
        setTrabajando(false);

        if (!r.ok) {
            setError(r.error ?? "No se pudo deshacer la acción.");
            return;
        }
        setEditando(false);
        setValor(0);
        setTexto("");
    };

    return (
        <div className="space-y-8 text-white">

            {/* 1. CALIFICACIONES Y ESTADÍSTICAS */}
            <section className="bg-[#141414] border border-white/5 p-6 rounded-2xl">
                <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-4 font-semibold">Calificaciones</h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold">{promedio !== null ? coma(Number(promedio.toFixed(1))) : "—"}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest">
                            / 5 <br />({total} {total === 1 ? "voto" : "votos"})
                        </div>
                    </div>

                    {/* Cuántas reseñas recibió cada puntuación, de 0,5 a 5 */}
                    <div className="flex items-end gap-1.5 h-12" role="img" aria-label="Distribución de calificaciones">
                        {cuentas.map((c, i) => (
                            <div
                                key={PASOS[i]}
                                title={`${coma(PASOS[i])} estrellas: ${c}`}
                                className={`w-2.5 rounded-t transition-colors hover:bg-[#fccb30] ${
                                    c > 0 ? "bg-[#fccb30]/70" : "bg-white/10"
                                }`}
                                style={{ height: `${Math.max((c / maximo) * 100, 8)}%` }}
                            />
                        ))}
                    </div>

                    <div className="flex gap-1 text-[#fccb30] text-lg" aria-hidden="true">
                        {promedio !== null ? estrellasTexto(Math.round(promedio * 2) / 2) : ""}
                    </div>
                </div>
            </section>

            {/* 2. TU CALIFICACIÓN Y TU RESEÑA */}
            <section className="bg-[#141414] border border-white/5 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Tu calificación</h2>
                    {usuarioActual && (
                        <button
                            type="button"
                            onClick={deshacer}
                            disabled={!puedeDeshacer || trabajando}
                            title={puedeDeshacer ? "Deshacer tu última acción sobre una reseña" : "No hay acciones para deshacer"}
                            className="border border-white/20 text-gray-300 text-[11px] px-3 py-1.5 rounded uppercase disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            ↶ Deshacer
                        </button>
                    )}
                </div>

                {/* Sin sesión: solo se puede mirar */}
                {!usuarioActual && (
                    <p className="text-sm text-gray-400">
                        <Link href="/login" className="text-[#fccb30] hover:underline">
                            Iniciá sesión
                        </Link>{" "}
                        para calificar y escribir reseñas.
                    </p>
                )}

                {/* Con sesión y ya reseñada: se muestra tu reseña */}
                {usuarioActual && miResena && !editando && (
                    <div className="space-y-2">
                        <p className="text-[#fccb30] text-2xl tracking-widest" aria-label={`${miResena.puntuacion} de 5 estrellas`}>
                            {estrellasTexto(miResena.puntuacion)}{" "}
                            <span className="text-sm text-gray-400 tracking-normal">
                                {coma(miResena.puntuacion)} / 5
                            </span>
                        </p>
                        {miResena.texto && <p className="text-sm text-gray-300">{miResena.texto}</p>}
                        <div className="flex gap-4 pt-1 text-xs uppercase">
                            <button
                                type="button"
                                onClick={empezarEdicion}
                                disabled={trabajando}
                                className="text-gray-400 hover:text-[#fccb30] disabled:opacity-40"
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                onClick={quitar}
                                disabled={trabajando}
                                className="text-gray-400 hover:text-red-400 disabled:opacity-40"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                )}

                {/* Con sesión y sin reseña (o editando): formulario */}
                {usuarioActual && mostrarFormulario && (
                    <form onSubmit={guardar} className="space-y-3">
                        <div className="flex items-center gap-3">
                            <SelectorEstrellas valor={valor} onCambio={setValor} />
                            <span className="text-sm text-gray-400">
                                {valor > 0 ? `${coma(valor)} / 5` : "Sin calificar"}
                            </span>
                        </div>

                        <label htmlFor="resena" className="block text-xs uppercase tracking-wider text-gray-400 font-semibold pt-2">
                            + Añade una reseña (opcional):
                        </label>
                        <textarea
                            id="resena"
                            rows={3}
                            maxLength={LIMITE}
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                            placeholder="Escribí lo que te pareció la película..."
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#fccb30]"
                        />

                        <div className="flex items-center justify-between gap-3">
                            <span className="text-[11px] text-gray-500">
                                {texto.length}/{LIMITE}
                            </span>
                            <div className="flex items-center gap-3">
                                {editando && (
                                    <button
                                        type="button"
                                        onClick={cancelarEdicion}
                                        className="text-xs text-gray-400 hover:text-white"
                                    >
                                        Cancelar
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={trabajando}
                                    className="bg-[#fccb30] text-black text-xs font-medium px-5 py-2 rounded-lg uppercase tracking-wider hover:brightness-110 disabled:opacity-50"
                                >
                                    {trabajando ? "Guardando…" : editando ? "Guardar cambios" : "Publicar reseña"}
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {error && (
                    <p role="alert" className="text-xs text-red-400">
                        {error}
                    </p>
                )}
            </section>

            {/* 3. ACTIVIDAD DE AMIGOS (datos de ejemplo: todavía no hay amigos en la base) */}
            <section className="bg-[#141414] border border-white/5 p-6 rounded-2xl">
                <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-4 font-semibold">Actividad de amigos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-black/30 p-3 rounded-xl flex items-center gap-3 border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">C</div>
                        <div>
                            <p className="text-xs font-medium">Carlos</p>
                            <p className="text-[#fccb30] text-xs">★★★★☆</p>
                        </div>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl flex items-center gap-3 border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">S</div>
                        <div>
                            <p className="text-xs font-medium">Sofia</p>
                            <p className="text-[#fccb30] text-xs">★★★★★</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. RESEÑAS DE LA COMUNIDAD (de la más reciente a la más antigua) */}
            <section className="space-y-4">
                <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Reseñas de la comunidad</h2>
                {reviews.length === 0 ? (
                    <p className="text-sm text-gray-500 py-4">Todavía no hay reseñas para esta película.</p>
                ) : (
                    reviews.map((r) => (
                        <div key={r.usuario} className="bg-[#141414] border border-white/5 p-5 rounded-2xl space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-[10px] font-bold">
                                        {r.usuario.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-semibold">
                                        {r.usuario}
                                        {r.usuario === usuarioActual && (
                                            <span className="ml-1 text-xs font-normal text-gray-500">(vos)</span>
                                        )}
                                    </span>
                                    <span className="text-[#fccb30] text-xs" aria-label={`${r.puntuacion} de 5 estrellas`}>
                                        {estrellasTexto(r.puntuacion)}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500">{formatearFecha(r.fecha)}</span>
                            </div>
                            {r.texto && <p className="text-sm text-gray-300">{r.texto}</p>}
                            <div className="flex gap-4 pt-2 text-xs text-gray-400">
                                <button type="button" className="hover:text-white transition-colors">Responder</button>
                                <button type="button" className="hover:text-[#fccb30] transition-colors">♥ Me gusta</button>
                            </div>
                        </div>
                    ))
                )}
            </section>

        </div>
    );
}
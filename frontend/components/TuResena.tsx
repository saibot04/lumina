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

const LIMITE = 500;

function coma(n: number) {
    return String(n).replace(".", ",");
}

function estrellasTexto(n: number) {
    return "★".repeat(Math.floor(n)) + (n % 1 ? "½" : "");
}

/** Cinco estrellas que se eligen de a media (HU-08: de 0,5 a 5). */
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
                    <span key={n} className="relative inline-block leading-none text-white/20">
                        ★
                        <span
                            aria-hidden="true"
                            className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-primary"
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

export default function TuResena({
    peliculaId,
    usuarioActual,
    miResena,
    puedeDeshacer,
}: {
    peliculaId: string;
    /** Nombre de usuario de quien mira la página (null si no inició sesión). */
    usuarioActual: string | null;
    /** La reseña de este usuario en esta película (null si todavía no reseñó). */
    miResena: MiResena;
    puedeDeshacer: boolean;
}) {
    const [valor, setValor] = useState(0);
    const [texto, setTexto] = useState("");
    const [editando, setEditando] = useState(false);
    const [error, setError] = useState("");
    const [trabajando, setTrabajando] = useState(false);

    const mostrarFormulario = !miResena || editando;

    const limpiar = () => {
        setEditando(false);
        setValor(0);
        setTexto("");
    };

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
        limpiar();
    };

    const empezarEdicion = () => {
        if (!miResena) return;
        setValor(miResena.puntuacion);
        setTexto(miResena.texto);
        setError("");
        setEditando(true);
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
        limpiar();
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
        limpiar();
    };

    // Sin sesión solo se puede mirar
    if (!usuarioActual) {
        return (
            <p className="text-sm text-muted">
                <Link href="/login" className="text-primary hover:underline">
                    Iniciá sesión
                </Link>{" "}
                para calificar y escribir reseñas.
            </p>
        );
    }

    return (
        <div className="space-y-5">
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={deshacer}
                    disabled={!puedeDeshacer || trabajando}
                    title={
                        puedeDeshacer
                            ? "Deshacer tu última acción sobre una reseña"
                            : "No hay acciones para deshacer"
                    }
                    className="rounded border border-white/20 px-3 py-1.5 text-[11px] uppercase text-muted transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:text-muted"
                >
                    ↶ Deshacer
                </button>
            </div>

            {/* Ya reseñada: se muestra tu reseña */}
            {miResena && !editando && (
                <div className="space-y-2">
                    <p
                        className="text-2xl tracking-widest text-primary"
                        aria-label={`${miResena.puntuacion} de 5 estrellas`}
                    >
                        {estrellasTexto(miResena.puntuacion)}{" "}
                        <span className="text-sm tracking-normal text-muted">
                            {coma(miResena.puntuacion)} / 5
                        </span>
                    </p>
                    {miResena.texto && <p className="text-sm text-muted">{miResena.texto}</p>}
                    <div className="flex gap-4 pt-1 text-xs uppercase">
                        <button
                            type="button"
                            onClick={empezarEdicion}
                            disabled={trabajando}
                            className="text-muted transition hover:text-primary disabled:opacity-40"
                        >
                            Editar
                        </button>
                        <button
                            type="button"
                            onClick={quitar}
                            disabled={trabajando}
                            className="text-muted transition hover:text-red-400 disabled:opacity-40"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            )}

            {/* Sin reseña (o editando): formulario */}
            {mostrarFormulario && (
                <form onSubmit={guardar} className="space-y-4">
                    <div className="flex items-center gap-3">
                        <SelectorEstrellas valor={valor} onCambio={setValor} />
                        <span className="text-sm text-muted">
                            {valor > 0 ? `${coma(valor)} / 5` : "Sin calificar"}
                        </span>
                    </div>

                    <div>
                        <label htmlFor="resena" className="mb-2 block text-sm">
                            + Añade una reseña (opcional):
                        </label>
                        <textarea
                            id="resena"
                            value={texto}
                            maxLength={LIMITE}
                            onChange={(e) => setTexto(e.target.value)}
                            rows={4}
                            placeholder="Contá qué te pareció"
                            className="w-full resize-none rounded bg-field px-3 py-2 text-sm outline-none placeholder:text-muted focus:ring-1 focus:ring-primary"
                        />
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-muted">
                                {texto.length}/{LIMITE}
                            </span>
                            <div className="flex items-center gap-3">
                                {editando && (
                                    <button
                                        type="button"
                                        onClick={limpiar}
                                        className="text-xs text-muted hover:text-foreground"
                                    >
                                        Cancelar
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={trabajando}
                                    className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {trabajando
                                        ? "Guardando…"
                                        : editando
                                        ? "Guardar cambios"
                                        : "Publicar"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {error && (
                <p role="alert" className="text-xs text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}
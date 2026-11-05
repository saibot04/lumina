"use client";

import React, { useState } from "react";

export type OpcionPelicula = { id: string; title: string };

export type DatosModal = {
    titulo: string;
    texto?: string;
    estrellas?: number;
    peliculaId?: string;
};

interface ModalProps {
    tipo: "favorito" | "reseña" | "peliVivida" | "watchlist" | "mg" | null;
    onClose: () => void;
    /** Si devuelve un texto, el modal sigue abierto y lo muestra como error. */
    onGuardar: (datos: DatosModal) => void | string | Promise<void | string>;
    /** Películas del catálogo, para elegir al escribir una reseña. */
    peliculas?: OpcionPelicula[];
    /** Datos de una reseña que se está editando. */
    inicial?: { peliculaId: string; estrellas: number; texto: string };
}

const LIMITE_RESENA = 500;
const PUNTUACIONES = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];

function etiquetaPuntuacion(n: number) {
    const llenas = "★".repeat(Math.floor(n));
    const media = n % 1 ? "½" : "";
    return `${llenas}${media} (${String(n).replace(".", ",")})`;
}

const campo =
    "w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-[#fccb30] text-white";

export default function ModalAgregar({ tipo, onClose, onGuardar, peliculas, inicial }: ModalProps) {
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState(inicial?.texto ?? "");
    const [estrellas, setEstrellas] = useState(inicial?.estrellas ?? 5);
    const [peliculaId, setPeliculaId] = useState(inicial?.peliculaId ?? "");
    const [error, setError] = useState("");
    const [guardando, setGuardando] = useState(false);

    if (!tipo) return null;

    const lista = peliculas ?? [];
    const eligePelicula = tipo === "reseña" && lista.length > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const elegida = eligePelicula ? lista.find((p) => p.id === peliculaId) : undefined;
        const tituloFinal = eligePelicula ? (elegida?.title ?? "") : titulo.trim();

        if (!tituloFinal) {
            setError(eligePelicula ? "Elegí una película." : "Escribí el título de la película.");
            return;
        }

        setGuardando(true);
        const mensaje = await onGuardar({
            titulo: tituloFinal,
            texto,
            estrellas,
            peliculaId: elegida?.id,
        });
        setGuardando(false);

        if (typeof mensaje === "string") {
            setError(mensaje);
            return;
        }

        setTitulo("");
        setTexto("");
        setEstrellas(5);
        setPeliculaId("");
        onClose();
    };

    const titulosMap = {
        favorito: "Agregar Película Favorita",
        reseña: inicial ? "Editar Reseña" : "Escribir Reseña",
        peliVivida: "Registrar Película Vista",
        watchlist: "Añadir a Watchlist",
        mg: "Marcar Me Gusta",
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#141414] border border-white/10 w-full max-w-md p-6 rounded-2xl shadow-2xl space-y-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-base font-medium text-[#fccb30]">{titulosMap[tipo]}</h3>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Película</label>
                        {eligePelicula ? (
                            <>
                                <select
                                    value={peliculaId}
                                    onChange={(e) => setPeliculaId(e.target.value)}
                                    disabled={Boolean(inicial)}
                                    className={`${campo} disabled:opacity-60`}
                                    autoFocus
                                >
                                    <option value="">Elegí una película</option>
                                    {lista.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.title}
                                        </option>
                                    ))}
                                </select>
                                {!inicial && (
                                    <p className="mt-1 text-[11px] text-gray-500">
                                        Si ya reseñaste esa película, se actualiza tu reseña.
                                    </p>
                                )}
                            </>
                        ) : (
                            <input
                                type="text"
                                placeholder="Ej: Superman"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                className={campo}
                                autoFocus
                            />
                        )}
                    </div>

                    {tipo === "reseña" && (
                        <>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Tu opinión (opcional)</label>
                                <textarea
                                    placeholder="Escribí lo que te pareció..."
                                    rows={3}
                                    maxLength={LIMITE_RESENA}
                                    value={texto}
                                    onChange={(e) => setTexto(e.target.value)}
                                    className={campo}
                                />
                                <p className="mt-1 text-right text-[11px] text-gray-500">
                                    {texto.length}/{LIMITE_RESENA}
                                </p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Puntuación</label>
                                <select
                                    value={estrellas}
                                    onChange={(e) => setEstrellas(Number(e.target.value))}
                                    className={campo}
                                >
                                    {PUNTUACIONES.map((n) => (
                                        <option key={n} value={n}>
                                            {etiquetaPuntuacion(n)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    {error && (
                        <p role="alert" className="text-xs text-red-400">
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-xs text-gray-400 hover:text-white">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={guardando}
                            className="bg-[#fccb30] text-black text-xs font-medium px-4 py-2 rounded uppercase tracking-wider hover:brightness-110 disabled:opacity-50"
                        >
                            {guardando ? "Guardando…" : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
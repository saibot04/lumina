"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function BotonTrailer({
    trailerKey,
    titulo,
}: {
    /** Clave del video de YouTube. Viene de la API. */
    trailerKey?: string;
    titulo: string;
}) {
    const [abierto, setAbierto] = useState(false);

    // Cerrar con Escape
    useEffect(() => {
        if (!abierto) return;
        const alPulsar = (e: KeyboardEvent) => {
            if (e.key === "Escape") setAbierto(false);
        };
        document.addEventListener("keydown", alPulsar);
        return () => document.removeEventListener("keydown", alPulsar);
    }, [abierto]);

    return (
        <>
            <button
                type="button"
                onClick={() => setAbierto(true)}
                disabled={!trailerKey}
                title={trailerKey ? undefined : "Tráiler no disponible"}
                aria-label={
                    trailerKey
                        ? `Ver tráiler de ${titulo}`
                        : `Tráiler de ${titulo} no disponible`
                }
                className="inline-flex min-h-10 items-center gap-2 rounded border border-primary bg-primary px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-black transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:opacity-40"
            >
                ▶ Trailer
            </button>

            {/* Se dibuja en el body para que quede por encima del header */}
            {abierto &&
                trailerKey &&
                createPortal(
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Tráiler de ${titulo}`}
                    >
                        <button
                            type="button"
                            onClick={() => setAbierto(false)}
                            aria-label="Cerrar tráiler"
                            className="absolute inset-0 cursor-default"
                        />
                        <div className="relative w-full max-w-4xl">
                            <button
                                type="button"
                                onClick={() => setAbierto(false)}
                                autoFocus
                                className="mb-2 ml-auto block text-sm text-gray-300 transition hover:text-white"
                            >
                                ✕ Cerrar
                            </button>
                            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
                                <iframe
                                    src={`https://www.youtube.com/embed/${encodeURIComponent(trailerKey)}?autoplay=1&rel=0`}
                                    title={`Tráiler de ${titulo}`}
                                    allow="autoplay; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
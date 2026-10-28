"use client";

import { useState } from "react";
import Estrella from "./Estrella";

const LIMITE = 500;

export default function TuResena() {
const [valor, setValor] = useState(0);
const [hover, setHover] = useState<number | null>(null);
const [texto, setTexto] = useState("");
const [enviada, setEnviada] = useState(false);

const mostrado = hover ?? valor;

function publicar() {
    // TODO (backend): enviar valor y texto a la API (PublicarResenaCommand)
    setEnviada(true);
}

return (
    <div className="space-y-5">
    <div className="flex items-center gap-3">
        <div className="flex" onMouseLeave={() => setHover(null)}>
        {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="relative flex">
            <Estrella
                tamano="h-8 w-8"
                llena={Math.min(1, Math.max(0, mostrado - (n - 1)))}
            />
            <button
                type="button"
                aria-label={`${n - 0.5} estrellas`}
                onMouseEnter={() => setHover(n - 0.5)}
                onClick={() => setValor(n - 0.5)}
                className="absolute inset-y-0 left-0 w-1/2"
            />
            <button
                type="button"
                aria-label={`${n} estrellas`}
                onMouseEnter={() => setHover(n)}
                onClick={() => setValor(n)}
                className="absolute inset-y-0 right-0 w-1/2"
            />
            </div>
        ))}
        </div>
        <span className="text-sm text-muted">
        {valor > 0 ? `${String(valor).replace(".", ",")} / 5` : "Sin calificar"}
        </span>
    </div>

    <div>
        <label htmlFor="resena" className="mb-2 block text-sm">
        + Añade una reseña:
        </label>
        <textarea
        id="resena"
        value={texto}
        maxLength={LIMITE}
        onChange={(e) => setTexto(e.target.value)}
        rows={4}
        placeholder="Contá qué te pareció (opcional)"
        className="w-full resize-none rounded bg-field px-3 py-2 text-sm outline-none placeholder:text-muted focus:ring-1 focus:ring-primary"
        />
        <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-muted">
            {texto.length}/{LIMITE}
        </span>
        <button
            type="button"
            onClick={publicar}
            disabled={valor === 0}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
            Publicar
        </button>
        </div>
        {enviada && (
        <p className="mt-2 text-xs text-primary" role="status">
            Listo, pero todavía no se guarda: falta conectar el backend.
        </p>
        )}
    </div>
    </div>
);
}
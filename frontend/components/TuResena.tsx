"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Estrella from "./Estrella";

const LIMITE = 500;
const coma = (n: number) => String(n).replace(".", ",");

export default function TuResena() {
const [valor, setValor] = useState(0);
const [hover, setHover] = useState<number | null>(null);
const [texto, setTexto] = useState("");
const [enviada, setEnviada] = useState(false);
const [faltaSesion, setFaltaSesion] = useState(false);
const [estaLogueado, setEstaLogueado] = useState(false);

useEffect(() => {
    // TODO (backend): reemplazar por la sesión real
    try {
    setEstaLogueado(Boolean(localStorage.getItem("lumina_user_email")));
    } catch {
    setEstaLogueado(false);
    }
}, []);

const mostrado = hover ?? valor;

function limpiar() {
    setValor(0);
    setTexto("");
    setEnviada(false);
    setFaltaSesion(false);
    setHover(null);
}

function publicar() {
    if (!estaLogueado) {
    setEnviada(false);
    setFaltaSesion(true);
    return;
    }
    setFaltaSesion(false);
    // TODO (backend): enviar valor y texto a la API (PublicarResenaCommand)
    setEnviada(true);
}

function alTeclear(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
    e.preventDefault();
    setFaltaSesion(false);
    setValor((v) => Math.min(5, (v || 0) + 0.5));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
    e.preventDefault();
    setFaltaSesion(false);
    setValor((v) => Math.max(0.5, v - 0.5));
    } else if (e.key === "Home") {
    e.preventDefault();
    setFaltaSesion(false);
    setValor(0.5);
    } else if (e.key === "End") {
    e.preventDefault();
    setFaltaSesion(false);
    setValor(5);
    } else if (e.key === "Escape") {
    setValor(0);
    }
}

return (
    <div className="space-y-5">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div
            role="slider"
            tabIndex={0}
            aria-label="Tu calificación"
            aria-valuemin={0.5}
            aria-valuemax={5}
            aria-valuenow={valor || 0.5}
            aria-valuetext={valor > 0 ? `${coma(valor)} de 5` : "Sin calificar"}
            onKeyDown={alTeclear}
            onMouseLeave={() => setHover(null)}
            className="flex w-max cursor-pointer gap-1 rounded p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
            {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="relative flex h-8 w-8 md:h-10 md:w-10">
                <Estrella
                tamano="h-8 w-8 md:h-10 md:w-10"
                llena={Math.min(1, Math.max(0, mostrado - (n - 1)))}
                />
                <button
                type="button"
                tabIndex={-1}
                aria-label={`${coma(n - 0.5)} estrellas`}
                onMouseEnter={() => setHover(n - 0.5)}
                onClick={() => {
                    setFaltaSesion(false);
                    setValor(n - 0.5);
                }}
                className="absolute inset-y-0 left-0 w-1/2"
                />
                <button
                type="button"
                tabIndex={-1}
                aria-label={`${coma(n)} estrellas`}
                onMouseEnter={() => setHover(n)}
                onClick={() => {
                    setFaltaSesion(false);
                    setValor(n);
                }}
                className="absolute inset-y-0 right-0 w-1/2"
                />
            </div>
            ))}
        </div>

        <div aria-live="polite">
            <p className="text-sm font-medium">
            {valor > 0
                ? `Tu calificación: ${coma(valor)} / 5`
                : "Tocá una estrella para calificar"}
            </p>
            <p className="text-xs text-muted">
            {valor > 0
                ? "Podés cambiarla cuando quieras"
                : "Todavía no calificaste esta película"}
            </p>
        </div>
        </div>

        {!estaLogueado && (
        <p className="text-xs text-muted sm:max-w-[45%] sm:text-right">
            <Link href="/login" className="text-primary underline underline-offset-2">
            Iniciá sesión
            </Link>{" "}
            o{" "}
            <Link href="/registro" className="text-primary underline underline-offset-2">
            registrate
            </Link>{" "}
            para publicar tu reseña
        </p>
        )}
    </div>

    <div>
        <label htmlFor="resena" className="mb-2 block text-sm">
        + Añadir una reseña
        </label>
        <textarea
        id="resena"
        value={texto}
        maxLength={LIMITE}
        onChange={(e) => {
            setTexto(e.target.value);
            setFaltaSesion(false);
        }}
        rows={4}
        placeholder="Escribí lo que te pareció la película..."
        className="w-full resize-none rounded bg-field px-3 py-2 text-sm outline-none placeholder:text-muted focus:ring-1 focus:ring-primary"
        />
        <p className="mt-2 text-xs text-muted">
        {texto.length} / {LIMITE} caracteres
        </p>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
            type="button"
            onClick={limpiar}
            className="w-full rounded-lg border border-white/20 px-5 py-2.5 text-sm transition-colors [@media(hover:hover)]:hover:border-primary [@media(hover:hover)]:hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
        >
            Cancelar
        </button>
        <button
            type="button"
            onClick={publicar}
            disabled={valor === 0}
            className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
            Publicar reseña
        </button>
        </div>

        {faltaSesion && (
        <div
            role="alert"
            className="mt-3 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-xs"
        >
            Para publicar tu calificación y tu reseña necesitás una cuenta.{" "}
            <Link href="/login" className="text-primary underline underline-offset-2">
            Iniciá sesión
            </Link>{" "}
            o{" "}
            <Link href="/registro" className="text-primary underline underline-offset-2">
            registrate
            </Link>
            .
        </div>
        )}

        {enviada && (
        <p className="mt-2 text-xs text-primary" role="status">
            Listo, pero todavía no se guarda: falta conectar el backend.
        </p>
        )}
    </div>
    </div>
);
}
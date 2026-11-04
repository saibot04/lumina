"use client";

import { useState } from "react";
import BotonAccion from "@/components/BotonAccion";
import type { ResultadoPerfil } from "@/app/auth/perfil-actions";

export default function EditorCampo({
    valor,
    mostrar,
    claveError,
    onGuardar,
    tipo = "text",
    obligatorio = true,
}: {
    valor: string;
    mostrar?: string;
    claveError: string;
    onGuardar: (valor: string) => Promise<ResultadoPerfil>;
    tipo?: "text" | "email";
    obligatorio?: boolean;
}) {
    const [editando, setEditando] = useState(false);
    const [texto, setTexto] = useState(valor);
    const [error, setError] = useState("");
    const [guardando, setGuardando] = useState(false);

    const guardar = async (e: React.FormEvent) => {
        e.preventDefault();
        setGuardando(true);
        setError("");
        const r = await onGuardar(texto);
        setGuardando(false);

        if (!r.ok) {
            setError(r.errores?.[claveError] ?? r.error ?? "No se pudo guardar.");
            return;
        }
        setEditando(false);
    };

    const cancelar = () => {
        setTexto(valor);
        setError("");
        setEditando(false);
    };

    if (!editando) {
        return (
            <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm">{mostrar ?? valor}</span>
                <BotonAccion texto="Cambiar" onClick={() => setEditando(true)} />
            </div>
        );
    }

    return (
        <form onSubmit={guardar} className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
                <input
                    type={tipo}
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    required={obligatorio}
                    autoFocus
                    className="w-48 rounded border border-white/10 bg-black/50 px-3 py-1.5 text-sm text-white outline-none focus:border-[#fccb30]"
                />
                <button
                    type="submit"
                    disabled={guardando}
                    className="rounded bg-[#fccb30] px-3 py-1.5 text-xs font-medium text-black disabled:opacity-50"
                >
                    {guardando ? "Guardando…" : "Guardar"}
                </button>
                <button type="button" onClick={cancelar} className="text-xs text-gray-400 hover:text-white">
                    Cancelar
                </button>
            </div>
            {error && (
                <p role="alert" className="text-xs text-red-400">
                    {error}
                </p>
            )}
        </form>
    );
}
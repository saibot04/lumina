"use client";

import { useState } from "react";
import BotonAccion from "@/components/BotonAccion";
import { cambiarPassword } from "@/app/auth/perfil-actions";

export default function FormularioPassword() {
    const [abierto, setAbierto] = useState(false);
    const [actual, setActual] = useState("");
    const [nueva, setNueva] = useState("");
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [error, setError] = useState("");
    const [listo, setListo] = useState(false);
    const [guardando, setGuardando] = useState(false);

    const enviar = async (e: React.FormEvent) => {
        e.preventDefault();
        setGuardando(true);
        setErrores({});
        setError("");

        const r = await cambiarPassword({ actual, nueva });
        setGuardando(false);

        if (!r.ok) {
            setErrores(r.errores ?? {});
            setError(r.errores ? "" : (r.error ?? "No se pudo cambiar."));
            return;
        }

        setActual("");
        setNueva("");
        setAbierto(false);
        setListo(true);
    };

    const campo =
        "w-52 rounded border border-white/10 bg-black/50 px-3 py-1.5 text-sm text-white outline-none focus:border-[#fccb30]";

    if (!abierto) {
        return (
            <div className="flex items-center gap-4">
                {listo && <span className="text-xs text-green-400">Contraseña actualizada.</span>}
                <span className="text-gray-400 text-sm">••••••••</span>
                <BotonAccion
                    texto="Cambiar"
                    onClick={() => {
                        setListo(false);
                        setAbierto(true);
                    }}
                />
            </div>
        );
    }

    return (
        <form onSubmit={enviar} className="flex flex-col items-end gap-2">
            <input
                type="password"
                value={actual}
                onChange={(e) => setActual(e.target.value)}
                placeholder="Contraseña actual"
                autoComplete="current-password"
                required
                className={campo}
            />
            {errores.actual && <p role="alert" className="text-xs text-red-400">{errores.actual}</p>}

            <input
                type="password"
                value={nueva}
                onChange={(e) => setNueva(e.target.value)}
                placeholder="Nueva contraseña"
                autoComplete="new-password"
                required
                className={campo}
            />
            {errores.nueva && <p role="alert" className="text-xs text-red-400">{errores.nueva}</p>}
            {error && <p role="alert" className="text-xs text-red-400">{error}</p>}

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={guardando}
                    className="rounded bg-[#fccb30] px-3 py-1.5 text-xs font-medium text-black disabled:opacity-50"
                >
                    {guardando ? "Guardando…" : "Guardar"}
                </button>
                <button type="button" onClick={() => setAbierto(false)} className="text-xs text-gray-400 hover:text-white">
                    Cancelar
                </button>
            </div>
        </form>
    );
}
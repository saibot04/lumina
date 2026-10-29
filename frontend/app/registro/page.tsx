"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthBackground from "@/components/AuthBackground";
import Logo from "@/components/Logo";
import { registrar } from "@/app/auth/actions";

export default function Registro() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [error, setError] = useState("");
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [enviando, setEnviando] = useState(false);

    const handleRegistro = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrores({});

        if (password !== repeatPassword) {
            setError("Las contraseñas no coinciden. Intentá de nuevo.");
            setPassword("");
            setRepeatPassword("");
            return;
        }

        setError("");
        setEnviando(true);
        const resultado = await registrar({
            nombreUsuario: username,
            email,
            password,
        });
        setEnviando(false);

        if (!resultado.ok) {
            setErrores(resultado.errores ?? {});
            setError(resultado.errores ? "" : (resultado.error ?? "No se pudo crear la cuenta."));
            return;
        }

        localStorage.setItem("lumina_real_username", username.trim());
        sessionStorage.setItem("registro_exitoso", "true");
        router.push("/login");
    };

    return (
        <AuthBackground>
        <div>
            <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
            <form
                onSubmit={handleRegistro}
                className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-black/70 p-8 backdrop-blur"
            >
            <h1 className="text-center text-3xl font-light text-white">Crea tu cuenta</h1>

            {error && (
                <div role="alert" className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs text-center p-3 rounded">
                    {error}
                </div>
            )}

            <div>
                <label className="block rounded bg-white/10 px-3 py-2">
                    <span className="block text-[10px] text-gray-400">Nombre de usuario</span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                        className="w-full bg-transparent text-sm text-white outline-none"
                        placeholder="carlitos"
                    />
                </label>
                {errores.nombreUsuario && (
                    <p role="alert" className="mt-1 text-xs text-red-400">{errores.nombreUsuario}</p>
                )}
            </div>

            <div>
                <label className="block rounded bg-white/10 px-3 py-2">
                    <span className="block text-[10px] text-gray-400">Correo electrónico</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="w-full bg-transparent text-sm text-white outline-none"
                        placeholder="correo@ejemplo.com"
                    />
                </label>
                {errores.email && (
                    <p role="alert" className="mt-1 text-xs text-red-400">{errores.email}</p>
                )}
            </div>

            <div>
                <label className="block rounded bg-white/10 px-3 py-2">
                    <span className="block text-[10px] text-gray-400">Contraseña</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        className="w-full bg-transparent text-sm text-white outline-none"
                    />
                </label>
                {errores.password && (
                    <p role="alert" className="mt-1 text-xs text-red-400">{errores.password}</p>
                )}
            </div>

            <label className="rounded bg-white/10 px-3 py-2">
                <span className="block text-[10px] text-gray-400">Repetir contraseña</span>
                <input
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="w-full bg-transparent text-sm text-white outline-none"
                />
            </label>

            <button
                type="submit"
                disabled={enviando}
                className="rounded-lg bg-[#fccb30] px-6 py-2.5 text-center text-sm font-medium text-black transition hover:opacity-90 mt-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {enviando ? "Creando cuenta…" : "Registrarme"}
            </button>

            <Link href="/login" className="self-end text-xs text-[#fccb30] mt-1">
                ¿Ya tenés cuenta? Inicia sesión
            </Link>
            </form>
        </div>
        </AuthBackground>
    );
}
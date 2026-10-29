"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthBackground from "@/components/AuthBackground";
import Logo from "@/components/Logo";
import { iniciarSesion } from "@/app/auth/actions";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [mostrarExito, setMostrarExito] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!sessionStorage.getItem("registro_exitoso")) return;

        // setState dentro de un callback (no directo en el efecto) evita el aviso
        const mostrar = setTimeout(() => {
            setMostrarExito(true);
            sessionStorage.removeItem("registro_exitoso");
        }, 0);
        const ocultar = setTimeout(() => setMostrarExito(false), 5000);

        return () => {
            clearTimeout(mostrar);
            clearTimeout(ocultar);
        };
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setEnviando(true);

        const resultado = await iniciarSesion({ email, password });
        setEnviando(false);

        if (!resultado.ok) {
            setError(resultado.error);
            setPassword("");
            return;
        }

        // Puente temporal: las pantallas de perfil todavía leen estos datos del navegador
        localStorage.setItem("lumina_user_email", resultado.usuario.email);
        localStorage.setItem("lumina_real_username", resultado.usuario.nombreUsuario);

        router.push("/inicio");
        router.refresh();
    };

    return (
        <AuthBackground>
            <div>
                <Logo />
            </div>
            <div className="flex flex-1 items-center justify-center">
                <form
                    onSubmit={handleLogin}
                    className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-black/70 p-8 backdrop-blur"
                >
                    <h1 className="text-center text-3xl font-light text-white mb-2">Inicia sesión</h1>

                    {mostrarExito && (
                        <div className="bg-green-500/10 border border-green-500/50 text-green-400 text-xs text-center p-3 rounded mb-2">
                            ¡Registro completado con éxito! Ya podés ingresar.
                        </div>
                    )}

                    {error && (
                        <div role="alert" className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs text-center p-3 rounded">
                            {error}
                        </div>
                    )}

                    <label className="rounded bg-white/10 px-3 py-2">
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

                    <label className="rounded bg-white/10 px-3 py-2">
                        <span className="block text-[10px] text-gray-400">Contraseña</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            className="w-full bg-transparent text-sm text-white outline-none"
                        />
                    </label>

                    <Link href="#" className="text-[11px] text-gray-400 hover:text-[#fccb30]">
                        Olvidé mi contraseña
                    </Link>

                    <button
                        type="submit"
                        disabled={enviando}
                        className="rounded-lg bg-[#fccb30] px-6 py-2.5 text-center text-sm font-medium text-black transition hover:opacity-90 mt-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {enviando ? "Entrando…" : "Iniciar sesión"}
                    </button>

                    <Link href="/registro" className="self-end text-xs text-[#fccb30] mt-2">
                        Registrarse
                    </Link>
                </form>
            </div>
        </AuthBackground>
    );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthBackground from "@/components/AuthBackground";
import Logo from "@/components/Logo";

export default function Login() {
    const [email, setEmail] = useState("");
    const [mostrarExito, setMostrarExito] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Al cargar la página, busca si existe el "ticket" de registro exitoso
        const vieneDeRegistro = sessionStorage.getItem("registro_exitoso");
        if (vieneDeRegistro) {
            setMostrarExito(true);
            // Destruye el ticket para que el cartel no aparezca por siempre
            sessionStorage.removeItem("registro_exitoso");
            
            // Opcional: hace que el cartel desaparezca solo después de 5 segundos
            setTimeout(() => setMostrarExito(false), 5000);
        }
    }, []);

    const handleLogin = (e: React.MouseEvent) => {
        e.preventDefault();
        if (email) {
            localStorage.setItem("lumina_user_email", email);
        }
        // Ahora sí, el flujo correcto hacia la pantalla principal
        router.push("/inicio"); 
    };

    return (
        <AuthBackground>
            <div>
                <Logo />
            </div>
            <div className="flex flex-1 items-center justify-center">
                <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-black/70 p-8 backdrop-blur">
                    <h1 className="text-center text-3xl font-light text-white mb-2">Inicia sesión</h1>

                    {/* CARTELITO DE ÉXITO (Solo se muestra si mostrarExito es true) */}
                    {mostrarExito && (
                        <div className="bg-green-500/10 border border-green-500/50 text-green-400 text-xs text-center p-3 rounded mb-2">
                            ¡Registro completado con éxito! Ya podés ingresar.
                        </div>
                    )}

                    <label className="rounded bg-white/10 px-3 py-2">
                        <span className="block text-[10px] text-gray-400">Correo electrónico</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent text-sm text-white outline-none"
                            placeholder="correo@ejemplo.com"
                        />
                    </label>

                    <label className="rounded bg-white/10 px-3 py-2">
                        <span className="block text-[10px] text-gray-400">Contraseña</span>
                        <input
                            type="password"
                            className="w-full bg-transparent text-sm text-white outline-none"
                        />
                    </label>

                    <Link href="#" className="text-[11px] text-gray-400 hover:text-[#fccb30]">
                        Olvidé mi contraseña
                    </Link>

                    <button
                        onClick={handleLogin}
                        className="rounded-lg bg-[#fccb30] px-6 py-2.5 text-center text-sm font-medium text-black transition hover:opacity-90 mt-2"
                    >
                        Iniciar sesión
                    </button>

                    <Link href="/registro" className="self-end text-xs text-[#fccb30] mt-2">
                        Registrarse
                    </Link>
                </div>
            </div>
        </AuthBackground>
    );
}
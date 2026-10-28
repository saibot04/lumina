"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthBackground from "@/components/AuthBackground";
import Logo from "@/components/Logo";

export default function Registro() {
    const router = useRouter();

    // 1. Estados para capturar los datos
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    
    // Estado para manejar el cartel de error
    const [error, setError] = useState("");

    const handleRegistro = (e: React.MouseEvent) => {
        e.preventDefault(); // Evita que recargue la página
        
        // 2. Validación de contraseñas
        if (password !== repeatPassword) {
            setError("Las contraseñas no coinciden. Intentá de nuevo.");
            setPassword(""); // Borra el campo de contraseña
            setRepeatPassword(""); // Borra el campo de repetir contraseña
            return; // Corta la ejecución para que no se registre
        }

        // Si llegamos acá, es porque las contraseñas coinciden
        setError(""); 

        // 3. Guardamos el nombre real en la memoria
        if (username) {
            localStorage.setItem("lumina_real_username", username);
        }
        
        // 4. Creamos el "ticket" de éxito para que lo lea el Login
        sessionStorage.setItem("registro_exitoso", "true");
        
        // 5. Lo mandamos al Login
        router.push("/login");
    };

    return (
        <AuthBackground>
        <div>
            <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-black/70 p-8 backdrop-blur">
            <h1 className="text-center text-3xl font-light text-white">Crea tu cuenta</h1>

            {/* CARTEL DE ERROR */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs text-center p-3 rounded">
                    {error}
                </div>
            )}

            <label className="rounded bg-white/10 px-3 py-2">
                <span className="block text-[10px] text-gray-400">Nombre de usuario</span>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                    placeholder="carlitos"
                />
            </label>

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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                />
            </label>

            <label className="rounded bg-white/10 px-3 py-2">
                <span className="block text-[10px] text-gray-400">Repetir contraseña</span>
                <input
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                />
            </label>

            <button
                onClick={handleRegistro}
                className="rounded-lg bg-[#fccb30] px-6 py-2.5 text-center text-sm font-medium text-black transition hover:opacity-90 mt-2"
            >
                Registrarme
            </button>

            <Link href="/login" className="self-end text-xs text-[#fccb30] mt-1">
                ¿Ya tenés cuenta? Inicia sesión
            </Link>
            </div>
        </div>
        </AuthBackground>
    );
}
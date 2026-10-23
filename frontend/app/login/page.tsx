import Link from "next/link";
import AuthBackground from "@/components/AuthBackground";
import Logo from "@/components/Logo";

export default function Login() {
    return (
        <AuthBackground>
        <div>
            <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-black/70 p-8 backdrop-blur">
            <h1 className="text-center text-3xl font-light">Inicia sesión</h1>

            <label className="rounded bg-field px-3 py-2">
                <span className="block text-[10px] text-muted">Correo electrónico</span>
                <input
                type="email"
                className="w-full bg-transparent text-sm outline-none"
                placeholder="correo@ejemplo.com"
                />
            </label>

            <label className="rounded bg-field px-3 py-2">
                <span className="block text-[10px] text-muted">Contraseña</span>
                <input
                type="password"
                className="w-full bg-transparent text-sm outline-none"
                />
            </label>

            <Link href="#" className="text-[11px] text-muted hover:text-primary">
                Olvidé mi contraseña
            </Link>

            <Link
                href="/inicio"
                className="rounded-lg bg-primary px-6 py-2.5 text-center text-sm font-medium text-black transition hover:opacity-90"
            >
                Iniciar sesión
            </Link>

            <Link href="/registro" className="self-end text-xs text-primary">
            Registrarse
            </Link>
            </div>
        </div>
        </AuthBackground>
    );
}
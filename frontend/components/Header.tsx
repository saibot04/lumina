"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import EnlaceNav from "./EnlaceNav";

const MENU_MOVIL = [
{ href: "/inicio", label: "Inicio" },
{ href: "/CuentaPerfil", label: "Perfil social" },
{ href: "/perfil", label: "Cuenta" },
{ href: "/mi-lista", label: "Mi lista" },
{ href: "/suscripciones", label: "Suscripciones" },
{ href: "/generos", label: "Géneros" },
{ href: "/miembros", label: "Miembros" },
{ href: "/login", label: "Iniciar sesión" },
{ href: "/registro", label: "Registrarme" },
];

function IconoLupa({ className = "h-4 w-4" }: { className?: string }) {
return (
    <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className={className}
    aria-hidden="true"
    >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
    </svg>
);
}

export default function Header() {
const [menuAbierto, setMenuAbierto] = useState(false);
const [buscando, setBuscando] = useState(false);

useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
        setMenuAbierto(false);
        setBuscando(false);
    }
    };
    document.addEventListener("keydown", alPulsar);
    return () => document.removeEventListener("keydown", alPulsar);
}, []);

const cerrarMenu = () => setMenuAbierto(false);

return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background">
    <div className="flex h-16 items-center gap-6 px-4 sm:px-6">
        <Logo />

        {/* Escritorio: links + botón Registrarse */}
        <nav className="ml-auto hidden items-center gap-6 md:flex">
        <Link
            href="/login"
            className="text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:text-primary"
        >
            Iniciar sesión
        </Link>
        <Link
            href="/miembros"
            className="text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:text-primary"
        >
            Miembros
        </Link>
        <Link
            href="/registro"
            className="rounded bg-primary px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-black transition hover:brightness-110"
        >
            + Registrarse
        </Link>
        </nav>

        {/* Escritorio: buscador y avatar */}
        <div className="hidden items-center gap-4 md:flex">
        <div className="relative flex items-center">
            <input
            type="search"
            placeholder="Buscar..."
            className="h-8 w-36 rounded-full bg-field pl-4 pr-8 text-xs text-foreground outline-none transition-all placeholder:text-muted focus:w-48 focus:ring-1 focus:ring-primary"
            />
            <button
            type="button"
            aria-label="Buscar"
            className="absolute right-2.5 text-muted transition-colors hover:text-primary"
            >
            <IconoLupa className="h-3.5 w-3.5" />
            </button>
        </div>

        <Link
            href="/perfil"
            aria-label="Mi cuenta"
            className="h-8 w-8 shrink-0 rounded-full bg-primary transition hover:opacity-90"
        />
        </div>

        {/* Móvil: lupa y hamburguesa */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
        <button
            type="button"
            onClick={() => setBuscando((v) => !v)}
            aria-expanded={buscando}
            aria-controls="buscador-movil"
            aria-label="Buscar"
            className="flex h-9 w-9 items-center justify-center rounded border border-white/10 text-muted transition hover:border-primary hover:text-primary"
        >
            <IconoLupa />
        </button>

        <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            className="flex h-9 w-9 items-center justify-center rounded border border-white/10 text-muted transition hover:border-primary hover:text-primary"
        >
            <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
            >
            <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
        </button>
        </div>
    </div>

    {/* Móvil: barra de búsqueda desplegable */}
    {buscando && (
        <div id="buscador-movil" className="px-4 pb-3 md:hidden">
        <input
            type="search"
            placeholder="Buscar películas..."
            autoFocus
            className="w-full rounded bg-field px-3 py-2 text-sm outline-none placeholder:text-muted focus:ring-1 focus:ring-primary"
        />
        </div>
    )}

    {/* Móvil: menú lateral */}
    {menuAbierto && (
        <>
        <button
            type="button"
            onClick={cerrarMenu}
            aria-label="Cerrar menú"
            className="fixed inset-0 z-40 bg-black/60"
        />
        <nav
            id="menu-movil"
            className="fixed bottom-0 right-0 top-0 z-50 w-72 max-w-[85%] overflow-y-auto border-l border-white/10 bg-surface p-5"
        >
            <div className="flex flex-col gap-1">
            {MENU_MOVIL.map((n) => (
                <EnlaceNav
                key={n.href}
                href={n.href}
                label={n.label}
                onNavegar={cerrarMenu}
                className="py-2"
                />
            ))}
            </div>
        </nav>
        </>
    )}
    </header>
);
}
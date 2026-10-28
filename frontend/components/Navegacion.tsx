"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { slugify } from "@/lib/movies";

/* ------------------------------- Constantes ------------------------------- */

/** Enlaces del sidebar (escritorio), todos con la misma separación. */
const NAV_SIDEBAR = [
    { href: "/inicio", label: "Inicio" },
    { href: "/CuentaPerfil", label: "Perfil social" },
    { href: "/mi-lista", label: "Mi lista" },
    { href: "/suscripciones", label: "Suscripciones" },
];

/** Géneros visibles en el sidebar. El resto queda detrás del botón "+". */
const GENEROS_DESTACADOS = [
    "Drama",
    "Comedia",
    "Romance",
    "Familia",
    "Acción",
    "Crimen",
    "Animación",
];

/** Contenido del menú hamburguesa (solo móvil). */
const MENU_MOVIL = [
    { href: "/inicio", label: "Inicio" },
    { href: "/perfil", label: "Cuenta" },
    { href: "/mi-lista", label: "Mi lista" },
    { href: "/suscripciones", label: "Suscripciones" },
    { href: "/registro", label: "Registrarme" },
    { href: "/generos", label: "Géneros" },
];

/* --------------------------- Pieza reutilizable --------------------------- */

function EnlaceNav({
    href,
    label,
    onNavegar,
    className = "",
}: {
    href: string;
    label: string;
    onNavegar?: () => void;
    className?: string;
}) {
    const pathname = usePathname();
    const activo = pathname === href;

    return (
        <Link
            href={href}
            onClick={onNavegar}
            aria-current={activo ? "page" : undefined}
            className={`block rounded px-2 py-1.5 text-sm transition hover:text-primary ${
                activo ? "text-primary" : "text-muted"
            } ${className}`}
        >
            {label}
        </Link>
    );
}

/* -------------------------------- Sidebar --------------------------------- */

export function Sidebar() {
    return (
        <aside className="hidden w-56 shrink-0 flex-col gap-6 border-r border-white/5 p-4 md:flex">
            <Logo />

            <input
                type="search"
                placeholder="Buscar"
                className="rounded bg-field px-3 py-2 text-sm outline-none placeholder:text-muted focus:ring-1 focus:ring-primary"
            />

            <nav className="flex flex-col gap-6">
                {NAV_SIDEBAR.map((n) => (
                    <EnlaceNav key={n.href} href={n.href} label={n.label} />
                ))}
            </nav>

            <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted">
                    Géneros
                </p>

                <ul className="flex flex-wrap items-center gap-1.5">
                    {GENEROS_DESTACADOS.map((g) => (
                        <li key={g}>
                            <Link
                                href={`/categoria/${slugify(g)}`}
                                className="block rounded-full border border-white/10 px-2.5 py-1 text-xs text-muted transition hover:border-primary hover:text-primary"
                            >
                                {g}
                            </Link>
                        </li>
                    ))}

                    <li>
                        <Link
                            href="/generos"
                            aria-label="Ver todos los géneros"
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-sm leading-none text-muted transition hover:border-primary hover:text-primary"
                        >
                            +
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

/* -------------------------------- Header ---------------------------------- */

export function Header() {
    const [abierto, setAbierto] = useState(false);
    const [buscando, setBuscando] = useState(false);

    useEffect(() => {
        const alPulsar = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setAbierto(false);
                setBuscando(false);
            }
        };
        document.addEventListener("keydown", alPulsar);
        return () => document.removeEventListener("keydown", alPulsar);
    }, []);

    const cerrar = () => setAbierto(false);

    return (
        <header className="relative px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
                {/* Móvil: logo + lupa */}
                <div className="flex items-center gap-3 md:hidden">
                    <Logo />

                    <button
                        type="button"
                        onClick={() => setBuscando((v) => !v)}
                        aria-expanded={buscando}
                        aria-controls="buscador-movil"
                        aria-label="Buscar"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-white/10 text-muted transition hover:border-primary hover:text-primary"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5" />
                        </svg>
                    </button>
                </div>

                <div className="ml-auto flex items-center gap-3">
                    {/* Móvil: Perfil social */}
                    <Link
                        href="/CuentaPerfil"
                        className="text-xs uppercase tracking-wider text-muted transition hover:text-primary md:hidden"
                    >
                        Perfil social
                    </Link>

                    {/* Escritorio: Cuenta + Registrarse */}
                    <Link
                        href="/perfil"
                        className="hidden text-xs uppercase tracking-wider text-muted transition hover:text-primary md:block"
                    >
                        Cuenta
                    </Link>

                    <Link
                        href="/registro"
                        className="hidden rounded bg-primary px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-black transition hover:brightness-110 md:block"
                    >
                        + Registrarse
                    </Link>

                    {/* Móvil: hamburguesa en la punta derecha */}
                    <button
                        type="button"
                        onClick={() => setAbierto((v) => !v)}
                        aria-expanded={abierto}
                        aria-controls="menu-movil"
                        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-white/10 text-muted transition hover:border-primary hover:text-primary md:hidden"
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

            {buscando && (
                <div id="buscador-movil" className="mt-3 md:hidden">
                    <input
                        type="search"
                        placeholder="Buscar"
                        autoFocus
                        className="w-full rounded bg-field px-3 py-2 text-sm outline-none placeholder:text-muted focus:ring-1 focus:ring-primary"
                    />
                </div>
            )}

            {abierto && (
                <>
                    <button
                        type="button"
                        onClick={cerrar}
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
                                    onNavegar={cerrar}
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
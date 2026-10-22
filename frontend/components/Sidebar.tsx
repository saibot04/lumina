"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const categorias = ["Acción", "Comedia", "Drama", "Terror", "Ciencia ficción"];

function slugify(s: string) {
    return s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "-");
    }

    export default function Sidebar() {
    const pathname = usePathname();

    const link = (href: string, label: string) => (
        <Link
        key={href}
        href={href}
        className={`block rounded px-2 py-1.5 text-sm transition hover:text-primary ${
            pathname === href ? "text-primary" : "text-muted"
        }`}
        >
        {label}
        </Link>
    );

    return (
        <aside className="hidden w-56 shrink-0 flex-col gap-6 border-r border-white/5 p-4 md:flex">
        <Logo />
        <input
            type="search"
            placeholder="Buscar"
            className="rounded bg-field px-3 py-2 text-sm outline-none placeholder:text-muted focus:ring-1 focus:ring-primary"
        />
        <nav className="flex flex-col gap-1">
            {link("/inicio", "Inicio")}
            {link("/mi-lista", "Mi lista")}
            {link("/perfil", "Perfil")}
        </nav>
        <div>
            <p className="mb-2 px-2 text-xs uppercase tracking-wider text-muted/70">
            Categorías
            </p>
            <nav className="flex flex-col gap-1">
            {categorias.map((c) => link(`/categoria/${slugify(c)}`, c))}
            </nav>
        </div>
        </aside>
    );
}
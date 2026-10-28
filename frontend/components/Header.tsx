import Link from "next/link";
import Logo from "./Logo";

const links = [
    { href: "/login", label: "Iniciar sesión" },
    { href: "/registro", label: "Registrarse" },
    { href: "/miembros", label: "Miembros" },
];

export default function Header() {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center gap-6 border-b border-white/10 bg-background px-6">
        <Logo />

        <nav className="ml-auto hidden items-center gap-6 text-xs font-bold uppercase tracking-wider text-muted md:flex">
            {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-primary">
                {l.label}
            </Link>
            ))}
        </nav>

        <div className="relative flex items-center max-md:ml-auto">
            <input
            type="search"
            placeholder="Buscar..."
            className="h-8 w-36 rounded-full bg-field pl-4 pr-8 text-xs text-foreground outline-none placeholder:text-muted transition-all focus:w-48 focus:ring-1 focus:ring-primary"
            />
            <button
            type="button"
            aria-label="Buscar"
            className="absolute right-2.5 text-muted transition-colors hover:text-primary"
            >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
                />
            </svg>
            </button>
        </div>

        <Link
            href="/login"
            className="h-8 w-8 shrink-0 rounded-full bg-primary transition hover:opacity-90"
            aria-label="Iniciar sesión"
        />
        </header>
    );
}
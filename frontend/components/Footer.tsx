import Link from "next/link";
import Logo from "./Logo";

const explorar = [
  { href: "/inicio", label: "Inicio" },
  { href: "/mi-lista", label: "Mi lista" },
  { href: "/perfil", label: "Perfil" },
];

const informacion = [
    { href: "/nosotros", label: "Quiénes somos" },
    { href: "/contacto", label: "Contacto" },
    { href: "/terminos", label: "Términos y condiciones" },
];

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
            <div className="space-y-3">
            <Logo />
            <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
                Quiénes somos
            </h2>
            <p className="max-w-sm text-sm text-muted">
                Somos un equipo de estudiantes que creó Lumina como proyecto de
                Programación Orientada a Objetos: una plataforma para descubrir
                películas, puntuarlas y compartir reseñas.
            </p>
            </div>

            <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
                Explorar
            </h2>
            <nav className="flex flex-col gap-2 text-sm text-muted">
                {explorar.map((l) => (
                <Link key={l.href} href={l.href} className="transition-colors hover:text-primary">
                    {l.label}
                </Link>
                ))}
            </nav>
            </div>

            <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
                Información
            </h2>
            <nav className="flex flex-col gap-2 text-sm text-muted">
                {informacion.map((l) => (
                <Link key={l.href} href={l.href} className="transition-colors hover:text-primary">
                    {l.label}
                </Link>
                ))}
            </nav>
            </div>
        </div>

        <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-muted">
            © 2026 Lumina. Proyecto de práctica POO.
        </p>
        </footer>
    );
}
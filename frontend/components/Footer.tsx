import Link from "next/link";
import Logo from "./Logo";

const explorar = [
  { href: "/inicio", label: "Inicio" },
  { href: "/mi-lista", label: "Mi lista" },
  { href: "/perfil", label: "Perfil" },
];

// Cambiá estos mails por los reales del equipo
const contactos = [
  "tobias24385@gmail.com",
  "milagroszanini15@gmail.com",
  "matein06@gmail.com",
  "justo.e.graneros@gmail.com",
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
            <div className="flex flex-col gap-2 text-sm text-muted">
                {/* Contacto: texto simple, no es un botón */}
                <div className="flex items-start gap-2">
                <span className="text-foreground">Contactos:</span>
                <ul className="space-y-1">
                    {contactos.map((mail) => (
                    <li key={mail}>{mail}</li>
                    ))}
                </ul>
                </div>

                <Link href="/terminos" className="mt-4 transition-colors hover:text-primary">
                Términos y condiciones
                </Link>
            </div>
            </div>
        </div>

        <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-muted">
            © 2026 Lumina. Proyecto de práctica POO.
        </p>
        </footer>
    );
}
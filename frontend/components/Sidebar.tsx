import Link from "next/link";
import EnlaceNav from "./EnlaceNav";
import { slugify } from "@/lib/movies";

const NAV_SIDEBAR = [
  { href: "/inicio", label: "Inicio" },
  { href: "/CuentaPerfil", label: "Perfil social" },
  { href: "/mi-lista", label: "Mi lista" },
  { href: "/suscripciones", label: "Suscripciones" },
];

const GENEROS_DESTACADOS = [
  "Drama",
  "Comedia",
  "Romance",
  "Familia",
  "Acción",
  "Crimen",
  "Animación",
];

export default function Sidebar() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 flex-col gap-6 self-start overflow-y-auto border-r border-white/5 px-4 pb-4 pt-10 md:flex">
      <nav className="flex flex-col gap-6">
        {NAV_SIDEBAR.map((n) => (
          <EnlaceNav key={n.href} href={n.href} label={n.label} />
        ))}
      </nav>

      {/* mt-8 suma espacio extra entre Suscripciones y Géneros */}
      <div className="mt-8 flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Géneros
        </p>

        <ul className="flex flex-wrap items-center gap-1.5">
          {GENEROS_DESTACADOS.map((g) => (
            <li key={g}>
              <Link
                href={`/generos?generos=${slugify(g)}`}
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
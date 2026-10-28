import Link from "next/link";

export default function PeliculaNoEncontrada() {
return (
    <div className="mx-auto max-w-md space-y-4 py-20 text-center">
    <h1 className="text-3xl font-bold">Película no encontrada</h1>
    <p className="text-sm text-muted">
        La película que buscás no existe o fue eliminada.
    </p>
    <Link
        href="/inicio"
        className="inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-black"
    >
        Volver al inicio
    </Link>
    </div>
);
}
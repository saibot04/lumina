import Link from "next/link";

type PosterCardProps = {
    id: string | number;
    title: string;
    /** Posición para filas tipo ranking ("Top 10 de hoy"). */
    rank?: number;
    /** Ancho de la tarjeta cuando se usa dentro de una fila con scroll. */
    className?: string;
};

export default function PosterCard({
    id,
    title,
    rank,
    className = "",
}: PosterCardProps) {
    return (
        <Link
            href={`/pelicula/${id}`}
            aria-label={title}
            className={`group relative block shrink-0 ${className}`}
        >
            {/* La portada irá aquí cuando exista el campo `poster` */}
            <div className="aspect-[2/3] overflow-hidden rounded-md bg-gradient-to-br from-neutral-700 to-neutral-900 transition group-hover:ring-2 group-hover:ring-primary" />

            {rank !== undefined && (
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-2 -left-2 z-10 text-6xl font-black leading-none text-background [-webkit-text-stroke:2px_var(--color-primary)]"
                >
                    {rank}
                </span>
            )}
        </Link>
    );
}
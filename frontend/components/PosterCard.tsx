import Link from "next/link";

export default function PosterCard({ title, id }: { title: string; id: string }) {
    return (
        <Link
        href={`/pelicula/${id}`}
        className="aspect-[2/3] overflow-hidden rounded-md bg-gradient-to-br from-neutral-700 to-neutral-900 transition hover:ring-2 hover:ring-primary"
        >
        <div className="flex h-full items-end p-2 text-xs font-medium">{title}</div>
        </Link>
    );
}
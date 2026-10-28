import Link from "next/link";
import { GENEROS, slugify } from "@/lib/movies";

export default function Generos() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold md:text-3xl">Géneros</h1>

            <ul className="flex flex-wrap gap-2">
                {GENEROS.map((g) => (
                    <li key={g}>
                        <Link
                            href={`/categoria/${slugify(g)}`}
                            className="block rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-primary hover:text-primary"
                        >
                            {g}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
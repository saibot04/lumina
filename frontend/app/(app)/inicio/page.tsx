import PosterCard from "@/components/PosterCard";
import { movies } from "@/lib/movies";

export default function Inicio() {
    return (
        <div className="space-y-10">
        <section className="overflow-hidden rounded-lg bg-gradient-to-r from-neutral-800 to-neutral-900 p-8 md:p-14">
            <p className="text-xs uppercase tracking-wider text-muted">Destacada</p>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">Metrópolis</h1>
            <p className="mt-3 max-w-md text-sm text-muted">
            Sinopsis breve de la película destacada.
            </p>
            <button className="mt-6 rounded bg-primary px-5 py-2 text-sm font-medium text-black">
            Ver ahora
            </button>
        </section>

        {["Clásicos", "Tendencias"].map((fila) => (
            <section key={fila}>
            <h2 className="mb-3 text-sm font-medium">{fila}</h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
                {movies.map((m) => (
                <PosterCard key={m.id} id={m.id} title={m.title} />
                ))}
            </div>
            </section>
        ))}
        </div>
    );
}
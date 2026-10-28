import { notFound } from "next/navigation";
import { FilaPeliculas } from "@/components/SeccionesInicio";
import { generoPorSlug, peliculasPorGenero } from "@/lib/movies";

export default async function Categoria({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const genero = generoPorSlug(slug);

    if (!genero) notFound();

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold md:text-3xl">{genero}</h1>

            <FilaPeliculas
                titulo={`Películas de ${genero}`}
                peliculas={peliculasPorGenero(genero)}
                linea
            />
        </div>
    );
}
import PosterCard from "@/components/PosterCard";
import { EstadoVacio } from "@/components/SeccionesInicio";
import { fetchPeliculas } from "@/lib/movies";

// Ubicación: app/(app)/buscar/page.tsx
export default async function Buscar({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const busqueda = (q ?? "").trim();

    const resultado = busqueda
        ? await fetchPeliculas({ busqueda, limite: 30 })
        : null;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold md:text-3xl">
                {busqueda ? (
                    <>
                        Resultados para{" "}
                        <span className="text-primary">“{busqueda}”</span>
                    </>
                ) : (
                    "Buscar películas"
                )}
            </h1>

            {!resultado ? (
                <EstadoVacio mensaje="Escribí el título de una película en el buscador." />
            ) : resultado.datos.length === 0 ? (
                <EstadoVacio mensaje={`No se encuentran resultados para “${busqueda}”.`} />
            ) : (
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-6">
                    {resultado.datos.map((m) => (
                        <PosterCard
                            key={m.id}
                            id={m.id}
                            title={m.title}
                            poster={m.poster}
                            className="w-full"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
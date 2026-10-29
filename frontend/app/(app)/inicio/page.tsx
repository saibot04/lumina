import {
    ActividadAmigos,
    FilaPeliculas,
    HeroDestacado,
} from "@/components/SeccionesInicio";
import { fetchPeliculas, slugify } from "@/lib/movies";

const GENEROS_HOME = ["Terror", "Comedia", "Drama", "Thriller"];

export default async function Inicio() {
    const [top, ...porGenero] = await Promise.all([
        fetchPeliculas({ limite: 10 }),
        ...GENEROS_HOME.map((g) =>
            fetchPeliculas({ genero: slugify(g), limite: 12 })
        ),
    ]);

    const conFondo = top.datos.filter((m) => m.backdrop);
    const destacadas = (conFondo.length >= 3 ? conFondo : top.datos).slice(0, 5);

    return (
        <div className="space-y-10">
            <HeroDestacado peliculas={destacadas} />

            <FilaPeliculas
                acento="Top 10"
                titulo="del mes"
                peliculas={top.datos}
                numerada
                mensajeVacio="Todavía no hay películas en el catálogo."
            />

            {GENEROS_HOME.map((genero, i) => (
                <FilaPeliculas
                    key={genero}
                    titulo={genero}
                    peliculas={porGenero[i].datos}
                    linea
                />
            ))}

            <ActividadAmigos />
        </div>
    );
}
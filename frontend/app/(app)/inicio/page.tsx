import {
    ActividadAmigos,
    FilaPeliculas,
    HeroDestacado,
} from "@/components/SeccionesInicio";
import { movies, peliculasPorGenero } from "@/lib/movies";

const GENEROS_HOME = ["Terror", "Comedia", "Drama", "Suspenso"];

const DESTACADAS = movies.slice(0, 5);

export default function Inicio() {
    return (
        <div className="space-y-10">
            <HeroDestacado peliculas={DESTACADAS} />

            <FilaPeliculas
                acento="Top 10"
                titulo="del mes"
                peliculas={movies}
                numerada
                mensajeVacio="Todavía no hay películas en el catálogo."
            />

            {GENEROS_HOME.map((genero) => (
                <FilaPeliculas
                    key={genero}
                    titulo={genero}
                    peliculas={peliculasPorGenero(genero)}
                    linea
                />
            ))}

            <ActividadAmigos />
        </div>
    );
}
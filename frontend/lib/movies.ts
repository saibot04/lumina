/* ------------------------------------------------------------------ *
 * Modelos de datos de LUMINA.
 * Todo lo que hoy es estático aquí pasará a venir de la base de datos.
 * ------------------------------------------------------------------ */

export type Movie = {
    id: string;
    title: string;
    /** Año de estreno. Pendiente de la base de datos. */
    year?: number;
    /** Géneros. Pendiente de la base de datos. */
    genres?: string[];
    /** Sinopsis. Pendiente de la base de datos. */
    synopsis?: string;
    /** Ruta o URL del póster. Pendiente de la base de datos. */
    poster?: string;
    /** Calificación media (0-5). Pendiente de la base de datos. */
    rating?: number;
};

export const movies: Movie[] = [
    { id: "1", title: "Metrópolis" },
    { id: "2", title: "El gabinete del Dr. Caligari" },
    { id: "3", title: "Nosferatu" },
    { id: "4", title: "M, el vampiro de Düsseldorf" },
    { id: "5", title: "Psicosis" },
    { id: "6", title: "El resplandor" },
    { id: "7", title: "Alien" },
    { id: "8", title: "La cosa" },
    { id: "9", title: "Suspiria" },
    { id: "10", title: "Rebecca" },
];

/* ------------------------------- Géneros ---------------------------------- */

export const GENEROS = [
    "Acción",
    "Aventura",
    "Animación",
    "Comedia",
    "Crimen",
    "Documental",
    "Drama",
    "Familia",
    "Fantasía",
    "Historia",
    "Terror",
    "Música",
    "Romance",
    "Ciencia ficción",
    "Thriller",
    "Guerra",
];

export function slugify(s: string) {
    return s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "-");
}

/** Devuelve el nombre del género a partir del slug de la URL. */
export function generoPorSlug(slug: string): string | undefined {
    return GENEROS.find((g) => slugify(g) === slug);
}

/**
 * Devuelve las películas de un género.
 *
 * Mientras `Movie.genres` no exista en los datos (la base de datos todavía no
 * está conectada), devuelve el catálogo completo para que las filas se vean
 * como el boceto. En cuanto haya géneros, filtra de verdad.
 */
export function peliculasPorGenero(genero: string): Movie[] {
    const hayGeneros = movies.some((m) => (m.genres?.length ?? 0) > 0);
    if (!hayGeneros) return movies;
    return movies.filter((m) => m.genres?.includes(genero));
}

/* --------------------------- Actividad de amigos -------------------------- */

export type TipoActividad = "califico" | "vio" | "guardo" | "meGusta";

export type ActividadAmigo = {
    id: string;
    usuario: {
        nombre: string;
        avatar?: string;
    };
    pelicula: {
        id: string;
        titulo: string;
    };
    tipo: TipoActividad;
    /** Calificación de 1 a 5, solo si la actividad es una calificación. */
    calificacion?: number;
    /** Fecha de la actividad. */
    fecha?: string;
};
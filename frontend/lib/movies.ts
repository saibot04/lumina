/* ------------------------------------------------------------------ *
 * Modelos de datos de LUMINA.
 * Todo lo que hoy es estático aquí pasará a venir de la base de datos.
 * ------------------------------------------------------------------ */

export type Miembro = { nombre: string; personaje: string };

export type Resena = {
    usuario: string;
    puntuacion: number; // 0,5 a 5
    texto: string;
    fecha: string;
    likes?: number;
};

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
    /** Duración en minutos. Pendiente de la base de datos. */
    duration?: number;
    /** Elenco con el nombre del personaje. Pendiente de la base de datos. */
    cast?: Miembro[];
    /** Reseñas de los usuarios. Pendiente de la base de datos. */
    reviews?: Resena[];
        /** Imagen grande de fondo. Pendiente de la base de datos. */
    backdrop?: string;
    /** Enlace al tráiler (YouTube, etc.). Pendiente de la base de datos. */
    trailer?: string;
};

export const movies: Movie[] = [
    {
        id: "1",
        title: "Metrópolis",
        year: 1927,
        duration: 150,
        genres: ["Ciencia ficción", "Drama"],
        synopsis:
            "En una ciudad futurista dividida entre una élite y los obreros que trabajan bajo tierra, el hijo del gobernante descubre la desigualdad.",
        cast: [
            { nombre: "Brigitte Helm", personaje: "María" },
            { nombre: "Alfred Abel", personaje: "Joh Fredersen" },
        ],
        reviews: [
            { usuario: "carlitos", puntuacion: 5, texto: "Una obra maestra del cine mudo.", fecha: "2026-10-20", likes: 3 },
            { usuario: "sofi_m", puntuacion: 4, texto: "Visualmente impresionante.", fecha: "2026-10-22" },
            { usuario: "tomi", puntuacion: 4.5, texto: "Se nota cuánto influyó en la ciencia ficción.", fecha: "2026-10-23", likes: 1 },
            { usuario: "lau", puntuacion: 3.5, texto: "Larga, pero vale la pena.", fecha: "2026-10-25" },
            { usuario: "nico", puntuacion: 5, texto: "Imperdible.", fecha: "2026-10-26" },
        ],
    },
    {
        id: "2",
        title: "El gabinete del Dr. Caligari",
        year: 1920,
        duration: 76,
        genres: ["Terror", "Thriller"],
        synopsis:
            "Un misterioso doctor exhibe a un sonámbulo en una feria, y una serie de crímenes comienza a aterrorizar al pueblo.",
        cast: [
            { nombre: "Werner Krauss", personaje: "Dr. Caligari" },
            { nombre: "Conrad Veidt", personaje: "Cesare" },
        ],
    },
    {
        id: "3",
        title: "Nosferatu",
        year: 1922,
        duration: 94,
        genres: ["Terror", "Fantasía"],
        synopsis:
            "Un agente inmobiliario viaja a un castillo remoto y descubre que su cliente es un vampiro que se obsesiona con su esposa.",
        cast: [
            { nombre: "Max Schreck", personaje: "Conde Orlok" },
            { nombre: "Greta Schröder", personaje: "Ellen" },
        ],
    },
    {
        id: "4",
        title: "M, el vampiro de Düsseldorf",
        year: 1931,
        duration: 117,
        genres: ["Crimen", "Thriller", "Drama"],
        synopsis:
            "Mientras la policía busca a un asesino de niños, el hampa de la ciudad decide encontrarlo primero.",
        cast: [
            { nombre: "Peter Lorre", personaje: "Hans Beckert" },
            { nombre: "Otto Wernicke", personaje: "Inspector Lohmann" },
        ],
    },
    {
        id: "5",
        title: "Psicosis",
        year: 1960,
        duration: 109,
        genres: ["Terror", "Thriller"],
        synopsis:
            "Una mujer que huye con dinero robado se hospeda en un motel apartado, administrado por un joven inquietante.",
        cast: [
            { nombre: "Anthony Perkins", personaje: "Norman Bates" },
            { nombre: "Janet Leigh", personaje: "Marion Crane" },
        ],
        reviews: [
            { usuario: "sofi_m", puntuacion: 5, texto: "La escena de la ducha sigue siendo increíble.", fecha: "2026-10-18", likes: 2 },
            { usuario: "lau", puntuacion: 4.5, texto: "Tensión pura de principio a fin.", fecha: "2026-10-24" },
        ],
    },
    {
        id: "6",
        title: "El resplandor",
        year: 1980,
        duration: 146,
        genres: ["Terror", "Thriller"],
        synopsis:
            "Un escritor acepta cuidar un hotel aislado durante el invierno, mientras su mente se deteriora junto a su familia.",
        cast: [
            { nombre: "Jack Nicholson", personaje: "Jack Torrance" },
            { nombre: "Shelley Duvall", personaje: "Wendy Torrance" },
        ],
    },
    {
        id: "7",
        title: "Alien",
        year: 1979,
        duration: 117,
        genres: ["Ciencia ficción", "Terror"],
        synopsis:
            "La tripulación de una nave comercial responde a una señal desconocida y trae a bordo a una criatura letal.",
        cast: [
            { nombre: "Sigourney Weaver", personaje: "Ripley" },
            { nombre: "Tom Skerritt", personaje: "Dallas" },
        ],
        reviews: [
            { usuario: "tomi", puntuacion: 5, texto: "Terror y ciencia ficción en su mejor mezcla.", fecha: "2026-10-21", likes: 4 },
            { usuario: "nico", puntuacion: 4, texto: "El diseño de la criatura es genial.", fecha: "2026-10-27" },
        ],
    },
    {
        id: "8",
        title: "La cosa",
        year: 1982,
        duration: 109,
        genres: ["Terror", "Ciencia ficción"],
        synopsis:
            "En una base antártica, un grupo de investigadores se enfrenta a un ser capaz de imitar a cualquier organismo.",
        cast: [
            { nombre: "Kurt Russell", personaje: "MacReady" },
            { nombre: "Keith David", personaje: "Childs" },
        ],
    },
    {
        id: "9",
        title: "Suspiria",
        year: 1977,
        duration: 98,
        genres: ["Terror", "Fantasía"],
        synopsis:
            "Una joven bailarina llega a una academia de danza en Europa y descubre que esconde un oscuro secreto.",
        cast: [
            { nombre: "Jessica Harper", personaje: "Suzy Bannion" },
            { nombre: "Alida Valli", personaje: "Miss Tanner" },
        ],
    },
    {
        id: "10",
        title: "Rebecca",
        year: 1940,
        duration: 130,
        genres: ["Drama", "Romance", "Thriller"],
        synopsis:
            "Una joven recién casada llega a una mansión donde la sombra de la primera esposa de su marido sigue presente.",
        cast: [
            { nombre: "Laurence Olivier", personaje: "Maxim de Winter" },
            { nombre: "Joan Fontaine", personaje: "La segunda señora de Winter" },
        ],
    },
    {
        id: "11",
        title: "El padrino",
        year: 1972,
        duration: 175,
        genres: ["Crimen", "Drama"],
        synopsis:
            "El patriarca de una familia mafiosa de Nueva York cede el control a su hijo menor, que nunca quiso entrar en el negocio.",
        cast: [
            { nombre: "Marlon Brando", personaje: "Vito Corleone" },
            { nombre: "Al Pacino", personaje: "Michael Corleone" },
        ],
        reviews: [
            { usuario: "carlitos", puntuacion: 5, texto: "Una oferta que no se puede rechazar.", fecha: "2026-10-19", likes: 5 },
            { usuario: "sofi_m", puntuacion: 5, texto: "Cada escena es perfecta.", fecha: "2026-10-23" },
            { usuario: "lau", puntuacion: 4.5, texto: "Larga, pero no sobra nada.", fecha: "2026-10-26" },
        ],
    },
    {
        id: "12",
        title: "Casablanca",
        year: 1942,
        duration: 102,
        genres: ["Romance", "Drama", "Guerra"],
        synopsis:
            "En plena guerra, el dueño de un café en Marruecos debe elegir entre su pasado y una causa mayor cuando reaparece un amor perdido.",
        cast: [
            { nombre: "Humphrey Bogart", personaje: "Rick Blaine" },
            { nombre: "Ingrid Bergman", personaje: "Ilsa Lund" },
        ],
        reviews: [
            { usuario: "nico", puntuacion: 4.5, texto: "Un romance clásico de verdad.", fecha: "2026-10-22" },
            { usuario: "tomi", puntuacion: 4, texto: "Los diálogos son lo mejor.", fecha: "2026-10-25", likes: 1 },
        ],
    },
    {
        id: "13",
        title: "Luces de la ciudad",
        year: 1931,
        duration: 87,
        genres: ["Comedia", "Romance", "Drama"],
        synopsis:
            "Un vagabundo se enamora de una florista ciega y hace lo imposible por conseguir el dinero que necesita para ayudarla.",
        cast: [
            { nombre: "Charlie Chaplin", personaje: "El vagabundo" },
            { nombre: "Virginia Cherrill", personaje: "La florista ciega" },
        ],
    },
    {
        id: "14",
        title: "Tiempos modernos",
        year: 1936,
        duration: 87,
        genres: ["Comedia"],
        synopsis:
            "Un obrero de fábrica intenta sobrevivir en un mundo industrial cada vez más mecanizado, con la ayuda de una joven sin hogar.",
        cast: [
            { nombre: "Charlie Chaplin", personaje: "El obrero" },
            { nombre: "Paulette Goddard", personaje: "La joven" },
        ],
    },
    {
        id: "15",
        title: "El mago de Oz",
        year: 1939,
        duration: 102,
        genres: ["Familia", "Fantasía", "Música"],
        synopsis:
            "Una niña es arrastrada por un tornado a un mundo mágico y debe seguir el camino amarillo para volver a casa.",
        cast: [
            { nombre: "Judy Garland", personaje: "Dorothy" },
            { nombre: "Ray Bolger", personaje: "El Espantapájaros" },
        ],
    },
    {
        id: "16",
        title: "Cantando bajo la lluvia",
        year: 1952,
        duration: 103,
        genres: ["Música", "Comedia", "Romance"],
        synopsis:
            "Una estrella del cine mudo debe adaptarse a la llegada del sonoro, con ayuda de una joven actriz y su mejor amigo.",
        cast: [
            { nombre: "Gene Kelly", personaje: "Don Lockwood" },
            { nombre: "Debbie Reynolds", personaje: "Kathy Selden" },
        ],
    },
    {
        id: "17",
        title: "Los siete samuráis",
        year: 1954,
        duration: 207,
        genres: ["Acción", "Aventura", "Drama"],
        synopsis:
            "Los habitantes de una aldea contratan a siete samuráis para defenderse de unos bandidos que arrasan sus cosechas.",
        cast: [
            { nombre: "Toshiro Mifune", personaje: "Kikuchiyo" },
            { nombre: "Takashi Shimura", personaje: "Kambei" },
        ],
    },
    {
        id: "18",
        title: "Lo que el viento se llevó",
        year: 1939,
        duration: 238,
        genres: ["Drama", "Romance", "Historia", "Guerra"],
        synopsis:
            "La vida de una joven sureña obstinada durante la Guerra de Secesión y la reconstrucción posterior.",
        cast: [
            { nombre: "Vivien Leigh", personaje: "Scarlett O'Hara" },
            { nombre: "Clark Gable", personaje: "Rhett Butler" },
        ],
    },
    {
        id: "19",
        title: "Tiburón",
        year: 1975,
        duration: 124,
        genres: ["Aventura", "Thriller"],
        synopsis:
            "Un jefe de policía, un biólogo marino y un viejo pescador salen al mar para cazar a un tiburón que aterroriza una playa.",
        cast: [
            { nombre: "Roy Scheider", personaje: "Martin Brody" },
            { nombre: "Robert Shaw", personaje: "Quint" },
        ],
    },
    {
        id: "20",
        title: "Volver al futuro",
        year: 1985,
        duration: 116,
        genres: ["Ciencia ficción", "Aventura", "Comedia"],
        synopsis:
            "Un adolescente viaja al pasado en una máquina del tiempo y debe asegurarse de que sus padres se enamoren.",
        cast: [
            { nombre: "Michael J. Fox", personaje: "Marty McFly" },
            { nombre: "Christopher Lloyd", personaje: "Doc Brown" },
        ],
    },
    {
        id: "21",
        title: "Blancanieves y los siete enanitos",
        year: 1937,
        duration: 83,
        genres: ["Animación", "Familia", "Fantasía", "Música"],
        synopsis:
            "Una joven princesa huye de su malvada madrastra y encuentra refugio en una cabaña con siete enanitos.",
        cast: [{ nombre: "Adriana Caselotti", personaje: "Blancanieves (voz)" }],
    },
    {
        id: "22",
        title: "Nanook el esquimal",
        year: 1922,
        duration: 79,
        genres: ["Documental"],
        synopsis:
            "Retrato de la vida diaria de una familia inuit en el Ártico canadiense, considerado uno de los primeros documentales de la historia.",
        cast: [{ nombre: "Allakariallak", personaje: "Nanook" }],
    },
    {
        id: "23",
        title: "Lawrence de Arabia",
        year: 1962,
        duration: 218,
        genres: ["Aventura", "Historia", "Guerra", "Drama"],
        synopsis:
            "La historia de un oficial británico que se une a las tribus árabes durante la Primera Guerra Mundial.",
        cast: [
            { nombre: "Peter O'Toole", personaje: "T. E. Lawrence" },
            { nombre: "Omar Sharif", personaje: "Sherif Ali" },
        ],
    },
    {
        id: "24",
        title: "Los cazadores del arca perdida",
        year: 1981,
        duration: 115,
        genres: ["Acción", "Aventura"],
        synopsis:
            "Un arqueólogo aventurero compite contra los nazis para encontrar el Arca de la Alianza antes de que caiga en sus manos.",
        cast: [
            { nombre: "Harrison Ford", personaje: "Indiana Jones" },
            { nombre: "Karen Allen", personaje: "Marion Ravenwood" },
        ],
    },
];
    
export function getMovie(id: string): Movie | undefined {
    return movies.find((m) => m.id === id);
}

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

export const actividadAmigosEjemplo: ActividadAmigo[] = [
    { id: "a1", usuario: { nombre: "Sofi" }, pelicula: { id: "1", titulo: "Metrópolis" }, tipo: "califico", calificacion: 3 },
    { id: "a2", usuario: { nombre: "Tomi" }, pelicula: { id: "1", titulo: "Metrópolis" }, tipo: "califico", calificacion: 4 },
    { id: "a3", usuario: { nombre: "Lau" }, pelicula: { id: "1", titulo: "Metrópolis" }, tipo: "guardo" },
];

export function actividadDePelicula(id: string): ActividadAmigo[] {
    return actividadAmigosEjemplo.filter((a) => a.pelicula.id === id);
}
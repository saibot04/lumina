-- Se borra todo y se vuelve a crear: sirve para desarrollo,
-- pero ejecutarlo elimina los datos existentes.
DROP TABLE IF EXISTS vistas, resenas, elenco, pelicula_genero,
                    personas, generos, peliculas, usuarios CASCADE;

CREATE TABLE usuarios (
id              SERIAL PRIMARY KEY,
nombre_usuario  VARCHAR(30)  NOT NULL UNIQUE,
email           VARCHAR(255) NOT NULL UNIQUE,
password_hash   TEXT         NOT NULL,
rol             VARCHAR(10)      NOT NULL DEFAULT 'usuario'
                CHECK (rol IN ('usuario', 'admin')),
creado_en       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE peliculas (
id           SERIAL PRIMARY KEY,
tmdb_id      INT UNIQUE,
titulo       VARCHAR(200) NOT NULL,
anio         SMALLINT     NOT NULL,
duracion     SMALLINT     NOT NULL,
sinopsis     TEXT,
poster       TEXT,
backdrop     TEXT,
trailer_key  VARCHAR(20)
);

CREATE TABLE generos (
id      SERIAL PRIMARY KEY,
nombre  VARCHAR(50) NOT NULL UNIQUE,
slug    VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE pelicula_genero (
pelicula_id  INT NOT NULL REFERENCES peliculas(id) ON DELETE CASCADE,
genero_id    INT NOT NULL REFERENCES generos(id)   ON DELETE CASCADE,
PRIMARY KEY (pelicula_id, genero_id)
);

CREATE TABLE personas (
id                SERIAL PRIMARY KEY,
nombre            VARCHAR(100) NOT NULL,
nacionalidad      VARCHAR(60),
fecha_nacimiento  DATE,
foto              TEXT
);

CREATE TABLE elenco (
id           SERIAL PRIMARY KEY,
pelicula_id  INT NOT NULL REFERENCES peliculas(id) ON DELETE CASCADE,
persona_id   INT NOT NULL REFERENCES personas(id)  ON DELETE CASCADE,
rol          VARCHAR(20) NOT NULL
            CHECK (rol IN ('actor', 'director', 'guionista')),
personaje    VARCHAR(100),
UNIQUE (pelicula_id, persona_id, rol)
);

CREATE TABLE resenas (
id           SERIAL PRIMARY KEY,
usuario_id   INT NOT NULL REFERENCES usuarios(id)  ON DELETE CASCADE,
pelicula_id  INT NOT NULL REFERENCES peliculas(id) ON DELETE CASCADE,
puntuacion   NUMERIC(2,1) NOT NULL
            CHECK (puntuacion BETWEEN 0.5 AND 5
                    AND puntuacion * 2 = TRUNC(puntuacion * 2)),
texto        VARCHAR(500),
creado_en    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
UNIQUE (usuario_id, pelicula_id)
);

CREATE TABLE vistas (
id           SERIAL PRIMARY KEY,
usuario_id   INT NOT NULL REFERENCES usuarios(id)  ON DELETE CASCADE,
pelicula_id  INT NOT NULL REFERENCES peliculas(id) ON DELETE CASCADE,
visto_en     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
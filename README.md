# Lumina

Plataforma para descubrir películas, puntuarlas y compartir reseñas. Proyecto de Programación Orientada a Objetos (arquitectura MVC, con los patrones Command y Object Pool).

El proyecto está dividido en dos partes independientes:

```
lumina/
├── frontend/   → Next.js (pantallas y diseño)
└── backend/    → API con Node + Express y base de datos PostgreSQL
```

Para verlo funcionando hay que ejecutar **las dos partes**: el frontend pide los datos al backend.

## Requisitos

- [Node.js](https://nodejs.org) (versión LTS)
- [Git](https://git-scm.com)
- [PostgreSQL](https://www.postgresql.org) (con pgAdmin, que viene en el instalador)
- Una clave gratuita de la API de [TMDB](https://www.themoviedb.org/settings/api), para importar las películas

> En VS Code conviene abrir la carpeta `lumina` (la madre), no `frontend` ni `backend`.

## Primera vez

**1. Clonar el proyecto**

```bash
git clone https://github.com/saibot04/lumina.git
```

**2. Crear la base de datos**

Abrí pgAdmin y creá una base vacía (por ejemplo, llamada `lumina`).

**3. Configurar y preparar el backend**

```bash
cd lumina/backend
npm install
```

Copiá `.env.example` como `.env` y completá los valores (conexión a PostgreSQL, clave de TMDB, etc.):

```bash
copy .env.example .env
```

Después creá las tablas e importá el catálogo de películas:

```bash
npm run db:init
npm run db:importar
```

> ⚠️ `npm run db:init` **borra todas las tablas y las vuelve a crear**. Usalo solo la primera vez o cuando quieras empezar de cero. Si ya tenés datos que querés conservar, no lo corras de nuevo.

**4. Configurar y preparar el frontend**

En otra terminal:

```bash
cd lumina/frontend
npm install
```

Creá un archivo `.env.local` dentro de `frontend` con la dirección del backend:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**5. Ejecutar las dos partes**

Cada una en su propia terminal:

```bash
# Terminal 1: backend
cd lumina/backend
npm run dev

# Terminal 2: frontend
cd lumina/frontend
npm run dev
```

**6. Abrir en el navegador:** <http://localhost:3000>

Para detener un servidor: `Ctrl + C`.

## Las próximas veces

Alcanza con levantar las dos partes:

```bash
cd lumina/backend
npm run dev
```

```bash
cd lumina/frontend
npm run dev
```

Si el `git pull` trae cambios en algún `package.json`, volver a correr `npm install` en esa carpeta.

Si el `git pull` trae cambios en `backend/src/db/schema.sql`, mirá si hay un archivo de migración nuevo (por ejemplo `002_...sql`) y corrélo en pgAdmin (Query Tool) para no perder tus datos.

## Scripts del backend

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Levanta la API en modo desarrollo |
| `npm run db:init` | Borra y crea de nuevo las tablas (`schema.sql`) |
| `npm run db:importar` | Importa el catálogo de películas desde TMDB |

## Hacerse administrador

Registrate desde la app y después, en el Query Tool de pgAdmin, corré (con tu email):

```sql
UPDATE usuarios SET rol = 'admin' WHERE email = 'tu@mail.com';
```

## Créditos

This product uses the TMDB API but is not endorsed or certified by TMDB.
# Lumina

App de películas y series. El proyecto está dividido en dos partes independientes:

```
lumina/
├── frontend/   → Next.js (pantallas y diseño)
└── backend/    → API propia y base de datos (pendiente)
```

Por ahora solo hay que ejecutar el `frontend`.

## Cómo correrlo

Requisito: tener [Node.js](https://nodejs.org) (versión LTS) y [Git](https://git-scm.com) instalados.

**1. Clonar el proyecto**

```bash
git clone https://github.com/saibot04/lumina.git
```

**2. Entrar a la carpeta del frontend e instalar las dependencias** (solo la primera vez)

```bash
cd lumina/frontend
npm install
```

**3. Ejecutarlo**

```bash
npm run dev
```

**4. Abrir en el navegador:** <http://localhost:3000>

Para detener el servidor: `Ctrl + C`.

> En VS Code conviene abrir la carpeta `lumina` (la madre), no `frontend`.

## Las próximas veces

Alcanza con:

```bash
cd lumina/frontend
npm run dev
```

Si el `git pull` trae cambios en `package.json`, volver a correr `npm install`.
hola lo altere
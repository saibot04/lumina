import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import peliculasRoutes from "./routes/peliculas.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import resenasRoutes from "./routes/resenas.routes.js";
import { ErrorNegocio } from "./utils/errores.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensaje: "API de Lumina funcionando" });
});

app.use("/api/health", healthRoutes);
app.use("/api/peliculas", peliculasRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api", resenasRoutes);

// Ruta inexistente
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Errores: los de negocio llevan su propio estado y mensaje
app.use((error, req, res, next) => {
  if (error instanceof ErrorNegocio) {
    return res.status(error.estado).json({ error: error.message });
  }
  // 23505 = valor repetido en una columna UNIQUE (dos pedidos a la vez)
  if (error.code === "23505") {
    return res.status(409).json({ error: "Ya reseñaste esta película." });
  }
  console.error(error);
  res.status(500).json({ error: "Error interno del servidor" });
});

export default app;
import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import peliculasRoutes from "./routes/peliculas.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:3000" }));
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
res.json({ mensaje: "API de Lumina funcionando" });
});

app.use("/api/health", healthRoutes);
app.use("/api/peliculas", peliculasRoutes);

// Ruta inexistente
app.use((req, res) => {
res.status(404).json({ error: "Ruta no encontrada" });
});

// Errores no controlados (por ejemplo, si la base falla)
app.use((error, req, res, next) => {
console.error(error);
res.status(500).json({ error: "Error interno del servidor" });
});

export default app;
import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.get("/", (req, res) => {
    res.json({ mensaje: "API de Lumina funcionando" });
});
app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:3000" }));
app.use(express.json());

app.use("/api/health", healthRoutes);

export default app;
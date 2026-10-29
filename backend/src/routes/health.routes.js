import { Router } from "express";
import pg from "pg";

const router = Router();

router.get("/", async (req, res) => {
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

try {
    await client.connect();
    const resultado = await client.query("SELECT NOW() AS ahora");
    res.json({
    ok: true,
    baseDeDatos: "conectada",
    ahora: resultado.rows[0].ahora,
    });
} catch (error) {
    res.status(500).json({
    ok: false,
    baseDeDatos: "sin conexión",
    error: error.message,
    });
} finally {
    await client.end().catch(() => {});
}
});

export default router;
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const carpeta = path.dirname(fileURLToPath(import.meta.url));
const leer = (archivo) => fs.readFileSync(path.join(carpeta, archivo), "utf8");

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

try {
await client.connect();
await client.query(leer("schema.sql"));
await client.query(leer("seed.sql"));
console.log("Base de datos lista: tablas creadas y datos de prueba cargados.");
} catch (error) {
console.error("No se pudo inicializar la base de datos:", error.message);
process.exitCode = 1;
} finally {
await client.end();
}
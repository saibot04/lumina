import pg from "pg";

const pool = new pg.Pool({
connectionString: process.env.DATABASE_URL,
max: 10,
});

export function query(texto, parametros) {
return pool.query(texto, parametros);
}

/** Ejecuta varias consultas como una sola unidad: o se aplican todas o ninguna. */
export async function transaccion(trabajo) {
const cliente = await pool.connect(); // se toma una conexión del pool
try {
    await cliente.query("BEGIN");
    const resultado = await trabajo((texto, parametros) =>
    cliente.query(texto, parametros)
    );
    await cliente.query("COMMIT");
    return resultado;
} catch (error) {
    await cliente.query("ROLLBACK");
    throw error;
} finally {
    cliente.release(); // y se devuelve al pool
}
}
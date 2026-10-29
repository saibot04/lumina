import "dotenv/config";

const token = process.env.TMDB_TOKEN;

if (!token) {
console.error("Falta TMDB_TOKEN en el .env");
process.exit(1);
}

// La clave corta va como parámetro; el token largo, como Bearer
const esClaveCorta = token.length < 60;

const url = new URL("https://api.themoviedb.org/3/search/movie");
url.searchParams.set("query", "Metrópolis");
url.searchParams.set("language", "es-ES");
if (esClaveCorta) url.searchParams.set("api_key", token);

const res = await fetch(url, {
headers: esClaveCorta ? {} : { Authorization: `Bearer ${token}` },
});
const data = await res.json();

if (!res.ok) {
console.error("Error de TMDB:", res.status, data.status_message);
process.exit(1);
}

const primero = data.results[0];
console.log(`Funciona. ${data.total_results} resultados.`);
console.log(`Primero: ${primero?.title} (${primero?.release_date})`);
import PublicarResenaCommand from "./PublicarResenaCommand.js";
import EditarResenaCommand from "./EditarResenaCommand.js";
import EliminarResenaCommand from "./EliminarResenaCommand.js";

const CLASES = {
publicar: PublicarResenaCommand,
editar: EditarResenaCommand,
eliminar: EliminarResenaCommand,
};

export function crearComando(tipo, datos) {
const Clase = CLASES[tipo];
if (!Clase) throw new Error(`Tipo de comando desconocido: ${tipo}`);
return new Clase(datos);
}
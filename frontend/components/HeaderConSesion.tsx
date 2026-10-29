import Header from "./Header";
import { obtenerUsuario } from "@/lib/sesion";

export default async function HeaderConSesion() {
    const usuario = await obtenerUsuario();
    return <Header usuario={usuario} />;
}
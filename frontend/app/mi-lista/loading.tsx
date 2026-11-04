import { requerirUsuario } from "@/lib/sesion";
import MiListaCliente from "@/components/MiListaCliente";

export default async function MiListaPage() {
    await requerirUsuario();
    return <MiListaCliente />;
}
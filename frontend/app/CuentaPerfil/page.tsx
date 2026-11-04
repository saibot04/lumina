import { redirect } from "next/navigation";
import { obtenerPerfil } from "@/lib/sesion";
import CuentaCliente from "@/components/CuentaCliente";

export default async function CuentaPage() {
    const perfil = await obtenerPerfil();
    if (!perfil) redirect("/login");

    return <CuentaCliente perfil={perfil} />;
}
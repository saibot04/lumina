import { redirect } from "next/navigation";
import { obtenerPerfil } from "@/lib/sesion";
import PerfilSocial from "@/components/PerfilSocial";

export default async function PerfilPage() {
    const perfil = await obtenerPerfil();
    if (!perfil) redirect("/login");

    return <PerfilSocial perfil={perfil} />;
}
import { redirect } from "next/navigation";
import {
    obtenerPerfil,
    obtenerMisResenas,
    obtenerEstadoDeshacer,
} from "@/lib/sesion";
import { fetchPeliculas } from "@/lib/movies";
import PerfilSocial from "@/components/PerfilSocial";

export default async function PerfilPage() {
    const perfil = await obtenerPerfil();
    if (!perfil) redirect("/login");

    const [resenas, estado, catalogo] = await Promise.all([
        obtenerMisResenas(),
        obtenerEstadoDeshacer(),
        fetchPeliculas({ limite: 50 }),
    ]);

    const peliculas = catalogo.datos.map((m) => ({ id: m.id, title: m.title }));

    return (
        <PerfilSocial
            perfil={perfil}
            resenas={resenas}
            peliculas={peliculas}
            puedeDeshacer={estado?.puedeDeshacer ?? false}
        />
    );
}
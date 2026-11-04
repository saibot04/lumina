"use client";

import { useState, useRef, useSyncExternalStore } from "react";
import ModalAgregar from "@/components/ModalAgregar";
import GridCasilleros from "@/components/GridCasilleros";
import VistaCompletaPeliculas from "@/components/VistaCompletaPeliculas";
import BotonVolver from "@/components/BotonVolver";
import { actualizarPerfil } from "@/app/auth/perfil-actions";
import type { Perfil as PerfilUsuario } from "@/lib/sesion";

type Stats = { peliculas: number; esteAnio: number; seguidores: number; };
type ItemLista = { id: number; title: string };

function suscribirFoto(avisar: () => void) {
    window.addEventListener("storage", avisar);
    return () => window.removeEventListener("storage", avisar);
}

function leerFoto() {
    return localStorage.getItem("lumina_user_foto");
}

export default function PerfilSocial({ perfil }: { perfil: PerfilUsuario }) {
    const [tab, setTab] = useState<string>("Perfil");
    const [stats, setStats] = useState<Stats>({
        peliculas: perfil.estadisticas.vistas,
        esteAnio: 0,
        seguidores: 0,
    });

    // Datos del usuario: vienen de la base de datos
    const nombreUsuario = perfil.nombreMostrado || perfil.nombreUsuario;
    const handleUsuario = "@" + perfil.nombreUsuario;
    const biografia = perfil.bio;
    const fotoPerfil = useSyncExternalStore(suscribirFoto, leerFoto, () => null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Edición
    const [editando, setEditando] = useState(false);
    const [tempNombre, setTempNombre] = useState(perfil.nombreMostrado);
    const [tempBio, setTempBio] = useState(perfil.bio);
    const [guardando, setGuardando] = useState(false);
    const [errorPerfil, setErrorPerfil] = useState("");

    // Listas principales (siguen en memoria: todavía no tienen tabla en la base)
    const [favoritos, setFavoritos] = useState<ItemLista[]>([]);
    const [peliculasVistas, setPeliculasVistas] = useState<ItemLista[]>([]);
    const [watchlist, setWatchlist] = useState<ItemLista[]>([]);
    const [meGusta, setMeGusta] = useState<ItemLista[]>([]);
    const [reseñas, setReseñas] = useState<{ id: number; pelicula: string; texto: string; estrellas: number }[]>([]);

    // Control de vistas (si está en modo "ver más" o en los casilleros principales)
    const [verMasPeliculas, setVerMasPeliculas] = useState(false);
    const [verMasWatchlist, setVerMasWatchlist] = useState(false);

    // Control de modales
    const [modalTipo, setModalTipo] = useState<"favorito" | "reseña" | "peliVivida" | "watchlist" | "mg" | null>(null);
    const [indiceCasillero, setIndiceCasillero] = useState<number | null>(null);

    const handleCambiarFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            localStorage.setItem("lumina_user_foto", url);
            // Avisa al componente que la foto cambió
            window.dispatchEvent(new Event("storage"));
        }
    };

    const guardarPerfil = async (e: React.FormEvent) => {
        e.preventDefault();
        setGuardando(true);
        setErrorPerfil("");

        const r = await actualizarPerfil({ nombreMostrado: tempNombre, bio: tempBio });
        setGuardando(false);

        if (!r.ok) {
            setErrorPerfil(r.errores?.nombreMostrado ?? r.errores?.bio ?? r.error ?? "No se pudo guardar.");
            return;
        }
        setEditando(false);
    };

    const handleGuardarModal = ({ titulo, texto, estrellas }: { titulo: string; texto?: string; estrellas?: number }) => {
        const nuevoItem = { id: Date.now(), title: titulo };

        const actualizarLista = (listaActual: ItemLista[], setLista: (lista: ItemLista[]) => void) => {
            const nueva = [...listaActual];
            if (indiceCasillero !== null) {
                nueva[indiceCasillero] = nuevoItem;
            } else {
                nueva.push(nuevoItem);
            }
            setLista(nueva);
        };

        if (modalTipo === "favorito") actualizarLista(favoritos, setFavoritos);
        if (modalTipo === "peliVivida") {
            actualizarLista(peliculasVistas, setPeliculasVistas);
            setStats(prev => ({ ...prev, peliculas: prev.peliculas + 1, esteAnio: prev.esteAnio + 1 }));
        }
        if (modalTipo === "watchlist") actualizarLista(watchlist, setWatchlist);
        if (modalTipo === "mg") actualizarLista(meGusta, setMeGusta);
        if (modalTipo === "reseña") {
            setReseñas([...reseñas, { id: Date.now(), pelicula: titulo, texto: texto || "", estrellas: estrellas || 5 }]);
        }
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-12 pb-32 relative">
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleCambiarFoto} />

            <div className="max-w-4xl mx-auto">

                <div className="mb-6">
                    <BotonVolver />
                </div>

                {/* Cabecera */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <div onClick={() => fileInputRef.current?.click()} className="w-24 h-24 rounded-full bg-[#1c1c1c] flex items-center justify-center text-4xl font-medium border border-white/10 overflow-hidden cursor-pointer relative group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                {fotoPerfil ? <img src={fotoPerfil} alt="Perfil" className="w-full h-full object-cover" /> : nombreUsuario.charAt(0).toUpperCase()}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[10px] uppercase text-white">Cambiar</div>
                            </div>
                            <button onClick={() => fileInputRef.current?.click()} className="text-[10px] text-gray-400 uppercase tracking-widest">Cambiar foto</button>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold">{nombreUsuario}</h1>
                            <p className="text-gray-400 text-sm">{handleUsuario}</p>
                            {biografia && (
                                <p className="text-gray-300 text-xs mt-2 italic">&ldquo;{biografia}&rdquo;</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex gap-8 text-center">
                            <div><p className="text-2xl font-bold">{stats.peliculas}</p><p className="text-[10px] text-gray-500 uppercase">Películas</p></div>
                            <div><p className="text-2xl font-bold">{stats.esteAnio}</p><p className="text-[10px] text-gray-500 uppercase">Este año</p></div>
                            <div><p className="text-2xl font-bold">{stats.seguidores}</p><p className="text-[10px] text-gray-500 uppercase">Seguidores</p></div>
                        </div>
                        <button onClick={() => setEditando(!editando)} className="border border-white/20 text-xs px-4 py-2 rounded uppercase">{editando ? "Cerrar" : "Editar perfil"}</button>
                    </div>
                </div>

                {/* Edición */}
                {editando && (
                    <form onSubmit={guardarPerfil} className="bg-[#141414] border border-white/10 p-6 rounded-xl mb-8 space-y-4">
                        <h2 className="text-sm font-medium text-[#fccb30] uppercase">Editar información</h2>
                        <input type="text" value={tempNombre} onChange={(e) => setTempNombre(e.target.value)} maxLength={60} placeholder="Nombre visible" className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white" />
                        <textarea value={tempBio} onChange={(e) => setTempBio(e.target.value)} maxLength={300} rows={2} placeholder="Tu bio" className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white" />
                        {errorPerfil && <p role="alert" className="text-xs text-red-400">{errorPerfil}</p>}
                        <button type="submit" disabled={guardando} className="bg-[#fccb30] text-black text-xs font-medium px-5 py-2 rounded uppercase disabled:opacity-50">
                            {guardando ? "Guardando…" : "Guardar cambios"}
                        </button>
                    </form>
                )}

                {/* Favoritos */}
                <GridCasilleros
                    titulo="Favorite Films"
                    items={favoritos}
                    onAgregarClick={(index) => { setIndiceCasillero(index); setModalTipo("favorito"); }}
                />

                {/* Pestañas */}
                <div className="flex gap-8 border-b border-white/10 mb-8 text-sm">
                    {["Perfil", "Películas", "Reseñas", "Watchlist", "Me gusta"].map((t) => (
                        <button key={t} onClick={() => { setTab(t); setVerMasPeliculas(false); setVerMasWatchlist(false); }} className={`pb-3 relative uppercase tracking-wider text-xs ${tab === t ? "text-[#fccb30] font-medium" : "text-gray-400"}`}>
                            {t}
                            {tab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#fccb30]"></div>}
                        </button>
                    ))}
                </div>

                {/* Contenido de pestañas */}
                <div>
                    {tab === "Perfil" && <div className="text-center py-16 text-gray-500 text-sm bg-[#141414]/30 border border-white/5 rounded-lg">Tu actividad reciente aparecerá acá.</div>}

                    {tab === "Películas" && (
                        verMasPeliculas ? (
                            <VistaCompletaPeliculas
                                titulo="Películas Vistas"
                                peliculas={peliculasVistas}
                                onVolver={() => setVerMasPeliculas(false)}
                                onAgregar={() => { setIndiceCasillero(null); setModalTipo("peliVivida"); }}
                            />
                        ) : (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xs uppercase tracking-wider text-gray-400">Películas Vistas</h2>
                                    {peliculasVistas.length > 0 && (
                                        <button onClick={() => setVerMasPeliculas(true)} className="text-xs text-[#fccb30] hover:underline uppercase tracking-wider">
                                            Ver más ({peliculasVistas.length}) →
                                        </button>
                                    )}
                                </div>
                                <GridCasilleros
                                    titulo="Últimas registradas"
                                    items={peliculasVistas}
                                    onAgregarClick={(index) => { setIndiceCasillero(index); setModalTipo("peliVivida"); }}
                                />
                            </div>
                        )
                    )}

                    {tab === "Reseñas" && (
                        <div>
                            <div className="flex justify-between items-center mb-6"><h2 className="text-xs uppercase text-gray-400">Tus Críticas</h2><button onClick={() => { setIndiceCasillero(null); setModalTipo("reseña"); }} className="bg-[#fccb30] text-black text-[11px] px-3 py-1.5 rounded uppercase">+ Agregar reseña</button></div>
                            {reseñas.length === 0 ? <div className="text-center py-16 text-gray-500 text-xs border border-dashed rounded-lg">No escribiste ninguna reseña todavía.</div> :
                                <div className="space-y-4">{reseñas.map(r => <div key={r.id} className="bg-[#141414] border border-white/5 p-5 rounded-lg"><h3 className="font-semibold">{r.pelicula}</h3><p className="text-gray-300 text-sm">{r.texto}</p></div>)}</div>}
                        </div>
                    )}

                    {tab === "Watchlist" && (
                        verMasWatchlist ? (
                            <VistaCompletaPeliculas
                                titulo="Watchlist"
                                peliculas={watchlist}
                                onVolver={() => setVerMasWatchlist(false)}
                                onAgregar={() => { setIndiceCasillero(null); setModalTipo("watchlist"); }}
                            />
                        ) : (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xs uppercase tracking-wider text-gray-400">Watchlist</h2>
                                    {watchlist.length > 0 && (
                                        <button onClick={() => setVerMasWatchlist(true)} className="text-xs text-[#fccb30] hover:underline uppercase tracking-wider">
                                            Ver más ({watchlist.length}) →
                                        </button>
                                    )}
                                </div>
                                <GridCasilleros
                                    titulo="Por ver"
                                    items={watchlist}
                                    onAgregarClick={(index) => { setIndiceCasillero(index); setModalTipo("watchlist"); }}
                                />
                            </div>
                        )
                    )}

                    {tab === "Me gusta" && (
                        <GridCasilleros
                            titulo="Me Gusta"
                            items={meGusta}
                            onAgregarClick={(index) => { setIndiceCasillero(index); setModalTipo("mg"); }}
                        />
                    )}
                </div>
            </div>

            {/* Modal centralizado */}
            <ModalAgregar tipo={modalTipo} onClose={() => setModalTipo(null)} onGuardar={handleGuardarModal} />
        </main>
    );
}
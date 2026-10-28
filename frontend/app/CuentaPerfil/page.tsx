"use client";

import { useState, useRef, useEffect } from "react";
import ModalAgregar from "@/components/ModalAgregar";
import GridCasilleros from "@/components/GridCasilleros";
import VistaCompletaPeliculas from "@/components/VistaCompletaPeliculas";

type Stats = { peliculas: number; esteAnio: number; seguidores: number; };

export default function Perfil() {
    const [tab, setTab] = useState<string>("Perfil");
    const [stats, setStats] = useState<Stats>({ peliculas: 0, esteAnio: 0, seguidores: 247 });
    
    // Datos de usuario
    const [nombreUsuario, setNombreUsuario] = useState("mateo");
    const [handleUsuario, setHandleUsuario] = useState("@mateo");
    const [biografia, setBiografia] = useState("Cine mudo, noir y funciones de trasnoche.");
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Edición
    const [editando, setEditando] = useState(false);
    const [tempNombre, setTempNombre] = useState(nombreUsuario);
    const [tempBio, setTempBio] = useState(biografia);

    // Listas principales
    const [favoritos, setFavoritos] = useState<{ id: number; title: string }[]>([]);
    const [peliculasVistas, setPeliculasVistas] = useState<{ id: number; title: string }[]>([]);
    const [watchlist, setWatchlist] = useState<{ id: number; title: string }[]>([]);
    const [meGusta, setMeGusta] = useState<{ id: number; title: string }[]>([]);
    const [reseñas, setReseñas] = useState<{ id: number; pelicula: string; texto: string; estrellas: number }[]>([]);

    // Control de vistas (si está en modo "ver más" o en los casilleros principales)
    const [verMasPeliculas, setVerMasPeliculas] = useState(false);
    const [verMasWatchlist, setVerMasWatchlist] = useState(false);

    // Control de modales
    const [modalTipo, setModalTipo] = useState<"favorito" | "reseña" | "peliVivida" | "watchlist" | "mg" | null>(null);
    const [indiceCasillero, setIndiceCasillero] = useState<number | null>(null);

    useEffect(() => {
        const nombreGuardado = localStorage.getItem("lumina_real_username");
        const bioGuardada = localStorage.getItem("lumina_user_bio");
        const fotoGuardada = localStorage.getItem("lumina_user_foto");

        if (nombreGuardado) { setNombreUsuario(nombreGuardado); setTempNombre(nombreGuardado); setHandleUsuario("@" + nombreGuardado); }
        if (bioGuardada) { setBiografia(bioGuardada); setTempBio(bioGuardada); }
        if (fotoGuardada) setFotoPerfil(fotoGuardada);
    }, []);

    const handleCambiarFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setFotoPerfil(url);
            localStorage.setItem("lumina_user_foto", url);
        }
    };

    const guardarPerfil = (e: React.FormEvent) => {
        e.preventDefault();
        setNombreUsuario(tempNombre);
        setHandleUsuario("@" + tempNombre.toLowerCase());
        setBiografia(tempBio);
        localStorage.setItem("lumina_real_username", tempNombre);
        localStorage.setItem("lumina_user_bio", tempBio);
        setEditando(false);
    };

    const handleGuardarModal = ({ titulo, texto, estrellas }: { titulo: string; texto?: string; estrellas?: number }) => {
        const nuevoItem = { id: Date.now(), title: titulo };

        const actualizarLista = (listaActual: any[], setLista: Function) => {
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
                {/* Cabecera */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <div onClick={() => fileInputRef.current?.click()} className="w-24 h-24 rounded-full bg-[#1c1c1c] flex items-center justify-center text-4xl font-medium border border-white/10 overflow-hidden cursor-pointer relative group">
                                {fotoPerfil ? <img src={fotoPerfil} alt="Perfil" className="w-full h-full object-cover" /> : nombreUsuario.charAt(0).toUpperCase()}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[10px] uppercase text-white">Cambiar</div>
                            </div>
                            <button onClick={() => fileInputRef.current?.click()} className="text-[10px] text-gray-400 uppercase tracking-widest">Cambiar foto</button>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold">{nombreUsuario}</h1>
                            <p className="text-gray-400 text-sm">{handleUsuario}</p>
                            <p className="text-gray-300 text-xs mt-2 italic">"{biografia}"</p>
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
                        <input type="text" value={tempNombre} onChange={(e) => setTempNombre(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white" />
                        <textarea value={tempBio} onChange={(e) => setTempBio(e.target.value)} rows={2} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white" />
                        <button type="submit" className="bg-[#fccb30] text-black text-xs font-medium px-5 py-2 rounded uppercase">Guardar cambios</button>
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
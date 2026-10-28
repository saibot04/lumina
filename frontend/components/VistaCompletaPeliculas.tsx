"use client";

import PosterCard from "@/components/PosterCard";

interface PeliculaItem {
    id: number;
    title: string;
}

interface VistaProps {
    titulo: string;
    peliculas: PeliculaItem[];
    onVolver: () => void;
    onAgregar: () => void;
}

export default function VistaCompletaPeliculas({ titulo, peliculas, onVolver, onAgregar }: VistaProps) {
    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Barra superior estilo Letterboxd */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onVolver}
                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                        <span>←</span> Volver al perfil
                    </button>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-[#fccb30]">{titulo} ({peliculas.length})</h2>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-4 text-xs text-gray-400">
                        <span>RATING ▾</span>
                        <span>DECADE ▾</span>
                        <span>GENRE ▾</span>
                        <span>SORT BY ▾</span>
                    </div>
                    <button 
                        onClick={onAgregar}
                        className="bg-[#fccb30] text-black text-xs font-medium px-4 py-1.5 rounded uppercase tracking-wider hover:brightness-110 transition-all"
                    >
                        + Agregar película
                    </button>
                </div>
            </div>

            {/* Grilla completa de pósters */}
            {peliculas.length === 0 ? (
                <div className="text-center py-20 text-gray-500 text-xs bg-[#141414]/20 border border-white/5 rounded-lg border-dashed">
                    Todavía no agregaste ninguna película a esta lista.
                </div>
            ) : (
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-4">
                    {peliculas.map((p) => (
                        <div key={p.id} className="flex flex-col gap-1 group">
                            <div className="aspect-[2/3] rounded overflow-hidden border border-white/10 hover:scale-105 transition-transform shadow-lg">
                                <PosterCard id={p.id} title={p.title} />
                            </div>
                            <span className="text-[11px] text-gray-400 truncate group-hover:text-white transition-colors">{p.title}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
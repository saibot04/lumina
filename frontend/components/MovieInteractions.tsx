"use client";

import { useState } from "react";

interface Review {
    usuario: string;
    puntuacion: number;
    texto: string;
    fecha: string;
}

interface MovieInteractionsProps {
    reviews: Review[];
    promedio: number | null;
}

export default function MovieInteractions({ reviews, promedio }: MovieInteractionsProps) {
    const [miCalificacion, setMiCalificacion] = useState<number>(0);
    const [nuevaReseña, setNuevaReseña] = useState<string>("");
    const [listaReseñas, setListaReseñas] = useState<Review[]>(reviews);

    const handleEnviarReseña = (e: React.FormEvent) => {
        e.preventDefault();
        if (nuevaReseña.trim() || miCalificacion > 0) {
            const reviewItem: Review = {
                usuario: "mateo", // Usuario actual simulado
                puntuacion: miCalificacion || 5,
                texto: nuevaReseña,
                fecha: "Hoy",
            };
            setListaReseñas([reviewItem, ...listaReseñas]);
            setNuevaReseña("");
        }
    };

    return (
        <div className="space-y-8 text-white">
            
            {/* 1. CALIFICACIONES Y ESTADÍSTICAS */}
            <section className="bg-[#141414] border border-white/5 p-6 rounded-2xl">
                <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-4 font-semibold">Calificaciones</h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold">{promedio !== null ? promedio.toFixed(1) : "—"}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest">/ 5 <br/>({listaReseñas.length} votos)</div>
                    </div>
                    {/* Gráfico simulado de barras de calificaciones */}
                    <div className="flex items-end gap-1.5 h-12">
                        {[10, 20, 40, 60, 90, 70, 40, 20, 10, 5].map((h, i) => (
                            <div key={i} className="w-2 bg-white/20 rounded-t hover:bg-[#fccb30] transition-colors" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                    <div className="flex gap-1 text-[#fccb30] text-lg">
                        {"★★★★★"}
                    </div>
                </div>
            </section>

            {/* 2. TU CALIFICACIÓN Y AÑADIR RESEÑA */}
            <section className="bg-[#141414] border border-white/5 p-6 rounded-2xl space-y-4">
                <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Tu calificación</h2>
                <div className="flex gap-2 text-2xl text-gray-600 cursor-pointer">
                    {[1, 2, 3, 4, 5].map((estrella) => (
                        <span 
                            key={estrella} 
                            onClick={() => setMiCalificacion(estrella)}
                            className={estrella <= miCalificacion ? "text-[#fccb30]" : "hover:text-gray-400"}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <form onSubmit={handleEnviarReseña} className="space-y-3 pt-2">
                    <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">+ Añade una reseña:</label>
                    <textarea 
                        rows={3} 
                        value={nuevaReseña}
                        onChange={(e) => setNuevaReseña(e.target.value)}
                        placeholder="Escribí lo que te pareció la película..." 
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#fccb30]"
                    />
                    <div className="flex justify-end">
                        <button type="submit" className="bg-[#fccb30] text-black text-xs font-medium px-5 py-2 rounded-lg uppercase tracking-wider hover:brightness-110">
                            Publicar reseña
                        </button>
                    </div>
                </form>
            </section>

            {/* 3. ACTIVIDAD DE AMIGOS */}
            <section className="bg-[#141414] border border-white/5 p-6 rounded-2xl">
                <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-4 font-semibold">Actividad de amigos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-black/30 p-3 rounded-xl flex items-center gap-3 border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">C</div>
                        <div>
                            <p className="text-xs font-medium">Carlos</p>
                            <p className="text-[#fccb30] text-xs">★★★★☆</p>
                        </div>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl flex items-center gap-3 border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">S</div>
                        <div>
                            <p className="text-xs font-medium">Sofia</p>
                            <p className="text-[#fccb30] text-xs">★★★★★</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. RESEÑAS DE LA COMUNIDAD */}
            <section className="space-y-4">
                <h2 className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Reseñas de la comunidad</h2>
                {listaReseñas.length === 0 ? (
                    <p className="text-sm text-gray-500 py-4">Todavía no hay reseñas para esta película.</p>
                ) : (
                    listaReseñas.map((r, idx) => (
                        <div key={idx} className="bg-[#141414] border border-white/5 p-5 rounded-2xl space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-[10px] font-bold">
                                        {r.usuario.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-semibold">{r.usuario}</span>
                                    <span className="text-[#fccb30] text-xs">{"★".repeat(r.puntuacion)}</span>
                                </div>
                                <span className="text-xs text-gray-500">{r.fecha}</span>
                            </div>
                            <p className="text-sm text-gray-300">{r.texto}</p>
                            <div className="flex gap-4 pt-2 text-xs text-gray-400">
                                <button className="hover:text-white transition-colors">Responder</button>
                                <button className="hover:text-[#fccb30] transition-colors">♥ Me gusta</button>
                            </div>
                        </div>
                    ))
                )}
            </section>

        </div>
    );
}
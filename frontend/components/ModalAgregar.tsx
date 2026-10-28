"use client";

import React, { useState } from 'react';

interface ModalProps {
    tipo: "favorito" | "reseña" | "peliVivida" | "watchlist" | "mg" | null;
    onClose: () => void;
    onGuardar: (datos: { titulo: string; texto?: string; estrellas?: number }) => void;
}

export default function ModalAgregar({ tipo, onClose, onGuardar }: ModalProps) {
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [estrellas, setEstrellas] = useState(5);

    if (!tipo) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (titulo.trim()) {
            onGuardar({ titulo, texto, estrellas });
            onClose();
        }
    };

    const titulosMap = {
        favorito: "Agregar Película Favorita",
        reseña: "Escribir Reseña",
        peliVivida: "Registrar Película Vista",
        watchlist: "Añadir a Watchlist",
        mg: "Marcar Me Gusta"
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#141414] border border-white/10 w-full max-w-md p-6 rounded-2xl shadow-2xl space-y-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-base font-medium text-[#fccb30]">{titulosMap[tipo]}</h3>
                    
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Título de la película</label>
                        <input 
                            type="text" 
                            placeholder="Ej: Superman" 
                            value={titulo} 
                            onChange={(e) => setTitulo(e.target.value)} 
                            className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-[#fccb30] text-white" 
                            autoFocus 
                        />
                    </div>

                    {tipo === "reseña" && (
                        <>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Tu opinión</label>
                                <textarea placeholder="Escribí lo que te pareció..." rows={3} value={texto} onChange={(e) => setTexto(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-[#fccb30] text-white" />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Puntuación</label>
                                <select value={estrellas} onChange={(e) => setEstrellas(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm outline-none focus:border-[#fccb30] text-white">
                                    <option value={5}>★★★★★ (5)</option>
                                    <option value={4}>★★★★☆ (4)</option>
                                    <option value={3}>★★★☆☆ (3)</option>
                                    <option value={2}>★★☆☆☆ (2)</option>
                                    <option value={1}>★☆☆☆☆ (1)</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-xs text-gray-400 hover:text-white">Cancelar</button>
                        <button type="submit" className="bg-[#fccb30] text-black text-xs font-medium px-4 py-2 rounded uppercase tracking-wider hover:brightness-110">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
"use client";

import React from 'react';

type TabType = "peliculas" | "reseñas" | "watchlist" | "mg" | "actividad";

interface TabsProps {
    pestanaActiva: TabType;
    onCambiarTab: (tab: TabType) => void;
}

const TABS: { id: TabType; label: string }[] = [
    { id: "peliculas", label: "Películas vistas" },
    { id: "reseñas", label: "Reseñas" },
    { id: "watchlist", label: "Watchlist" },
    { id: "mg", label: "Me gusta" },
    { id: "actividad", label: "Actividad" },
];

export default function TabsPerfil({ pestanaActiva, onCambiarTab }: TabsProps) {
    return (
        <div className="flex gap-8 border-b border-white/10 mb-8 text-sm overflow-x-auto">
            {TABS.map((tab) => {
                const activo = pestanaActiva === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onCambiarTab(tab.id)}
                        className={`pb-3 relative transition-colors whitespace-nowrap ${
                            activo ? "text-[#fccb30] font-medium" : "text-gray-400 hover:text-white"
                        }`}
                    >
                        {tab.label}
                        {activo && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#fccb30]"></div>}
                    </button>
                );
            })}
        </div>
    );
}
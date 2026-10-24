"use client";

import { useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileOverview, { Activity } from "@/components/ProfileOverview";

type Stats = {
    peliculas: number;
    esteAnio: number;
    seguidores: number;
};

const EMPTY_STATS: Stats = { peliculas: 0, esteAnio: 0, seguidores: 0 };

export default function Perfil() {
    const [tab, setTab] = useState<string>("Perfil");

    // Por ahora vacíos. Más adelante se llenan con los datos reales del usuario.
    const [stats] = useState<Stats>(EMPTY_STATS);
    const [activities] = useState<Activity[]>([]);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <ProfileHeader
                username="usuario"
                handle="usuario"
                stats={stats}
                onTabChange={setTab}
            />

            {tab === "Perfil" && (
                <div className="px-6 py-8">
                    <ProfileOverview activities={activities} />
                </div>
            )}
        </main>
    );
}
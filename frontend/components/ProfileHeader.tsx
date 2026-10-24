"use client";

import { useState } from "react";

const TABS = ["Perfil", "Películas", "Reseñas", "Watchlist", "Me gusta"] as const;
type Tab = (typeof TABS)[number];

type ProfileHeaderProps = {
    username: string;
    handle: string;
    plan?: string;
    avatarUrl?: string;
    stats: {
        peliculas: number;
        esteAnio: number;
        seguidores: number;
    };
    onEditProfile?: () => void;
    onChangePhoto?: () => void;
    onTabChange?: (tab: Tab) => void;
};

export default function ProfileHeader({
    username,
    handle,
    plan,
    avatarUrl,
    stats,
    onEditProfile,
    onChangePhoto,
    onTabChange,
}: ProfileHeaderProps) {
    const [activeTab, setActiveTab] = useState<Tab>("Perfil");

    const handleTab = (tab: Tab) => {
        setActiveTab(tab);
        onTabChange?.(tab);
    };

    return (
        <header className="w-full">
            <div className="flex flex-wrap items-start gap-6 px-6 pt-6">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-3">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-field text-3xl text-primary">
                        {avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={avatarUrl}
                                alt={username}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            username.charAt(0).toUpperCase()
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onChangePhoto}
                        className="text-[9px] uppercase tracking-[0.2em] text-muted transition hover:text-primary"
                    >
                        Cambiar foto
                    </button>
                </div>

                {/* Info + botón */}
                <div className="flex min-w-[220px] flex-1 flex-col gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold">{username}</h1>
                        <div className="mt-1 flex items-center gap-3">
                            <span className="text-xs text-muted">@{handle}</span>
                            {plan && (
                                <span className="rounded-full border border-primary/50 px-3 py-0.5 text-[10px] font-medium uppercase tracking-widest text-primary">
                                    {plan}
                                </span>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onEditProfile}
                        className="w-fit rounded border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-muted transition hover:border-primary hover:text-primary"
                    >
                        Editar perfil
                    </button>
                </div>

                {/* Estadísticas */}
                <div className="flex gap-12 pr-4 pt-1">
                    <Stat value={stats.peliculas} label="Películas" />
                    <Stat value={stats.esteAnio} label="Este año" />
                    <Stat value={stats.seguidores} label="Seguidores" />
                </div>
            </div>

            {/* Tabs */}
            <nav className="mt-10 flex gap-8 border-b border-white/10 px-6">
                {TABS.map((tab) => {
                    const active = tab === activeTab;
                    return (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => handleTab(tab)}
                            className={`-mb-px border-b-2 pb-3 text-[11px] uppercase tracking-[0.2em] transition ${
                                active
                                    ? "border-primary text-primary"
                                    : "border-transparent text-muted hover:text-white"
                            }`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </nav>
        </header>
    );
}

function Stat({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-light">{value}</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-muted">
                {label}
            </span>
        </div>
    );
}
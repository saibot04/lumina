"use client";

import { useState } from "react";

export type FavoriteMovie = {
    title: string;
    posterUrl?: string;
};

export type ActivityType = "watched" | "reviewed" | "liked" | "watchlist";

export type Activity = {
    id: string;
    type: ActivityType;
    movie: string;
    date: string;
    rating?: number; // 1 a 5
};

const MAX_FAVORITES = 4;

const LABELS: Record<ActivityType, string> = {
    watched: "Viste",
    reviewed: "Reseñaste",
    liked: "Te gustó",
    watchlist: "Agregaste a tu watchlist",
};

export default function ProfileOverview({
    activities = [],
}: {
    activities?: Activity[];
}) {
    const [movies, setMovies] = useState<(FavoriteMovie | null)[]>(
        Array(MAX_FAVORITES).fill(null)
    );
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [title, setTitle] = useState("");
    const [posterUrl, setPosterUrl] = useState("");

    const openModal = (index: number) => {
        setEditingIndex(index);
        setTitle("");
        setPosterUrl("");
    };

    const closeModal = () => setEditingIndex(null);

    const saveMovie = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingIndex === null || !title.trim()) return;

        setMovies((prev) => {
            const next = [...prev];
            next[editingIndex] = {
                title: title.trim(),
                posterUrl: posterUrl.trim() || undefined,
            };
            return next;
        });
        closeModal();
    };

    const removeMovie = (index: number) => {
        setMovies((prev) => {
            const next = [...prev];
            next[index] = null;
            return next;
        });
    };

    return (
        <div className="flex flex-col gap-12">
            {/* Películas favoritas */}
            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted">
                        Películas favoritas
                    </h2>
                    <span className="text-[10px] text-muted">
                        {movies.filter(Boolean).length}/{MAX_FAVORITES}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {movies.map((movie, i) =>
                        movie ? (
                            <div
                                key={i}
                                className="group relative aspect-[2/3] overflow-hidden rounded-lg border border-white/10 bg-field"
                            >
                                {movie.posterUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center p-3 text-center text-sm">
                                        {movie.title}
                                    </div>
                                )}

                                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                                    <span className="truncate text-xs">{movie.title}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeMovie(i)}
                                        className="ml-2 text-xs text-muted hover:text-primary"
                                        aria-label={`Quitar ${movie.title}`}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                key={i}
                                type="button"
                                onClick={() => openModal(i)}
                                className="flex aspect-[2/3] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 text-muted transition hover:border-primary hover:text-primary"
                            >
                                <span className="text-3xl font-light">+</span>
                                <span className="text-[9px] uppercase tracking-[0.2em]">
                                    Agregar
                                </span>
                            </button>
                        )
                    )}
                </div>
            </section>

            {/* Actividad reciente */}
            <section>
                <h2 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-muted">
                    Actividad reciente
                </h2>

                {activities.length === 0 ? (
                    <div className="rounded-lg border border-white/10 bg-field/50 px-6 py-10 text-center text-sm text-muted">
                        Todavía no hay actividad. ¡Empezá viendo una película!
                    </div>
                ) : (
                    <ul className="flex flex-col divide-y divide-white/10 rounded-lg border border-white/10">
                        {activities.map((a) => (
                            <li
                                key={a.id}
                                className="flex items-center justify-between gap-4 px-5 py-4"
                            >
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm">
                                        <span className="text-muted">{LABELS[a.type]} </span>
                                        <span className="font-medium">{a.movie}</span>
                                    </p>
                                    {a.rating !== undefined && (
                                        <span
                                            className="text-xs tracking-widest text-primary"
                                            aria-label={`${a.rating} de 5`}
                                        >
                                            {"★".repeat(a.rating)}
                                            <span className="text-white/20">
                                                {"★".repeat(5 - a.rating)}
                                            </span>
                                        </span>
                                    )}
                                </div>
                                <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted">
                                    {a.date}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Modal */}
            {editingIndex !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <form
                        onSubmit={saveMovie}
                        onClick={(e) => e.stopPropagation()}
                        className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-[#111] p-6"
                    >
                        <h3 className="text-xl font-light">Agregar película favorita</h3>

                        <label className="rounded bg-field px-3 py-2">
                            <span className="block text-[10px] text-muted">Título</span>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-transparent text-sm outline-none"
                                placeholder="El padrino"
                                autoFocus
                            />
                        </label>

                        <label className="rounded bg-field px-3 py-2">
                            <span className="block text-[10px] text-muted">
                                URL del póster (opcional)
                            </span>
                            <input
                                type="url"
                                value={posterUrl}
                                onChange={(e) => setPosterUrl(e.target.value)}
                                className="w-full bg-transparent text-sm outline-none"
                                placeholder="https://..."
                            />
                        </label>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 text-xs text-muted hover:text-white"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-black transition hover:opacity-90"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
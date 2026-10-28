"use client";

import { useState, useEffect } from "react";
import BotonVolver from "@/components/BotonVolver";
import PosterCard from "@/components/PosterCard";

export default function MiListaPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [continuarViendo, setContinuarViendo] = useState<any[]>([]);

  useEffect(() => {
    const cargarDatos = () => {
      const watchlistGuardada = JSON.parse(localStorage.getItem("lumina_watchlist") || "[]");
      setWatchlist(watchlistGuardada);

      const continuarGuardado = JSON.parse(localStorage.getItem("lumina_continuar") || "[]");
      setContinuarViendo(continuarGuardado);
    };

    cargarDatos();

    window.addEventListener("storage", cargarDatos);
    return () => window.removeEventListener("storage", cargarDatos);
  }, []);

  const eliminarDeWatchlist = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se abra el detalle al hacer clic en la X
    const watchlistGuardada = JSON.parse(localStorage.getItem("lumina_watchlist") || "[]");
    const actualizada = watchlistGuardada.filter((p: any) => String(p.id) !== String(id));
    localStorage.setItem("lumina_watchlist", JSON.stringify(actualizada));
    setWatchlist(actualizada);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-12 pb-32">
      <div className="max-w-[1400px] mx-auto">
        
        <BotonVolver />

        {/* --- SECCIÓN DESCARGAS --- */}
        <section className="mb-14">
          <h1 className="text-xl font-medium mb-4 flex items-center gap-2">
            Descargas 
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </h1>
          <div className="border-t border-b border-white/20 py-12 flex justify-center items-center">
            <p className="text-gray-300 text-base flex items-center gap-2">
              Las series y peliculas que descargues apareceran aqui 
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </p>
          </div>
        </section>

        {/* --- SECCIÓN MI LISTA --- */}
        <section className="mb-12">
          <h2 className="mb-4 text-base font-medium">Mi lista</h2>
          
          {watchlist.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-xs bg-[#141414]/20 border border-white/5 rounded-xl border-dashed">
              Tu lista está vacía. Agregá películas desde el botón Watchlist en la vista de detalle.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 gap-y-8">
              {watchlist.map((p) => (
                <div key={p.id} className="flex flex-col gap-2 group relative">
                  {/* Botón para eliminar la película directamente */}
                  <button 
                    onClick={(e) => eliminarDeWatchlist(p.id, e)}
                    className="absolute top-2 right-2 z-20 bg-black/70 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs border border-white/20"
                    title="Quitar de mi lista"
                  >
                    ✕
                  </button>

                  <div className="w-full aspect-[2/3] overflow-hidden rounded relative transition-transform group-hover:scale-105 border border-white/10 cursor-pointer">
                    <PosterCard id={Number(p.id)} title={p.title} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white truncate">{p.title}</p>
                    <p className="text-[11px] text-gray-500 truncate">{p.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- SECCIÓN CONTINUAR VIENDO --- */}
        <section>
          <h2 className="mb-4 text-base font-medium">Continuar viendo</h2>
          
          {continuarViendo.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-xs bg-[#141414]/20 border border-white/5 rounded-xl border-dashed">
              No tenés películas en curso. Las que empieces a reproducir aparecerán acá.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 gap-y-8">
              {continuarViendo.map((p) => (
                <div key={p.id} className="flex flex-col gap-2 group cursor-pointer">
                  <div className="w-full aspect-[2/3] overflow-hidden rounded relative transition-transform group-hover:scale-105 border border-white/10">
                    <PosterCard id={p.id} title={p.title} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white truncate">{p.title}</p>
                    <p className="text-[11px] text-gray-500 truncate">{p.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
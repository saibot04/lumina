"use client";

import BotonVolver from "@/components/BotonVolver";
import PosterCard from "@/components/PosterCard";

// Simulamos los datos basados exactamente en tu diseño
const PELICULAS_LISTA = [
  { id: 101, title: "Superman", subtitle: "James Gunn, 2025" },
  { id: 102, title: "Titanic", subtitle: "James Cameron, 1996" },
  { id: 103, title: "Gladiator 2", subtitle: "Ridley Scott, 2025" },
  { id: 104, title: "The prestige", subtitle: "Christopher Nolan, 2006" },
  { id: 105, title: "Transformers 2", subtitle: "Michael Bay, 2009" },
  { id: 106, title: "2001: a space odyssey", subtitle: "Stanley Kubrick, 1968" },
];

const PELICULAS_CONTINUAR = [
  { id: 201, title: "Something very bad is about to happen", subtitle: "Weronika Tofilska, 2026" },
  { id: 202, title: "The Batman", subtitle: "Matt Reeves, 2022" },
  { id: 203, title: "Blade runner", subtitle: "Ridley Scott, 1982" },
  { id: 204, title: "Inception", subtitle: "Christopher Nolan, 2010" },
];

export default function MiListaPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-12 pb-32">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Nuestro nuevo componente reciclable */}
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 gap-y-8">
            {PELICULAS_LISTA.map((p) => (
              <div key={p.id} className="flex flex-col gap-2 group cursor-pointer">
                {/* Reutilizamos tu PosterCard adentro de un contenedor para darle formato */}
                <div className="w-full aspect-[2/3] overflow-hidden rounded relative transition-transform group-hover:scale-105">
                  <PosterCard id={p.id} title={p.title} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white truncate">{p.title}</p>
                  <p className="text-[11px] text-gray-500 truncate">{p.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECCIÓN CONTINUAR VIENDO --- */}
        <section>
          <h2 className="mb-4 text-base font-medium">Continuar viendo</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 gap-y-8">
            {PELICULAS_CONTINUAR.map((p) => (
              <div key={p.id} className="flex flex-col gap-2 group cursor-pointer">
                <div className="w-full aspect-[2/3] overflow-hidden rounded relative transition-transform group-hover:scale-105">
                  <PosterCard id={p.id} title={p.title} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white truncate">{p.title}</p>
                  <p className="text-[11px] text-gray-500 truncate">{p.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
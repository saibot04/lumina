"use client";

import BotonVolver from "@/components/BotonVolver";
import PosterCard from "@/components/PosterCard";

const MIEMBROS_DESTACADOS = [
  {
    id: 1,
    nombre: "B Anderson",
    usuario: "@banderson",
    peliculas: "1.2K",
    reseñas: "949",
    avatarBg: "from-purple-600 to-indigo-900",
    favoritos: [
      { id: 101, title: "Superman" },
      { id: 102, title: "Titanic" },
      { id: 103, title: "Gladiator 2" },
      { id: 104, title: "The Prestige" },
    ]
  },
  {
    id: 2,
    nombre: "mattgoold",
    usuario: "@mattgoold",
    peliculas: "1.3K",
    reseñas: "863",
    avatarBg: "from-amber-600 to-orange-900",
    favoritos: [
      { id: 105, title: "Transformers 2" },
      { id: 106, title: "2001: A Space Odyssey" },
      { id: 202, title: "The Batman" },
      { id: 203, title: "Blade Runner" },
    ]
  },
  {
    id: 3,
    nombre: "jessicareedy",
    usuario: "@jessicareedy",
    peliculas: "621",
    reseñas: "187",
    avatarBg: "from-red-600 to-pink-900",
    favoritos: [
      { id: 204, title: "Inception" },
      { id: 101, title: "Superman" },
      { id: 102, title: "Titanic" },
      { id: 103, title: "Gladiator 2" },
    ]
  },
  {
    id: 4,
    nombre: "Adam Scott",
    usuario: "@adamscott",
    peliculas: "165",
    reseñas: "1",
    avatarBg: "from-blue-600 to-cyan-900",
    favoritos: [
      { id: 104, title: "The Prestige" },
      { id: 105, title: "Transformers 2" },
      { id: 106, title: "2001: A Space Odyssey" },
    ]
  }
];

const POPULARES_SEMANA = [
  {
    id: 5,
    nombre: "-ˏˋ mak ˊˎ-",
    peliculas: "814",
    reseñas: "582",
    favoritos: [
      { id: 101, title: "Superman" },
      { id: 102, title: "Titanic" },
      { id: 103, title: "Gladiator 2" },
    ]
  },
  {
    id: 6,
    nombre: "James (Schaffrillas)",
    peliculas: "1.6K",
    reseñas: "1.5K",
    favoritos: [
      { id: 104, title: "The Prestige" },
      { id: 105, title: "Transformers 2" },
      { id: 106, title: "2001: A Space Odyssey" },
    ]
  },
  {
    id: 7,
    nombre: "zoë rose bryant",
    peliculas: "5.1K",
    reseñas: "2.5K",
    favoritos: [
      { id: 202, title: "The Batman" },
      { id: 203, title: "Blade Runner" },
      { id: 204, title: "Inception" },
    ]
  },
  {
    id: 8,
    nombre: "Karsten",
    peliculas: "2.7K",
    reseñas: "1.7K",
    favoritos: [
      { id: 101, title: "Superman" },
      { id: 103, title: "Gladiator 2" },
      { id: 105, title: "Transformers 2" },
    ]
  }
];

export default function MiembrosPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Botón Volver y Cabecera */}
        <div className="space-y-6">
          <BotonVolver />
          <div className="text-center py-8">
            <h1 className="text-2xl md:text-4xl font-light tracking-tight text-gray-300">
              Amantes del cine, críticos y amigos — encuentra miembros populares.
            </h1>
          </div>
        </div>

        {/* --- SECCIÓN: MIEMBROS DESTACADOS (FEATURED MEMBERS) --- */}
        <section className="space-y-6">
          <h2 className="text-xs uppercase tracking-widest text-[#fccb30] font-semibold border-b border-white/10 pb-3">
            Miembros Destacados
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MIEMBROS_DESTACADOS.map((m) => (
              <div key={m.id} className="bg-[#141414] border border-white/5 p-5 rounded-2xl flex flex-col items-center text-center space-y-4 group">
                
                {/* Avatar circular con botón de seguir (+) */}
                <div className="relative">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${m.avatarBg} flex items-center justify-center text-2xl font-bold shadow-xl border border-white/10`}>
                    {m.nombre.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#222] hover:bg-[#fccb30] hover:text-black border border-white/20 rounded-full flex items-center justify-center text-xs transition-colors shadow" title="Seguir miembro">
                    +
                  </button>
                </div>

                {/* Info del usuario */}
                <div>
                  <h3 className="font-semibold text-sm text-white group-hover:text-[#fccb30] transition-colors">{m.nombre}</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">{m.peliculas} películas · {m.reseñas} reseñas</p>
                </div>

                {/* Mini pósters favoritos abajo */}
                <div className="grid grid-cols-4 gap-1.5 w-full pt-2 border-t border-white/5">
                  {m.favoritos.map((fav, idx) => (
                    <div key={idx} className="aspect-[2/3] rounded overflow-hidden bg-black/40 border border-white/10">
                      <PosterCard id={fav.id} title={fav.title} />
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* --- SECCIÓN: POPULARES ESTA SEMANA --- */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Populares esta semana
            </h2>
            <button className="text-xs text-[#fccb30] hover:underline uppercase tracking-wider">
              Más →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {POPULARES_SEMANA.map((m) => (
              <div key={m.id} className="bg-[#141414] border border-white/5 p-5 rounded-2xl flex flex-col items-center text-center space-y-4 group">
                
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-neutral-800 flex items-center justify-center text-2xl font-bold shadow-xl border border-white/10 text-gray-400">
                    {m.nombre.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#222] hover:bg-[#fccb30] hover:text-black border border-white/20 rounded-full flex items-center justify-center text-xs transition-colors shadow" title="Seguir miembro">
                    +
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-white group-hover:text-[#fccb30] transition-colors">{m.nombre}</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">{m.peliculas} películas · {m.reseñas} reseñas</p>
                </div>

                <div className="grid grid-cols-3 gap-1.5 w-full pt-2 border-t border-white/5">
                  {m.favoritos.map((fav, idx) => (
                    <div key={idx} className="aspect-[2/3] rounded overflow-hidden bg-black/40 border border-white/10">
                      <PosterCard id={fav.id} title={fav.title} />
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
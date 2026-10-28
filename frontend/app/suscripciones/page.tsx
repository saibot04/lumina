"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import BotonVolver from '@/components/BotonVolver';

const PLANES = [
  {
    nombre: 'Inicial',
    precio: 'GRATIS',
    periodo: '7 días',
    destacado: true,
    caracteristicas: [
      '1 dispositivo a la vez',
      'Visualizacion en 720p',
      'Catalogo minimo de peliculas',
      'Reproducción offline',
      'Opcion cortos anuncios'
    ]
  },
  {
    nombre: 'Principal',
    precio: '$10.000',
    periodo: 'mes',
    destacado: false,
    caracteristicas: [
      '1 dispositivo a la vez',
      'Visualizacion en 720p,1080p',
      'Catalogo general de peliculas',
      'Reproducción offline',
      'Experiencia sin anuncios'
    ]
  },
  {
    nombre: 'Estandar',
    precio: '$25.000',
    periodo: 'mes',
    destacado: true,
    caracteristicas: [
      '2 dispositivos a la vez',
      'Full HD (1080p)',
      'Catalogo completo+Estrenos',
      'Reproducción offline',
      'Experiencia sin anuncios'
    ]
  },
  {
    nombre: 'Cinefilo',
    precio: '$50.000',
    periodo: 'mes',
    destacado: false,
    caracteristicas: [
      '4 dispositivos en simultaneo',
      'Ultra HD(4k HDR/Dolby vision)',
      'Catalogo VIP',
      'Descargas ilimitadas',
      'Audio inmersivo(Dolby ATMOS)'
    ]
  }
];

export default function SuscripcionesPage() {
  const router = useRouter();

  const handleSeleccionarPlan = (nombrePlan: string, precioPlan: string) => {
    router.push(`/metodo-de-pago?plan=${encodeURIComponent(nombrePlan)}&precio=${encodeURIComponent(precioPlan)}`);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-12 pb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <BotonVolver />

        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Contratá tu plan</h1>
          <p className="text-lg text-gray-400">Y disfrutá la experiencia completa de Lumina</p>
        </div>

        {/* --- GRILLA DE PLANES --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {PLANES.map((plan, index) => (
            <div key={index} className="bg-[#141414] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">{plan.nombre}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[#fccb30]">{plan.precio}</span>
                  <span className="text-xs text-gray-500">/ {plan.periodo}</span>
                </div>
                <ul className="space-y-2 pt-4 border-t border-white/10 text-xs text-gray-300">
                  {plan.caracteristicas.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#fccb30]">✓</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSeleccionarPlan(plan.nombre, plan.precio)}
                className="w-full bg-[#fccb30] text-black font-semibold py-2.5 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 transition cursor-pointer"
              >
                Elegir plan
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
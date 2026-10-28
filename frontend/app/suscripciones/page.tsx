"use client";

import React, { useState } from 'react';
import PlanCard from '@/components/PlanCard';

// Simulamos los datos que en el futuro llegarán de tu backend
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
    precio: '10.000',
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
    precio: '25.000',
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
    precio: '50.000',
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
  const [modalidad, setModalidad] = useState<'Mensual' | 'Anual'>('Mensual');

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-10 pb-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-2">Contrata tú plan</h1>
        <p className="text-xl text-gray-400 mb-12">Y disfruta la experiencia completa</p>

        {/* --- PESTAÑAS MENSUAL / ANUAL --- */}
        <div className="flex gap-6 border-b border-white/20 mb-12 w-max pb-2">
          <button
            onClick={() => setModalidad('Mensual')}
            className={`pb-2 relative ${modalidad === 'Mensual' ? 'text-white' : 'text-gray-500'}`}
          >
            Mensual
            {modalidad === 'Mensual' && <div className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-white"></div>}
          </button>
          <button
            onClick={() => setModalidad('Anual')}
            className={`pb-2 relative ${modalidad === 'Anual' ? 'text-white' : 'text-gray-500'}`}
          >
            Anual
            {modalidad === 'Anual' && <div className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-white"></div>}
          </button>
        </div>

        {/* --- GRILLA DE PLANES (Se dibuja sola) --- */}
        <div className="flex flex-wrap gap-6 justify-start">
          {PLANES.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </main>
  );
}
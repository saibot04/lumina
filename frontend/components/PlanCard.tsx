import React from 'react';

interface PlanProps {
  nombre: string;
  precio: string;
  periodo: string;
  caracteristicas: string[];
  destacado?: boolean;
}

export default function PlanCard({ nombre, precio, periodo, caracteristicas, destacado = false }: PlanProps) {
  // Define los colores según si el plan es destacado (amarillo) o normal (oscuro)
  const bgClass = destacado ? 'bg-[#fccb30] text-black border border-[#fccb30]' : 'bg-[#0a0a0a] text-white border border-white/20';
  const btnClass = destacado ? 'bg-[#1c1c1c] text-white hover:bg-black' : 'bg-[#fccb30] text-black hover:brightness-110';

  return (
    <div className={`rounded-xl p-8 flex flex-col w-[280px] flex-shrink-0 ${bgClass}`}>
      <h3 className="text-xl font-medium text-center mb-4">{nombre}</h3>
      
      <div className="flex items-baseline justify-center mb-6">
        {precio === 'GRATIS' ? (
          <span className="text-5xl font-bold">{precio}</span>
        ) : (
          <>
            <span className="text-2xl align-top mr-1">$</span>
            <span className="text-5xl font-bold">{precio}</span>
          </>
        )}
        <span className="text-sm ml-1">/ {periodo}</span>
      </div>

      <ul className="flex-1 space-y-4 mb-8 text-sm">
        {caracteristicas.map((caracteristica, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1 flex-shrink-0">•</span>
            <span>{caracteristica}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-2.5 rounded text-sm font-medium transition-all ${btnClass}`}>
        Comprar
      </button>
    </div>
  );
}
"use client";
import React from 'react';

export default function BotonAccion({ texto, color = "bg-[#fccb30]", onClick }: { texto: string, color?: string, onClick?: () => void }) {
  
  // Si no le pasamos una acción específica, tira una alerta por defecto
  const accionPorDefecto = () => {
    alert(`Elegiste la opción: ${texto}`);
  };

  return (
    <button 
      onClick={onClick ? onClick : accionPorDefecto}
      className={`${color} text-black text-[11px] font-medium px-4 py-1.5 rounded uppercase tracking-wider hover:brightness-110 transition-all active:scale-95`}
    >
      {texto}
    </button>
  );
}